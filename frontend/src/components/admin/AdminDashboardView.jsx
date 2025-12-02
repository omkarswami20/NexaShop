import React from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress,
    Tabs, Tab
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const AdminDashboardView = ({
    isLoading,
    sellers,
    tabValue,
    onTabChange,
    onApprove,
    onRejectClick,
    openRejectDialog,
    onCloseRejectDialog,
    rejectionReason,
    onRejectionReasonChange,
    onRejectConfirm
}) => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom fontWeight="800" sx={{ mb: 1, background: 'linear-gradient(90deg, #fff, #94A3B8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Admin Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
                Manage sellers and oversee platform activity
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: 'rgba(255,255,255,0.1)', mb: 4 }}>
                <Tabs
                    value={tabValue}
                    onChange={onTabChange}
                    aria-label="seller status tabs"
                    textColor="secondary"
                    indicatorColor="secondary"
                    sx={{
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '1rem',
                            mr: 4,
                            color: 'text.secondary',
                            '&.Mui-selected': {
                                color: 'secondary.main',
                            },
                        },
                    }}
                >
                    <Tab label="All Sellers" />
                    <Tab label="Pending" />
                    <Tab label="Approved" />
                    <Tab label="Denied" />
                </Tabs>
            </Box>

            {isLoading ? (
                <Box display="flex" justifyContent="center" p={8}>
                    <CircularProgress color="secondary" />
                </Box>
            ) : (
                <TableContainer
                    component={Paper}
                    className="glass-card"
                    sx={{
                        borderRadius: 4,
                        boxShadow: 'none',
                        overflow: 'hidden'
                    }}
                >
                    <Table>
                        <TableHead sx={{ bgcolor: 'rgba(0,0,0,0.2)' }}>
                            <TableRow>
                                <TableCell sx={{ color: 'text.secondary', fontWeight: 600, py: 3 }}>Seller Name</TableCell>
                                <TableCell sx={{ color: 'text.secondary', fontWeight: 600, py: 3 }}>Email</TableCell>
                                <TableCell sx={{ color: 'text.secondary', fontWeight: 600, py: 3 }}>Store Name</TableCell>
                                <TableCell sx={{ color: 'text.secondary', fontWeight: 600, py: 3 }}>Status</TableCell>
                                <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 600, py: 3 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sellers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                                        <Typography variant="body1" color="text.secondary">
                                            No sellers found in this category.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                sellers.map((seller) => (
                                    <TableRow key={seller.id} hover sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' } }}>
                                        <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)', py: 2.5 }}>
                                            <Typography variant="body1" fontWeight="500">{seller.name}</Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)', py: 2.5 }}>{seller.email}</TableCell>
                                        <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)', py: 2.5 }}>{seller.storeName}</TableCell>
                                        <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)', py: 2.5 }}>
                                            <Chip
                                                label={seller.status.replace('_', ' ')}
                                                sx={{
                                                    fontWeight: 600,
                                                    borderRadius: 2,
                                                    bgcolor: seller.status === 'APPROVED' ? 'rgba(16, 185, 129, 0.1)' :
                                                        seller.status === 'DENIED' ? 'rgba(239, 68, 68, 0.1)' :
                                                            'rgba(245, 158, 11, 0.1)',
                                                    color: seller.status === 'APPROVED' ? '#10B981' :
                                                        seller.status === 'DENIED' ? '#EF4444' :
                                                            '#F59E0B',
                                                    border: '1px solid',
                                                    borderColor: seller.status === 'APPROVED' ? 'rgba(16, 185, 129, 0.2)' :
                                                        seller.status === 'DENIED' ? 'rgba(239, 68, 68, 0.2)' :
                                                            'rgba(245, 158, 11, 0.2)',
                                                }}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell align="right" sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)', py: 2.5 }}>
                                            {/* Actions for Pending Sellers */}
                                            {seller.status === 'PENDING_APPROVAL' && (
                                                <>
                                                    <Button
                                                        startIcon={<CheckCircleIcon />}
                                                        color="success"
                                                        onClick={() => onApprove(seller.id)}
                                                        sx={{ mr: 1, borderRadius: 2 }}
                                                        variant="outlined"
                                                        size="small"
                                                    >
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        startIcon={<CancelIcon />}
                                                        color="error"
                                                        onClick={() => onRejectClick(seller.id)}
                                                        sx={{ borderRadius: 2 }}
                                                        variant="outlined"
                                                        size="small"
                                                    >
                                                        Reject
                                                    </Button>
                                                </>
                                            )}

                                            {/* Actions for Approved Sellers (Can be Rejected/Banned) */}
                                            {seller.status === 'APPROVED' && (
                                                <Button
                                                    startIcon={<CancelIcon />}
                                                    color="error"
                                                    onClick={() => onRejectClick(seller.id)}
                                                    sx={{ borderRadius: 2 }}
                                                    variant="outlined"
                                                    size="small"
                                                >
                                                    Reject / Ban
                                                </Button>
                                            )}

                                            {/* Actions for Denied Sellers (Can be Re-Approved) */}
                                            {seller.status === 'DENIED' && (
                                                <Button
                                                    startIcon={<CheckCircleIcon />}
                                                    color="success"
                                                    onClick={() => onApprove(seller.id)}
                                                    sx={{ borderRadius: 2 }}
                                                    variant="outlined"
                                                    size="small"
                                                >
                                                    Re-Approve
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Rejection Dialog */}
            <Dialog
                open={openRejectDialog}
                onClose={onCloseRejectDialog}
                PaperProps={{
                    sx: {
                        bgcolor: '#1E293B',
                        backgroundImage: 'none',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 4
                    }
                }}
            >
                <DialogTitle sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)', pb: 2 }}>Reject Seller Application</DialogTitle>
                <DialogContent sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Please provide a reason for rejection. This will be emailed to the seller.
                    </Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Rejection Reason"
                        fullWidth
                        multiline
                        rows={3}
                        value={rejectionReason}
                        onChange={(e) => onRejectionReasonChange(e.target.value)}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions sx={{ p: 3, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <Button onClick={onCloseRejectDialog} color="inherit">Cancel</Button>
                    <Button onClick={onRejectConfirm} color="error" variant="contained">
                        Confirm Rejection
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminDashboardView;
