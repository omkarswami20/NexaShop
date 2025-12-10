import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordView = ({
    step,
    identifier,
    setIdentifier,
    otp,
    setOtp,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    onRequestOtp,
    onResetPassword,
    isLoading
}) => {
    return (
        <div className="customer-page-bg">
            {/* Decorative Background Elements */}
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>

            <div className="glass-panel" style={{ textAlign: 'center' }}>
                <div className="glass-header">
                    <h2>{step === 1 ? 'Reset Password' : 'New Password'}</h2>
                    <p>
                        Or <Link to="/login" className="glass-link" style={{ fontSize: '0.9rem' }}>sign in to your account</Link>
                    </p>
                </div>

                {step === 1 ? (
                    <form className="mt-8" onSubmit={onRequestOtp}>
                        <div className="form-group">
                            <label htmlFor="identifier" className="sr-only">Email or Phone</label>
                            <input
                                id="identifier"
                                name="identifier"
                                type="text"
                                required
                                className="glass-input"
                                placeholder="Enter your Email or Phone"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="glass-btn-primary"
                            >
                                {isLoading ? 'Sending OTP...' : 'Send OTP'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <form className="mt-8" onSubmit={onResetPassword}>
                        <div className="form-group">
                            <label htmlFor="otp" className="sr-only">OTP</label>
                            <input
                                id="otp"
                                name="otp"
                                type="text"
                                required
                                className="glass-input"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassword" className="sr-only">New Password</label>
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                required
                                className="glass-input"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className="glass-input"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="glass-btn-primary"
                            >
                                {isLoading ? 'Resetting Password...' : 'Reset Password'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordView;
