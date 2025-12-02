import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import { motion } from 'framer-motion';

const SellerDashboardView = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom fontWeight="800" sx={{ mb: 4, background: 'linear-gradient(90deg, #fff, #94A3B8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Seller Dashboard
            </Typography>

            <Grid container spacing={4} sx={{ mb: 6 }}>
                <Grid item xs={12} md={4}>
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <Card className="glass-card" sx={{ borderLeft: '4px solid #10B981' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box display="flex" alignItems="center" gap={3}>
                                    <Box sx={{ p: 1.5, borderRadius: '50%', bgcolor: 'rgba(16, 185, 129, 0.1)' }}>
                                        <CheckCircleIcon fontSize="large" sx={{ color: '#10B981' }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">Store Status</Typography>
                                        <Typography variant="h5" fontWeight="bold" sx={{ color: '#10B981' }}>Active</Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <Card className="glass-card" sx={{ borderLeft: '4px solid #6C63FF' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box display="flex" alignItems="center" gap={3}>
                                    <Box sx={{ p: 1.5, borderRadius: '50%', bgcolor: 'rgba(108, 99, 255, 0.1)' }}>
                                        <InventoryIcon fontSize="large" sx={{ color: '#6C63FF' }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">Total Products</Typography>
                                        <Typography variant="h5" fontWeight="bold" color="text.primary">0</Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>
            </Grid>

            <Paper
                className="glass-card"
                sx={{
                    p: 8,
                    textAlign: 'center',
                    minHeight: 400,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    borderRadius: 8,
                    border: '1px dashed rgba(255,255,255,0.1)'
                }}
            >
                <Box sx={{ p: 4, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.03)', mb: 3 }}>
                    <InventoryIcon sx={{ fontSize: 80, color: 'text.secondary', opacity: 0.5 }} />
                </Box>
                <Typography variant="h5" color="text.primary" gutterBottom fontWeight="600">
                    Product Management Coming Soon
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500 }}>
                    We are building a powerful suite of tools for you to add, manage, and track your products. Stay tuned for updates!
                </Typography>
            </Paper>
        </Box>
    );
};

export default SellerDashboardView;
