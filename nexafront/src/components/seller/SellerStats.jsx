import React from 'react';
import { Grid, Card, CardContent, Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InventoryIcon from '@mui/icons-material/Inventory';

const SellerStats = ({ products, isLoading }) => {
    return (
        <Grid container spacing={3} sx={{ mb: 5 }}>
            <Grid item xs={12} md={4}>
                <Card
                    elevation={0}
                    sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderLeft: '4px solid',
                        borderLeftColor: 'success.main',
                    }}
                >
                    <CardContent sx={{ p: 3 }}>
                        <Box display="flex" alignItems="center" gap={2.5}>
                            <Box
                                sx={{
                                    p: 1.5,
                                    bgcolor: 'success.light',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <CheckCircleIcon sx={{ color: 'success.dark' }} />
                            </Box>
                            <Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                    Store Status
                                </Typography>
                                <Typography variant="h5" fontWeight="600" color="success.dark">
                                    Active
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card
                    elevation={0}
                    sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderLeft: '4px solid',
                        borderLeftColor: 'primary.main',
                    }}
                >
                    <CardContent sx={{ p: 3 }}>
                        <Box display="flex" alignItems="center" gap={2.5}>
                            <Box
                                sx={{
                                    p: 1.5,
                                    bgcolor: 'primary.light',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <InventoryIcon sx={{ color: 'primary.dark' }} />
                            </Box>
                            <Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                    Total Products
                                </Typography>
                                <Typography variant="h5" fontWeight="600" color="text.primary">
                                    {isLoading ? '...' : products?.length || 0}
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default SellerStats;
