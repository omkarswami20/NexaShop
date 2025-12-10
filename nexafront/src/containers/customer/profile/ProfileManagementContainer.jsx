import React, { useState, useEffect } from 'react';
import {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useGetAddressesQuery,
    useAddAddressMutation,
    useUpdateAddressMutation,
    useDeleteAddressMutation
} from '../../../store/api/customerApi';
import ProfileManagementView from '../views/ProfileManagementView';

const ProfileManagementContainer = () => {
    // Profile Logic
    const { data: profile, isLoading: isProfileLoading, isError: isProfileError, error: profileError } = useGetProfileQuery();
    const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();

    const [profileFormData, setProfileFormData] = useState({
        name: '',
        email: '',
        username: ''
    });

    useEffect(() => {
        if (profile) {
            setProfileFormData({
                name: profile.name,
                email: profile.email,
                username: profile.username
            });
        }
    }, [profile]);

    const handleProfileChange = (e) => {
        setProfileFormData({ ...profileFormData, [e.target.name]: e.target.value });
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile({
                name: profileFormData.name
            }).unwrap();
            alert("Profile updated successfully!");
        } catch (err) {
            console.error('Failed to update profile:', err);
            alert("Failed to update profile.");
        }
    };

    // Address Book Logic
    const { data: addresses, isLoading: isAddressLoading, isError: isAddressError, error: addressError } = useGetAddressesQuery();
    const [addAddress] = useAddAddressMutation();
    const [updateAddress] = useUpdateAddressMutation();
    const [deleteAddress] = useDeleteAddressMutation();

    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [addressFormData, setAddressFormData] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        type: 'HOME'
    });

    const handleOpenAddressModal = (address = null) => {
        if (address) {
            setEditingAddress(address);
            setAddressFormData({
                street: address.street,
                city: address.city,
                state: address.state,
                zipCode: address.zipCode,
                country: address.country,
                type: address.type
            });
        } else {
            setEditingAddress(null);
            setAddressFormData({
                street: '',
                city: '',
                state: '',
                zipCode: '',
                country: '',
                type: 'HOME'
            });
        }
        setIsAddressModalOpen(true);
    };

    const handleCloseAddressModal = () => {
        setIsAddressModalOpen(false);
        setEditingAddress(null);
    };

    const handleAddressChange = (e) => {
        setAddressFormData({ ...addressFormData, [e.target.name]: e.target.value });
    };

    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingAddress) {
                await updateAddress({ id: editingAddress.id, ...addressFormData }).unwrap();
                alert("Address updated successfully!");
            } else {
                await addAddress(addressFormData).unwrap();
                alert("Address added successfully!");
            }
            handleCloseAddressModal();
        } catch (err) {
            console.error('Failed to save address:', err);
            alert("Failed to save address.");
        }
    };

    const handleAddressDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this address?")) {
            try {
                await deleteAddress(id).unwrap();
                alert("Address deleted successfully!");
            } catch (err) {
                console.error('Failed to delete address:', err);
                alert("Failed to delete address.");
            }
        }
    };

    return (
        <ProfileManagementView
            // Profile Props
            profileFormData={profileFormData}
            onProfileChange={handleProfileChange}
            onProfileSubmit={handleProfileSubmit}
            isProfileLoading={isProfileLoading}
            isUpdatingProfile={isUpdatingProfile}
            isProfileError={isProfileError}
            profileError={profileError}

            // Address Props
            addresses={addresses}
            isAddressLoading={isAddressLoading}
            isAddressError={isAddressError}
            addressError={addressError}
            isAddressModalOpen={isAddressModalOpen}
            onOpenAddressModal={handleOpenAddressModal}
            onCloseAddressModal={handleCloseAddressModal}
            addressFormData={addressFormData}
            onAddressChange={handleAddressChange}
            onAddressSubmit={handleAddressSubmit}
            onAddressDelete={handleAddressDelete}
            editingAddress={editingAddress}
        />
    );
};

export default ProfileManagementContainer;
