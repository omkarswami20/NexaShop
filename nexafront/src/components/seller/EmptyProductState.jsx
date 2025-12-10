import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddIcon from '@mui/icons-material/Add';

const EmptyProductState = ({ onAddProduct }) => {
    return (
        <Box
            sx={{
                p: 8,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Box sx={{ p: 3, mb: 3, bgcolor: 'action.hover', display: 'inline-flex' }}>
                <InventoryIcon sx={{ fontSize: 64, color: 'text.secondary', opacity: 0.6 }} />
            </Box>
            <Typography variant="h6" color="text.primary" gutterBottom fontWeight="600">
                No Products Yet
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
                Get started by adding your first product to your store.
            </Typography>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onAddProduct}
            >
                Add Your First Product
            </Button>
        </Box>
    );
};

export default EmptyProductState;
