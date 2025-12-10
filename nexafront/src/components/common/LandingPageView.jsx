import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPageView = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <div className="customer-page-bg" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>

            <motion.div
                className="text-center mb-16 relative z-10"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="glass-title" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
                    Welcome to <span style={{ color: 'var(--accent-color)' }}>NexaShop</span>
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                    The next generation e-commerce platform for everyone.
                </p>
            </motion.div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl relative z-10"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Customer Section */}
                <motion.div variants={itemVariants} className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛍️</div>
                    <h2 className="glass-header" style={{ marginBottom: '1rem' }}>Shopper</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', flexGrow: 1 }}>
                        Discover amazing products at unbeatable prices.
                    </p>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Link to="/login" className="glass-btn-primary" style={{ textAlign: 'center', textDecoration: 'none' }}>
                            Login
                        </Link>
                        <Link to="/register" className="glass-link" style={{ fontSize: '0.9rem' }}>
                            Create Account
                        </Link>
                    </div>
                </motion.div>

                {/* Seller Section */}
                <motion.div variants={itemVariants} className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💼</div>
                    <h2 className="glass-header" style={{ marginBottom: '1rem' }}>Seller</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', flexGrow: 1 }}>
                        Grow your business and reach millions of customers.
                    </p>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Link to="/seller/login" className="glass-btn-primary" style={{ textAlign: 'center', textDecoration: 'none', backgroundColor: '#10B981' }}>
                            Seller Login
                        </Link>
                        <Link to="/seller/register" className="glass-link" style={{ fontSize: '0.9rem' }}>
                            Become a Seller
                        </Link>
                    </div>
                </motion.div>

                {/* Admin Section */}
                <motion.div variants={itemVariants} className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚙️</div>
                    <h2 className="glass-header" style={{ marginBottom: '1rem' }}>Admin</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', flexGrow: 1 }}>
                        Manage the platform operations and users.
                    </p>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Link to="/admin/login" className="glass-btn-primary" style={{ textAlign: 'center', textDecoration: 'none', backgroundColor: '#6366F1' }}>
                            Admin Portal
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default LandingPageView;
