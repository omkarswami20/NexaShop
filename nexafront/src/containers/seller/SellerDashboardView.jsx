import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import ProductFormDialog from '../../components/seller/ProductFormDialog';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import ProductFilters from '../../components/seller/ProductFilters';
import StockUpdateDialog from '../../components/seller/StockUpdateDialog';
import LogoutContainer from '../../containers/common/LogoutContainer';
import SellerStats from '../../components/seller/SellerStats';
import ProductTable from '../../components/seller/ProductTable';

const SellerDashboardView = ({
    products,
    isLoading,
    error,
    dialogOpen,
    selectedProduct,
    onOpenDialog,
    onCloseDialog,
    onSubmit,
    onDelete,
    isSubmitting,
    isDeleting,
    operationError,
    deleteConfirmOpen,
    productToDelete,
    onDeleteConfirm,
    onDeleteCancel,
    // filters state from Redux
    filters,
    onSearchChange,
    onCategoryChange,
    onStatusChange,
    onClearFilters,
    onStatusToggle,
    onStockUpdateClick,
    stockUpdateOpen,
    productToUpdateStock,
    onStockUpdate,
    onStockUpdateCancel,
    isUpdatingStock,
    onImageUpload,
    imageUploadLoading,
    // Pagination props
    currentPage = 1,
    totalPages = 0,
    totalProducts = 0,
    onPageChange,
    categories = [],
}) => {
    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Box>
                    <Typography variant="h4" gutterBottom fontWeight="600">
                        Seller Dashboard
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your products and inventory
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <LogoutContainer>
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<LogoutIcon />}
                            size="large"
                        >
                            Logout
                        </Button>
                    </LogoutContainer>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => onOpenDialog(null)}
                        size="large"
                    >
                        Add Product
                    </Button>
                </Box>
            </Box>

            <SellerStats products={products} isLoading={isLoading} />

            {operationError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {operationError?.data?.message || operationError?.data || 'An error occurred'}
                </Alert>
            )}

            <ProductFilters
                search={filters?.search || ''}
                category={filters?.category || ''}
                status={filters?.status || ''}
                categories={categories}
                onSearchChange={onSearchChange}
                onCategoryChange={onCategoryChange}
                onStatusChange={onStatusChange}
                onClearFilters={onClearFilters}
            />

            <Paper
                elevation={0}
                sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="h6" fontWeight="600">
                        My Products
                    </Typography>
                </Box>

                <ProductTable 
                    products={products}
                    isLoading={isLoading}
                    error={error}
                    onStockUpdateClick={onStockUpdateClick}
                    onStatusToggle={onStatusToggle}
                    onEdit={onOpenDialog}
                    onDelete={onDelete}
                    isDeleting={isDeleting}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    onAddProduct={() => onOpenDialog(null)}
                />
            </Paper>

            <ProductFormDialog
                open={dialogOpen}
                onClose={onCloseDialog}
                onSubmit={onSubmit}
                product={selectedProduct}
                isLoading={isSubmitting}
                error={operationError}
                onImageUpload={onImageUpload}
                imageUploadLoading={imageUploadLoading}
                categories={categories}
            />

            <StockUpdateDialog
                open={stockUpdateOpen}
                onClose={onStockUpdateCancel}
                onSubmit={onStockUpdate}
                product={productToUpdateStock}
                isLoading={isUpdatingStock}
                error={operationError}
            />

            <ConfirmationModal
                open={deleteConfirmOpen}
                onClose={onDeleteCancel}
                onConfirm={onDeleteConfirm}
                title="Delete Product"
                message={
                    productToDelete
                        ? `Are you sure you want to delete "${productToDelete.name}"? This action cannot be undone.`
                        : 'Are you sure you want to delete this product? This action cannot be undone.'
                }
                confirmText="Delete"
                cancelText="Cancel"
                confirmColor="error"
                isLoading={isDeleting}
            />
        </Box>
    );
};

export default SellerDashboardView;
