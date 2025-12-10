import React, { useState } from 'react';
import { useForgotPasswordMutation, useResetPasswordMutation } from '../../../store/api/authApi';
import ForgotPasswordView from '../views/ForgotPasswordView';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordContainer = () => {
    const [step, setStep] = useState(1); // 1: Request OTP, 2: Reset Password
    const [identifier, setIdentifier] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [forgotPassword, { isLoading: isForgotLoading }] = useForgotPasswordMutation();
    const [resetPassword, { isLoading: isResetLoading }] = useResetPasswordMutation();
    
    const navigate = useNavigate();

    const handleRequestOtp = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword({ identifier }).unwrap();
            setStep(2);
            alert("OTP sent to your email/phone.");
        } catch (err) {
            console.error('Failed to send OTP:', err);
            alert("Failed to send OTP. Please check the identifier.");
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            await resetPassword({ identifier, otp, newPassword }).unwrap();
            alert("Password reset successfully! Please login.");
            navigate('/login');
        } catch (err) {
            console.error('Failed to reset password:', err);
            alert("Failed to reset password. Invalid OTP or expired.");
        }
    };

    return (
        <ForgotPasswordView
            step={step}
            identifier={identifier}
            setIdentifier={setIdentifier}
            otp={otp}
            setOtp={setOtp}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            onRequestOtp={handleRequestOtp}
            onResetPassword={handleResetPassword}
            isLoading={isForgotLoading || isResetLoading}
        />
    );
};

export default ForgotPasswordContainer;
