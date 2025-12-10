import React, { useState } from 'react';
import { useLoginCustomerMutation } from '../../../store/api/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../store/slices/auth.slice';
import { useNavigate } from 'react-router-dom';
import CustomerLoginView from '../views/CustomerLoginView';

import { toast } from 'react-toastify';

const CustomerLoginContainer = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [loginCustomer, { isLoading, isError, error }] = useLoginCustomerMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await loginCustomer({ identifier, password }).unwrap();
            dispatch(setCredentials({
                user: { name: userData.name, email: userData.email },
                token: userData.token,
                role: userData.role
            }));
            toast.success('Login successful!');
            navigate('/customer/profile');
        } catch (err) {
            console.error('Login failed:', err);
            toast.error(err?.data?.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <CustomerLoginView
            email={identifier}
            password={password}
            onEmailChange={setIdentifier}
            onPasswordChange={setPassword}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            isError={isError}
            error={error}
        />
    );
};

export default CustomerLoginContainer;
