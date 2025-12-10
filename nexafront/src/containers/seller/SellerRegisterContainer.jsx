import React, { useState } from 'react';
import { useRegisterSellerMutation } from '../../store/api/api.slice';
import SellerRegisterView from './SellerRegisterView';
import OtpVerification from '../../components/auth/OtpVerification';
import { useNavigate } from 'react-router-dom';

const SellerRegisterContainer = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        storeName: '',
        phoneNumber: '',
        address: '',
    });
    const [showOtp, setShowOtp] = useState(false);
    const navigate = useNavigate();
    const [registerSeller, { isLoading, isSuccess, isError, error }] = useRegisterSellerMutation();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ownerName: formData.name,
                email: formData.email,
                password: formData.password,
                businessName: formData.storeName,
                phone: formData.phoneNumber,
                address: formData.address,
            };
            await registerSeller(payload).unwrap();
            // Show OTP Modal instead of clearing form immediately
            setShowOtp(true);
        } catch (err) {
            console.error('Failed to register:', err);
        }
    };

    const handleOtpSuccess = () => {
        setShowOtp(false);
        // Clear form
        setFormData({
            name: '',
            email: '',
            password: '',
            storeName: '',
            phoneNumber: '',
            address: '',
        });
        // You might want to show a success message or redirect
        alert("Phone Verified! Please check your email for the verification link.");
        navigate('/seller/login');
    };

    return (
        <>
            <SellerRegisterView
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                isSuccess={isSuccess && !showOtp} // Only show success message if OTP flow is done (or if we want to hide it during OTP)
                isError={isError}
                error={error}
            />
            <OtpVerification 
                open={showOtp} 
                onClose={() => setShowOtp(false)}
                identifier={formData.phoneNumber}
                onSuccess={handleOtpSuccess}
            />
        </>
    );
};

export default SellerRegisterContainer;
