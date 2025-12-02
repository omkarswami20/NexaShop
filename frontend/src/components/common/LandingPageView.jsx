import React from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const LandingPageView = () => {
    return (
    return (
        <Box sx={{ textAlign: 'center', mt: 10 }}>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <Typography
                    variant="h1"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontSize: { xs: '3rem', md: '5rem' },
                        background: 'linear-gradient(135deg, #F8FAFC 0%, #94A3B8 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 3,
                        textShadow: '0 0 40px rgba(255,255,255,0.1)'
                    }}
                >
                    Welcome to NexaShop
                </Typography>
                <Typography
                    variant="h5"
                    color="text.secondary"
                    paragraph
                    sx={{
                        mb: 8,
                        maxWidth: '700px',
                        mx: 'auto',
                        lineHeight: 1.6,
                        fontWeight: 400
                    }}
                >
                    Experience the future of e-commerce. Join our premium marketplace as a seller or manage your empire with our state-of-the-art tools.
                </Typography>
            </motion.div>

            <Grid container spacing={6} justifyContent="center">
                <Grid item xs={12} md={5}>
                    <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Paper
                            className="glass-card"
                            sx={{
                                p: 6,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                borderRadius: 8,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    boxShadow: '0 0 30px rgba(108, 99, 255, 0.15)'
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    p: 2,
                                    borderRadius: '50%',
                                    bgcolor: 'rgba(108, 99, 255, 0.1)',
                                    mb: 3
                                }}
                            >
                                <StorefrontIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                            </Box>
                            <Typography variant="h4" gutterBottom fontWeight="bold">
                                Become a Seller
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
                                Start your journey with us. Register your store and reach millions of customers instantly.
                            </Typography>
                            <Box sx={{ mt: 'auto', display: 'flex', gap: 2, width: '100%' }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    component={Link}
                                    to="/seller/register"
                                >
                                    Register
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    fullWidth
                                    component={Link}
                                    to="/seller/login"
                                    sx={{
                                        borderColor: 'rgba(255,255,255,0.2)',
                                        color: 'text.primary',
                                        '&:hover': {
                                            borderColor: 'text.primary',
                                            bgcolor: 'rgba(255,255,255,0.05)'
                                        }
                                    }}
                                >
                                    Login
                                </Button>
                            </Box>
                        </Paper>
                    </motion.div>
                </Grid>

                <Grid item xs={12} md={5}>
                    <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Paper
                            className="glass-card"
                            sx={{
                                p: 6,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                borderRadius: 8,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    borderColor: 'secondary.main',
                                    boxShadow: '0 0 30px rgba(0, 229, 255, 0.15)'
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    p: 2,
                                    borderRadius: '50%',
                                    bgcolor: 'rgba(0, 229, 255, 0.1)',
                                    mb: 3
                                }}
                            >
                                <AdminPanelSettingsIcon sx={{ fontSize: 48, color: 'secondary.main' }} />
                            </Box>
                            <Typography variant="h4" gutterBottom fontWeight="bold">
                                Admin Portal
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
                                Manage sellers, approve requests, and oversee the platform operations with ease.
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                fullWidth
                                component={Link}
                                to="/admin/login"
                                sx={{ mt: 'auto' }}
                            >
                                Admin Login
                            </Button>
                        </Paper>
                    </motion.div>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LandingPageView;
