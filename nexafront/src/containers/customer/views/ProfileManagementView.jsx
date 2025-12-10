import React, { useState } from 'react';

const ProfileManagementView = ({
    // Profile Props
    profileFormData,
    onProfileChange,
    onProfileSubmit,
    isProfileLoading,
    isUpdatingProfile,
    isProfileError,
    profileError,

    // Address Props
    addresses,
    isAddressLoading,
    isAddressError,
    addressError,
    isAddressModalOpen,
    onOpenAddressModal,
    onCloseAddressModal,
    addressFormData,
    onAddressChange,
    onAddressSubmit,
    onAddressDelete,
    editingAddress
}) => {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Account Management</h1>
            
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`${
                            activeTab === 'profile'
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        My Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('addresses')}
                        className={`${
                            activeTab === 'addresses'
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Address Book
                    </button>
                </nav>
            </div>

            {/* Profile Content */}
            {activeTab === 'profile' && (
                <div>
                    {isProfileLoading ? (
                        <div className="text-center py-10">Loading profile...</div>
                    ) : isProfileError ? (
                        <div className="text-center py-10 text-red-500">Error loading profile: {profileError?.data?.message || 'Unknown error'}</div>
                    ) : (
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg max-w-3xl">
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Update your personal details.</p>
                            </div>
                            <div className="border-t border-gray-200">
                                <form onSubmit={onProfileSubmit}>
                                    <dl>
                                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">Full name</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={profileFormData.name}
                                                    onChange={onProfileChange}
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </dd>
                                        </div>
                                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">Username</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="text"
                                                    value={profileFormData.username}
                                                    disabled
                                                    className="bg-gray-100 block w-full sm:text-sm border-gray-300 rounded-md cursor-not-allowed"
                                                />
                                            </dd>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="email"
                                                    value={profileFormData.email}
                                                    disabled
                                                    className="bg-gray-100 block w-full sm:text-sm border-gray-300 rounded-md cursor-not-allowed"
                                                />
                                            </dd>
                                        </div>
                                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <input
                                                    type="tel"
                                                    name="phoneNumber"
                                                    value={profileFormData.phoneNumber}
                                                    onChange={onProfileChange}
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </dd>
                                        </div>
                                    </dl>
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <button
                                            type="submit"
                                            disabled={isUpdatingProfile}
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                        >
                                            {isUpdatingProfile ? 'Saving...' : 'Save Changes'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Address Content */}
            {activeTab === 'addresses' && (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Saved Addresses</h2>
                        <button
                            onClick={() => onOpenAddressModal()}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Add New Address
                        </button>
                    </div>

                    {isAddressLoading ? (
                        <div className="text-center py-10">Loading addresses...</div>
                    ) : isAddressError ? (
                        <div className="text-center py-10 text-red-500">Error loading addresses: {addressError?.data?.message || 'Unknown error'}</div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {addresses?.map((address) => (
                                <div key={address.id} className="bg-white overflow-hidden shadow rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${address.type === 'HOME' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                                    {address.type}
                                                </span>
                                                <p className="mt-2 text-sm text-gray-500">
                                                    {address.street}<br />
                                                    {address.city}, {address.state} {address.zipCode}<br />
                                                    {address.country}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex space-x-3">
                                            <button
                                                onClick={() => onOpenAddressModal(address)}
                                                className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => onAddressDelete(address.id)}
                                                className="text-red-600 hover:text-red-900 text-sm font-medium"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {addresses?.length === 0 && (
                                <div className="col-span-full text-center py-10 text-gray-500 bg-white rounded-lg shadow">
                                    No addresses found. Add one to get started.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Address Modal */}
            {isAddressModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onCloseAddressModal}></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={onAddressSubmit}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                                {editingAddress ? 'Edit Address' : 'Add New Address'}
                                            </h3>
                                            <div className="mt-4 space-y-4">
                                                <div>
                                                    <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street</label>
                                                    <input type="text" name="street" id="street" required value={addressFormData.street} onChange={onAddressChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                                        <input type="text" name="city" id="city" required value={addressFormData.city} onChange={onAddressChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                                                        <input type="text" name="state" id="state" required value={addressFormData.state} onChange={onAddressChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">Zip Code</label>
                                                        <input type="text" name="zipCode" id="zipCode" required value={addressFormData.zipCode} onChange={onAddressChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                                                        <input type="text" name="country" id="country" required value={addressFormData.country} onChange={onAddressChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Address Type</label>
                                                    <select name="type" id="type" value={addressFormData.type} onChange={onAddressChange} className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                        <option value="HOME">Home</option>
                                                        <option value="WORK">Work</option>
                                                        <option value="OTHER">Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                                        Save
                                    </button>
                                    <button type="button" onClick={onCloseAddressModal} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileManagementView;
