import React, { useState } from 'react';
import { useRegisterCustomerMutation } from '../../../store/api/authApi';
import CustomerRegisterView from '../views/CustomerRegisterView';
import { useNavigate } from 'react-router-dom';

const CustomerRegisterContainer = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();
    const [registerCustomer, { isLoading, isSuccess, isError, error }] = useRegisterCustomerMutation();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const payload = {
                name: formData.name,
                username: formData.username,
                email: formData.email,
                password: formData.password,
            };
            await registerCustomer(payload).unwrap();
            alert("Registration Successful! Please Login.");
            navigate('/login');
        } catch (err) {
            console.error('Failed to register:', err);
        }
    };

    return (
        <CustomerRegisterView
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

export default CustomerRegisterContainer;
