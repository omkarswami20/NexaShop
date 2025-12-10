import React from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Typography,
    Chip,
    Avatar,
    Pagination,
    CircularProgress,
    Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InventoryIcon from '@mui/icons-material/Inventory';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import EmptyProductState from './EmptyProductState';

const ProductTable = ({
    products,
    isLoading,
    error,
    onStockUpdateClick,
    onStatusToggle,
    onEdit,
    onDelete,
    isDeleting,
    totalPages,
    currentPage,
    onPageChange,
    onAddProduct
}) => {
    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Alert severity="error">
                    {error?.data?.message || 'Failed to load products. Please try again.'}
                </Alert>
            </Box>
        );
    }

    if (!products || products.length === 0) {
        return <EmptyProductState onAddProduct={onAddProduct} />;
    }

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id} hover>
                                <TableCell>
                                    {product.imageUrl ? (
                                        <Avatar
                                            src={`http://localhost:8080${product.imageUrl}`}
                                            alt={product.name}
                                            variant="rounded"
                                            sx={{ width: 56, height: 56 }}
                                        />
                                    ) : (
                                        <Avatar variant="rounded" sx={{ width: 56, height: 56, bgcolor: 'grey.300' }}>
                                            <InventoryIcon />
                                        </Avatar>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Box>
                                        <Typography variant="body1" fontWeight="500">
                                            {product.name}
                                        </Typography>
                                        {product.description && (
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    maxWidth: 300,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                {product.description}
                                            </Typography>
                                        )}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    {product.category ? (
                                        <Chip
                                            label={product.category.name || product.category}
                                            size="small"
                                            variant="outlined"
                                            color="primary"
                                        />
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">
                                            -
                                        </Typography>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1" fontWeight="500">
                                        ₹{parseFloat(product.price).toFixed(2)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Typography
                                            variant="body1"
                                            color={product.stockQuantity > 0 ? 'text.primary' : 'error'}
                                            fontWeight="500"
                                        >
                                            {product.stockQuantity}
                                        </Typography>
                                        <IconButton
                                            size="small"
                                            onClick={() => onStockUpdateClick(product)}
                                            color="primary"
                                            title="Update Stock"
                                        >
                                            <Inventory2Icon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={product.status || 'ACTIVE'}
                                        color={product.status === 'ACTIVE' ? 'success' : 'default'}
                                        size="small"
                                        onClick={() => onStatusToggle(product)}
                                        icon={product.status === 'ACTIVE' ? <ToggleOnIcon /> : <ToggleOffIcon />}
                                        sx={{ cursor: 'pointer', minWidth: 100, justifyContent: 'flex-start' }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        size="small"
                                        onClick={() => onEdit(product)}
                                        disabled={isDeleting}
                                        color="primary"
                                        title="Edit"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => onDelete(product)}
                                        disabled={isDeleting}
                                        color="error"
                                        title="Delete"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {totalPages > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={onPageChange}
                        color="primary"
                        size="large"
                        showFirstButton
                        showLastButton
                    />
                </Box>
            )}
        </>
    );
};

export default ProductTable;
