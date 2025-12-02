import React, { useState } from 'react';
import { useLoginSellerMutation } from '../../services/api';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import SellerLoginView from '../../components/seller/SellerLoginView';

const SellerLoginContainer = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginSeller, { isLoading, isError, error }] = useLoginSellerMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await loginSeller({ email, password }).unwrap();
            dispatch(setCredentials({ user: email, token: userData.token, role: 'seller' }));
            navigate('/seller/dashboard');
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return (
        <SellerLoginView
            email={email}
            password={password}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            isError={isError}
            error={error}
        />
    );
};

export default SellerLoginContainer;
