import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CustomerLoginView = ({ email, password, onEmailChange, onPasswordChange, onSubmit, isLoading, isError, error }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-2xl shadow-2xl z-10"
            >
                <div>
                    <h2 className="mt-2 text-center text-4xl font-extrabold text-white tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-center text-sm text-indigo-100">
                        Sign in to access your dashboard
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address or Phone</label>
                            <input
                                id="email-address"
                                name="email"
                                type="text"
                                autoComplete="email"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-white/30 placeholder-gray-300 text-white bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent focus:z-10 sm:text-sm transition-all duration-300 backdrop-blur-sm"
                                placeholder="Email address or Phone"
                                value={email}
                                onChange={(e) => onEmailChange(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-white/30 placeholder-gray-300 text-white bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent focus:z-10 sm:text-sm transition-all duration-300 backdrop-blur-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => onPasswordChange(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <Link to="/forgot-password" className="font-medium text-indigo-100 hover:text-white transition-colors">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    {isError && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-200 bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-sm text-center"
                        >
                            {error?.data?.message || 'Login failed'}
                        </motion.div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            {isLoading ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : null}
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-sm text-indigo-100">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-bold text-white hover:text-indigo-100 transition-colors">
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
