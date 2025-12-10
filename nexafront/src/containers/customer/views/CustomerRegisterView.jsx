import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CustomerRegisterView = ({ formData, onChange, onSubmit, isLoading, isError, error }) => {
    return (
        <div className="customer-page-bg">


            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="glass-panel"
                style={{ maxWidth: '500px' }}
            >
                <div className="glass-header">
                    <h2>Join NexaShop</h2>
                    <p>Create an account to start shopping</p>
                </div>

                <form className="mt-8" onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name" className="sr-only">Full Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="glass-input"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username" className="sr-only">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            className="glass-input"
                            placeholder="Username"
                            value={formData.username}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="glass-input"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={onChange}
                        />
                    </div>



                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <div className="form-group">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="glass-input"
                                placeholder="Password"
                                value={formData.password}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="glass-input"
                                placeholder="Confirm"
                                value={formData.confirmPassword}
                                onChange={onChange}
                            />
                        </div>
                    </div>

                    {isError && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="message-box message-error"
                        >
                            {error?.data?.message || 'Registration failed'}
                        </motion.div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="glass-btn-primary"
                        >
                            {isLoading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </div>

                    <div className="form-footer">
                        <p>
                            Already have an account?{' '}
                            <Link to="/login" className="glass-link">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default CustomerRegisterView;
