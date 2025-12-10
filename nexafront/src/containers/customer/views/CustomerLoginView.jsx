import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CustomerLoginView = ({ email, password, onEmailChange, onPasswordChange, onSubmit, isLoading, isError, error }) => {
    return (
        <div className="customer-page-bg">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-panel"
            >
                <div className="glass-header">
                    <h2>Welcome Back</h2>
                    <p>Sign in to access your dashboard</p>
                </div>

                <form className="mt-8" onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="email-address" className="sr-only">Email address or Username</label>
                        <input
                            id="email-address"
                            name="email"
                            type="text"
                            autoComplete="email"
                            required
                            className="glass-input"
                            placeholder="Email address or Username"
                            value={email}
                            onChange={(e) => onEmailChange(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="glass-input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => onPasswordChange(e.target.value)}
                        />
                    </div>

                    <div className="form-group" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Link to="/forgot-password" className="glass-link" style={{ fontSize: '0.9rem' }}>
                            Forgot your password?
                        </Link>
                    </div>

                    {isError && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="message-box message-error"
                        >
                            {error?.data?.message || 'Login failed'}
                        </motion.div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="glass-btn-primary"
                        >
                            {isLoading ? (
                                <span style={{ marginRight: '10px' }}>Loading...</span>
                            ) : null}
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>

                    <div className="form-footer">
                        <p>
                            Don't have an account?{' '}
                            <Link to="/register" className="glass-link">
                                Create one now
                            </Link>
                        </p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default CustomerLoginView;
