import React from 'react';
import { Box, TextField, Button, Typography, Paper, Alert, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SellerRegisterView = ({
    formData,
    onChange,
    onSubmit,
    isLoading,
    isSuccess,
    isError,
    error
}) => {
    return (
        <Box sx={{ maxWidth: 550, mx: 'auto', mt: 6 }}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Paper
                    className="glass-card"
                    sx={{
                        p: 5,
                        borderRadius: 6,
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '4px',
                            background: 'linear-gradient(90deg, #6C63FF, #00E5FF)'
                        }}
                    />

                    <Typography variant="h4" align="center" gutterBottom fontWeight="800" sx={{ mb: 1 }}>
                        Seller Registration
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
                        Join NexaShop and start selling today
                    </Typography>

                    {isSuccess && (
                        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                            Registration successful! Please wait for admin approval. You can try logging in once approved.
                        </Alert>
                    )}
                    {isError && (
                        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                            {error?.data?.message || error?.data || 'Registration failed. Please try again.'}
                        </Alert>
                    )}

                    <form onSubmit={onSubmit}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={onChange}
                            margin="normal"
                            required
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={onChange}
                            margin="normal"
                            required
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={onChange}
                            margin="normal"
                            required
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Store Name"
                            name="storeName"
                            value={formData.storeName}
                            onChange={onChange}
                            margin="normal"
                            required
                            variant="outlined"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{ mt: 4, mb: 3, py: 1.5, fontSize: '1rem' }}
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Create Seller Account'}
                        </Button>

                        <Box textAlign="center">
                            <Link to="/seller/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography variant="body2" sx={{ '&:hover': { color: 'primary.main' }, transition: 'color 0.2s' }}>
                                    Already have an account? <span style={{ fontWeight: 600 }}>Login here</span>
                                </Typography>
                            </Link>
                        </Box>
                    </form>
                </Paper>
            </motion.div>
        </Box>
    );
};

export default SellerRegisterView;
