import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CustomerRegisterView = ({ formData, onChange, onSubmit, isLoading, isSuccess, isError, error }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
             {/* Decorative Background Elements */}
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-2xl shadow-2xl z-10"
            >
                <div>
                    <h2 className="mt-2 text-center text-4xl font-extrabold text-white tracking-tight">
                        Join NexaShop
                    </h2>
                    <p className="mt-2 text-center text-sm text-indigo-100">
                        Create an account to start shopping
                    </p>
                </div>
                <form className="mt-8 space-y-4" onSubmit={onSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="sr-only">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-white/30 placeholder-gray-300 text-white bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent focus:z-10 sm:text-sm transition-all duration-300 backdrop-blur-sm"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={onChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-white/30 placeholder-gray-300 text-white bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent focus:z-10 sm:text-sm transition-all duration-300 backdrop-blur-sm"
                                placeholder="Username"
                                value={formData.username}
                                onChange={onChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-white/30 placeholder-gray-300 text-white bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent focus:z-10 sm:text-sm transition-all duration-300 backdrop-blur-sm"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={onChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="phoneNumber" className="sr-only">Phone Number</label>
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-white/30 placeholder-gray-300 text-white bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent focus:z-10 sm:text-sm transition-all duration-300 backdrop-blur-sm"
                                placeholder="Phone Number"
                                value={formData.phoneNumber}
                                onChange={onChange}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none relative block w-full px-4 py-3 border border-white/30 placeholder-gray-300 text-white bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent focus:z-10 sm:text-sm transition-all duration-300 backdrop-blur-sm"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none relative block w-full px-4 py-3 border border-white/30 placeholder-gray-300 text-white bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent focus:z-10 sm:text-sm transition-all duration-300 backdrop-blur-sm"
                                    placeholder="Confirm"
                                    value={formData.confirmPassword}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                    </div>

                    {isError && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-200 bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-sm text-center"
                        >
                            {error?.data?.message || 'Registration failed'}
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
                            {isLoading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-sm text-indigo-100">
                            Already have an account?{' '}
                            <Link to="/login" className="font-bold text-white hover:text-indigo-100 transition-colors">
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
