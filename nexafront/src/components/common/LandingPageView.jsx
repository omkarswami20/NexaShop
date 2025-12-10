import React from 'react';
import { Box, Typography, Button, Grid, Paper, Container, Stack, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const LandingPageView = () => {
    return (
        <Box sx={{ minHeight: 'calc(100vh - 200px)', py: 6 }}>
            {/* Hero Section */}
            <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8, mb: 6, textAlign: 'center' }}>
                <Container maxWidth="md">
                    <Typography variant="h3" component="h1" fontWeight="600" gutterBottom>
                        Sell Online with NexaShop
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.95, mt: 2, fontWeight: 400 }}>
                        Growth, profitability, and customer reach - all in one place.
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="center">
                    {/* Customer Card */}
                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 5,
                                height: '100%',
                                border: '1px solid',
                                borderColor: 'divider',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center'
                            }}
                        >
                            <Box sx={{ mb: 3, color: 'primary.main' }}>
                                <ShoppingBagIcon sx={{ fontSize: 56 }} />
                            </Box>
                            <Typography variant="h5" fontWeight="600" gutterBottom>
                                Customer
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 300 }}>
                                Shop for the best products at the best prices.
                            </Typography>
                            <Button
                                component={Link}
                                to="/login"
                                variant="contained"
                                fullWidth
                                size="large"
                                sx={{ mb: 2 }}
                            >
                                Login
                            </Button>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, mt: 1 }}>
                                New Customer?
                            </Typography>
                            <Button
                                component={Link}
                                to="/register"
                                variant="outlined"
                                fullWidth
                            >
                                Register Now
                            </Button>
                        </Paper>
                    </Grid>

                    {/* Seller Card */}
                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 5,
                                height: '100%',
                                border: '1px solid',
                                borderColor: 'divider',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center'
                            }}
                        >
                            <Box sx={{ mb: 3, color: 'primary.main' }}>
                                <StorefrontIcon sx={{ fontSize: 56 }} />
                            </Box>
                            <Typography variant="h5" fontWeight="600" gutterBottom>
                                Seller
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 300 }}>
                                Log in to manage your orders, inventory, and payments.
                            </Typography>
                            <Button
                                component={Link}
                                to="/seller/login"
                                variant="contained"
                                fullWidth
                                size="large"
                                sx={{ mb: 2 }}
                            >
                                Login
                            </Button>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, mt: 1 }}>
                                New Seller?
                            </Typography>
                            <Button
                                component={Link}
                                to="/seller/register"
                                variant="outlined"
                                fullWidth
                            >
                                Register Now
                            </Button>
                        </Paper>
                    </Grid>

                    {/* Admin Card */}
                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 5,
                                height: '100%',
                                border: '1px solid',
                                borderColor: 'divider',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center'
                            }}
                        >
                            <Box sx={{ mb: 3, color: 'primary.main' }}>
                                <AdminPanelSettingsIcon sx={{ fontSize: 56 }} />
                            </Box>
                            <Typography variant="h5" fontWeight="600" gutterBottom>
                                Admin Portal
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 300 }}>
                                Manage the platform, approve sellers, and oversee operations.
                            </Typography>
                            <Button
                                component={Link}
                                to="/admin/login"
                                variant="contained"
                                color="secondary"
                                fullWidth
                                size="large"
                            >
                                Admin Login
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};



export default LandingPageView;
