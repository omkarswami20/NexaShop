import React from 'react';

const AddressBookView = ({
    addresses,
    isLoading,
    isError,
    error,
    isModalOpen,
    onOpenModal,
    onCloseModal,
    formData,
    onChange,
    onSubmit,
    onDelete,
    editingAddress
}) => {
    if (isLoading) return <div className="text-center py-10">Loading addresses...</div>;
    if (isError) return <div className="text-center py-10 text-red-500">Error loading addresses: {error?.data?.message || 'Unknown error'}</div>;

    return (
        <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Address Book</h1>
                <button
                    onClick={() => onOpenModal()}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Add New Address
                </button>
            </div>

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
                                    onClick={() => onOpenModal(address)}
                                    className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(address.id)}
                                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {addresses?.length === 0 && (
                    <div className="col-span-full text-center py-10 text-gray-500">
                        No addresses found. Add one to get started.
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onCloseModal}></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={onSubmit}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                                {editingAddress ? 'Edit Address' : 'Add New Address'}
                                            </h3>
                                            <div className="mt-4 space-y-4">
                                                <div>
                                                    <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street</label>
                                                    <input type="text" name="street" id="street" required value={formData.street} onChange={onChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                                        <input type="text" name="city" id="city" required value={formData.city} onChange={onChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                                                        <input type="text" name="state" id="state" required value={formData.state} onChange={onChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">Zip Code</label>
                                                        <input type="text" name="zipCode" id="zipCode" required value={formData.zipCode} onChange={onChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                                                        <input type="text" name="country" id="country" required value={formData.country} onChange={onChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Address Type</label>
                                                    <select name="type" id="type" value={formData.type} onChange={onChange} className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
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
                                    <button type="button" onClick={onCloseModal} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
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

export default AddressBookView;
