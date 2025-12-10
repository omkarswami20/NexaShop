import React from 'react';

const CustomerProfileView = ({ formData, onChange, onSubmit, isLoading, isUpdating, isError, error }) => {
    if (isLoading) return <div className="customer-page-bg"><div className="glass-panel" style={{ textAlign: 'center', color: 'white' }}>Loading profile...</div></div>;
    if (isError) return <div className="customer-page-bg"><div className="glass-panel message-error">Error loading profile: {error?.data?.message || 'Unknown error'}</div></div>;

    return (
        <div className="customer-page-bg" style={{ alignItems: 'flex-start', paddingTop: '40px' }}>
            {/* Decorative Background Elements */}
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>

            <div className="profile-wrapper w-full"> {/* w-full is tailwind but wrapper handles logic if I wrote css right? actually no, wrapper had max-width. I need to make sure it's centered content */}

                <div className="profile-card">
                    <div className="profile-header">
                        <h1>My Profile</h1>
                        <p style={{ opacity: 0.8, marginTop: '5px' }}>Manage your personal information</p>
                    </div>

                    <div className="profile-body">
                        <form onSubmit={onSubmit}>
                            <div className="profile-field-group">
                                <label className="profile-label">Full name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={onChange}
                                    className="profile-input"
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div className="profile-field-group">
                                    <label className="profile-label">Username</label>
                                    <input
                                        type="text"
                                        value={formData.username}
                                        disabled
                                        className="profile-input"
                                    />
                                </div>

                                <div className="profile-field-group">
                                    <label className="profile-label">Email address</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        disabled
                                        className="profile-input"
                                    />
                                </div>
                            </div>

                            <div className="profile-field-group">
                                <label className="profile-label">Phone number</label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={onChange}
                                    className="profile-input"
                                />
                            </div>

                            <div className="profile-actions">
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="btn-save"
                                >
                                    {isUpdating ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerProfileView;
