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
        <div className="customer-page-bg" style={{ alignItems: 'flex-start', paddingTop: '80px', height: 'auto', minHeight: '100vh' }}>
            <div className="dashboard-container w-full">
                <h1 className="glass-title" style={{ textAlign: 'left', marginBottom: '30px' }}>Account Management</h1>

                {/* Tabs */}
                <div className="tabs-nav">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                    >
                        My Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('addresses')}
                        className={`tab-btn ${activeTab === 'addresses' ? 'active' : ''}`}
                    >
                        Address Book
                    </button>
                </div>

                {/* Profile Content */}
                {activeTab === 'profile' && (
                    <div className="glass-panel" style={{ maxWidth: '800px', margin: '0' }}>
                        {isProfileLoading ? (
                            <div className="text-center py-10" style={{ color: 'var(--text-main)' }}>Loading profile...</div>
                        ) : isProfileError ? (
                            <div className="message-box message-error">Error loading profile: {profileError?.data?.message || 'Unknown error'}</div>
                        ) : (
                            <form onSubmit={onProfileSubmit}>
                                <div className="glass-header" style={{ textAlign: 'left' }}>
                                    <h3>Personal Information</h3>
                                    <p>Update your personal details.</p>
                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    <div className="form-group">
                                        <label className="profile-label" style={{ color: 'var(--text-muted)' }}>Full name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={profileFormData.name}
                                            onChange={onProfileChange}
                                            className="glass-input"
                                        />
                                    </div>
                                    <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div>
                                            <label className="profile-label" style={{ color: 'var(--text-muted)' }}>Username</label>
                                            <input
                                                type="text"
                                                value={profileFormData.username}
                                                disabled
                                                className="glass-input"
                                                style={{ opacity: 0.7, cursor: 'not-allowed', backgroundColor: 'var(--bg-tertiary)' }}
                                            />
                                        </div>
                                        <div>
                                            <label className="profile-label" style={{ color: 'var(--text-muted)' }}>Email address</label>
                                            <input
                                                type="email"
                                                value={profileFormData.email}
                                                disabled
                                                className="glass-input"
                                                style={{ opacity: 0.7, cursor: 'not-allowed', backgroundColor: 'var(--bg-tertiary)' }}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ textAlign: 'right', marginTop: '30px' }}>
                                        <button
                                            type="submit"
                                            disabled={isUpdatingProfile}
                                            className="glass-btn-primary"
                                            style={{ width: 'auto', display: 'inline-block', padding: '12px 30px' }}
                                        >
                                            {isUpdatingProfile ? 'Saving...' : 'Save Changes'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                )}

                {/* Address Content */}
                {activeTab === 'addresses' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-main)' }}>Saved Addresses</h2>
                            <button
                                onClick={() => onOpenAddressModal()}
                                className="glass-btn-primary"
                                style={{ width: 'auto', padding: '10px 20px' }}
                            >
                                Add New Address
                            </button>
                        </div>

                        {isAddressLoading ? (
                            <div className="text-center py-10" style={{ color: 'var(--text-main)' }}>Loading addresses...</div>
                        ) : isAddressError ? (
                            <div className="message-box message-error">Error loading addresses: {addressError?.data?.message || 'Unknown error'}</div>
                        ) : (
                            <div className="address-grid">
                                {addresses?.map((address) => (
                                    <div key={address.id} className="address-card">
                                        <span className={`address-tag ${address.type === 'HOME' ? 'tag-home' : address.type === 'WORK' ? 'tag-work' : 'tag-other'}`}>
                                            {address.type}
                                        </span>
                                        <p style={{ marginTop: '10px', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                                            {address.street}<br />
                                            {address.city}, {address.state} {address.zipCode}<br />
                                            {address.country}
                                        </p>
                                        <div className="address-actions">
                                            <button
                                                onClick={() => onOpenAddressModal(address)}
                                                className="btn-text btn-edit"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => onAddressDelete(address.id)}
                                                className="btn-text btn-delete"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {addresses?.length === 0 && (
                                    <div className="address-card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                                        No addresses found. Add one to get started.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Address Modal */}
                {isAddressModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <form onSubmit={onAddressSubmit}>
                                <div className="modal-header">
                                    <h3>{editingAddress ? 'Edit Address' : 'Add New Address'}</h3>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label className="profile-label" style={{ color: 'var(--text-muted)' }}>Street</label>
                                        <input type="text" name="street" required value={addressFormData.street} onChange={onAddressChange} className="glass-input" />
                                    </div>
                                    <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                        <div>
                                            <label className="profile-label" style={{ color: 'var(--text-muted)' }}>City</label>
                                            <input type="text" name="city" required value={addressFormData.city} onChange={onAddressChange} className="glass-input" />
                                        </div>
                                        <div>
                                            <label className="profile-label" style={{ color: 'var(--text-muted)' }}>State</label>
                                            <input type="text" name="state" required value={addressFormData.state} onChange={onAddressChange} className="glass-input" />
                                        </div>
                                    </div>
                                    <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                        <div>
                                            <label className="profile-label" style={{ color: 'var(--text-muted)' }}>Zip Code</label>
                                            <input type="text" name="zipCode" required value={addressFormData.zipCode} onChange={onAddressChange} className="glass-input" />
                                        </div>
                                        <div>
                                            <label className="profile-label" style={{ color: 'var(--text-muted)' }}>Country</label>
                                            <input type="text" name="country" required value={addressFormData.country} onChange={onAddressChange} className="glass-input" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="profile-label" style={{ color: 'var(--text-muted)' }}>Address Type</label>
                                        <select name="type" value={addressFormData.type} onChange={onAddressChange} className="glass-input" style={{ cursor: 'pointer' }}>
                                            <option value="HOME" style={{ color: 'var(--text-main)', backgroundColor: 'var(--bg-secondary)' }}>Home</option>
                                            <option value="WORK" style={{ color: 'var(--text-main)', backgroundColor: 'var(--bg-secondary)' }}>Work</option>
                                            <option value="OTHER" style={{ color: 'var(--text-main)', backgroundColor: 'var(--bg-secondary)' }}>Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" onClick={onCloseAddressModal} className="btn-secondary">
                                        Cancel
                                    </button>
                                    <button type="submit" className="glass-btn-primary" style={{ width: 'auto', padding: '10px 24px' }}>
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileManagementView;
