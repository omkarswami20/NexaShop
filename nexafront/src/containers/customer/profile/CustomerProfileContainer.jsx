import React, { useState, useEffect } from 'react';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../../store/api/customerApi';
import CustomerProfileView from '../views/CustomerProfileView';

const CustomerProfileContainer = () => {
    const { data: profile, isLoading, isError, error } = useGetProfileQuery();
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
    
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '', // Read-only
        username: '' // Read-only
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name,
                phoneNumber: profile.phoneNumber,
                email: profile.email,
                username: profile.username
            });
        }
    }, [profile]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile({
                name: formData.name,
                phoneNumber: formData.phoneNumber
            }).unwrap();
            alert("Profile updated successfully!");
        } catch (err) {
            console.error('Failed to update profile:', err);
            alert("Failed to update profile.");
        }
    };

    return (
        <CustomerProfileView
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            isUpdating={isUpdating}
            isError={isError}
            error={error}
        />
    );
};

export default CustomerProfileContainer;
