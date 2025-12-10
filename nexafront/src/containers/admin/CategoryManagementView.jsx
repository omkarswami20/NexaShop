import React from 'react';
import {
    Box,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    CircularProgress,
    Alert,
    Paper,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Folder as FolderIcon,
} from '@mui/icons-material';

const CategoryManagementView = ({
    categories,
    isLoading,
    error,
    dialogOpen,
    editingCategory,
    formData,
    notification,
    onOpenDialog,
    onCloseDialog,
    onSubmit,
    onDelete,
    onFormDataChange,
}) => {
    if (isLoading) return <CircularProgress />;
    if (error) return <Alert severity="error">Error loading categories</Alert>;

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5" component="h2">
                    Category Management
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => onOpenDialog()}
                >
                    Add Category
                </Button>
            </Box>

            {notification.open && (
                <Alert severity={notification.severity} sx={{ mb: 2 }}>
                    {notification.message}
                </Alert>
            )}

            <Paper elevation={2}>
                <List>
                    {categories && categories.map((category) => (
                        <ListItem
                            key={category.id}
                            sx={{
                                borderBottom: '1px solid #eee',
                                '&:hover': { bgcolor: '#f5f5f5' },
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                                <Box sx={{ mr: 2, color: 'primary.main' }}>
                                    <FolderIcon />
                                </Box>
                                <ListItemText
                                    primary={category.name}
                                    secondary={category.description}
                                />
                            </Box>
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    aria-label="edit"
                                    onClick={() => onOpenDialog(category)}
                                    size="small"
                                    sx={{ mr: 1 }}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => onDelete(category.id)}
                                    size="small"
                                    color="error"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                    {categories && categories.length === 0 && (
                        <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
                            No categories found. Create one to get started.
                        </Box>
                    )}
                </List>
            </Paper>

            <Dialog open={dialogOpen} onClose={onCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingCategory ? 'Edit Category' : 'Add Category'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Category Name"
                        fullWidth
                        value={formData.name}
                        onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                        value={formData.description}
                        onChange={(e) => onFormDataChange({ ...formData, description: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseDialog}>Cancel</Button>
                    <Button onClick={onSubmit} variant="contained" disabled={!formData.name}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CategoryManagementView;
