import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Chip,
    Button,
    Paper,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const SellerTable = ({ sellers, onApprove, onRejectClick }) => {
    return (
        <TableContainer
            component={Paper}
            elevation={0}
            sx={{
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Table>
                <TableHead>
                    <TableRow sx={{ bgcolor: 'action.hover' }}>
                        <TableCell sx={{ fontWeight: 600, py: 2 }}>Seller Name</TableCell>
                        <TableCell sx={{ fontWeight: 600, py: 2 }}>Email</TableCell>
                        <TableCell sx={{ fontWeight: 600, py: 2 }}>Store Name</TableCell>
                        <TableCell sx={{ fontWeight: 600, py: 2 }}>Status</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600, py: 2 }}>Actions</TableCell>
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
                            <TableRow key={seller.id} hover>
                                <TableCell sx={{ py: 2.5 }}>
                                    <Typography variant="body1" fontWeight={500}>{seller.name}</Typography>
                                </TableCell>
                                <TableCell sx={{ py: 2.5 }}>{seller.email}</TableCell>
                                <TableCell sx={{ py: 2.5 }}>{seller.storeName}</TableCell>
                                <TableCell sx={{ py: 2.5 }}>
                                    <Chip
                                        label={seller.status.replace('_', ' ')}
                                        sx={{
                                            fontWeight: 500,
                                            bgcolor: seller.status === 'APPROVED' ? 'success.light' :
                                                seller.status === 'DENIED' ? 'error.light' :
                                                    'warning.light',
                                            color: seller.status === 'APPROVED' ? 'success.dark' :
                                                seller.status === 'DENIED' ? 'error.dark' :
                                                    'warning.dark',
                                        }}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="right" sx={{ py: 2.5 }}>
                                    {/* Actions for Pending Sellers */}
                                    {seller.status === 'PENDING_APPROVAL' && (
                                        <>
                                            <Button
                                                startIcon={<CheckCircleIcon />}
                                                color="success"
                                                onClick={() => onApprove(seller.id)}
                                                sx={{ mr: 1 }}
                                                variant="outlined"
                                                size="small"
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                startIcon={<CancelIcon />}
                                                color="error"
                                                onClick={() => onRejectClick(seller.id)}
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
    );
};

export default SellerTable;
