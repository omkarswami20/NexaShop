import React, { useState } from 'react';
import { useRegisterSellerMutation } from '../../services/api';
import SellerRegisterView from '../../components/seller/SellerRegisterView';

const SellerRegisterContainer = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        storeName: '',
    });
    const [registerSeller, { isLoading, isSuccess, isError, error }] = useRegisterSellerMutation();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerSeller(formData).unwrap();
            // Clear form on success
            setFormData({
                name: '',
                email: '',
                password: '',
                storeName: '',
            });
        } catch (err) {
            console.error('Failed to register:', err);
        }
    };

    return (
        <SellerRegisterView
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            isSuccess={isSuccess}
            isError={isError}
            error={error}
        />
    );
};

export default SellerRegisterContainer;
