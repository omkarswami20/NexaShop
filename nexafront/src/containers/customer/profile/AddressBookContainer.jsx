import React, { useState } from 'react';
import { useGetAddressesQuery, useAddAddressMutation, useUpdateAddressMutation, useDeleteAddressMutation } from '../../../store/api/customerApi';
import AddressBookView from '../views/AddressBookView';

const AddressBookContainer = () => {
    const { data: addresses, isLoading, isError, error } = useGetAddressesQuery();
    const [addAddress] = useAddAddressMutation();
    const [updateAddress] = useUpdateAddressMutation();
    const [deleteAddress] = useDeleteAddressMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [formData, setFormData] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        type: 'HOME'
    });

    const handleOpenModal = (address = null) => {
        if (address) {
            setEditingAddress(address);
            setFormData({
                street: address.street,
                city: address.city,
                state: address.state,
                zipCode: address.zipCode,
                country: address.country,
                type: address.type
            });
        } else {
            setEditingAddress(null);
            setFormData({
                street: '',
                city: '',
                state: '',
                zipCode: '',
                country: '',
                type: 'HOME'
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingAddress(null);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingAddress) {
                await updateAddress({ id: editingAddress.id, ...formData }).unwrap();
                alert("Address updated successfully!");
            } else {
                await addAddress(formData).unwrap();
                alert("Address added successfully!");
            }
            handleCloseModal();
        } catch (err) {
            console.error('Failed to save address:', err);
            alert("Failed to save address.");
        }
    };

    const handleDelete = async (id) => {
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
        <AddressBookView
            addresses={addresses}
            isLoading={isLoading}
            isError={isError}
            error={error}
            isModalOpen={isModalOpen}
            onOpenModal={handleOpenModal}
            onCloseModal={handleCloseModal}
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            editingAddress={editingAddress}
        />
    );
};

export default AddressBookContainer;
