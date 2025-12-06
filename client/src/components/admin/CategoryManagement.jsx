import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Collapse,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    CircularProgress,
    Alert,
    Paper,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    ExpandLess,
    ExpandMore,
    Folder as FolderIcon,
    FolderOpen as FolderOpenIcon,
} from '@mui/icons-material';
import {
    useGetCategoryTreeQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} from '../../services/api';

const CategoryItem = ({ category, onEdit, onDelete, onAddSub, level = 0 }) => {
    const [open, setOpen] = useState(false);
    const hasChildren = category.children && category.children.length > 0;

    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItem
                sx={{
                    pl: level * 4,
                    borderBottom: '1px solid #eee',
                    '&:hover': { bgcolor: '#f5f5f5' },
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    {hasChildren ? (
                        <IconButton size="small" onClick={handleToggle}>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    ) : (
                        <Box sx={{ width: 34 }} /> // Spacer for alignment
                    )}
                    <Box sx={{ mr: 2, color: 'primary.main' }}>
                        {open ? <FolderOpenIcon /> : <FolderIcon />}
                    </Box>
                    <ListItemText
                        primary={category.name}
                        secondary={category.description}
                    />
                </Box>
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        aria-label="add subcategory"
                        onClick={() => onAddSub(category)}
                        size="small"
                        sx={{ mr: 1 }}
                    >
                        <AddIcon />
                    </IconButton>
                    <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => onEdit(category)}
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
            {hasChildren && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {category.children.map((child) => (
                            <CategoryItem
                                key={child.id}
                                category={child}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onAddSub={onAddSub}
                                level={level + 1}
                            />
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
};

const CategoryManagement = () => {
    const { data: categories, isLoading, error } = useGetCategoryTreeQuery();
    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [parentCategory, setParentCategory] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

    const handleOpenDialog = (category = null, parent = null) => {
        setEditingCategory(category);
        setParentCategory(parent);
        setFormData({
            name: category ? category.name : '',
            description: category ? category.description : '',
        });
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setEditingCategory(null);
        setParentCategory(null);
        setFormData({ name: '', description: '' });
    };

    const handleSubmit = async () => {
        try {
            if (editingCategory) {
                await updateCategory({
                    id: editingCategory.id,
                    ...formData,
                    parentId: parentCategory ? parentCategory.id : (editingCategory.parent ? editingCategory.parent.id : null)
                }).unwrap();
                showNotification('Category updated successfully');
            } else {
                await createCategory({
                    ...formData,
                    parentId: parentCategory ? parentCategory.id : null,
                }).unwrap();
                showNotification('Category created successfully');
            }
            handleCloseDialog();
        } catch (err) {
            showNotification('Failed to save category', 'error');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await deleteCategory(id).unwrap();
                showNotification('Category deleted successfully');
            } catch (err) {
                showNotification('Failed to delete category', 'error');
                console.error(err);
            }
        }
    };

    const showNotification = (message, severity = 'success') => {
        setNotification({ open: true, message, severity });
        setTimeout(() => setNotification({ ...notification, open: false }), 3000);
    };

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
                    onClick={() => handleOpenDialog()}
                >
                    Add Root Category
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
                        <CategoryItem
                            key={category.id}
                            category={category}
                            onEdit={(cat) => handleOpenDialog(cat, cat.parent)}
                            onDelete={handleDelete}
                            onAddSub={(parent) => handleOpenDialog(null, parent)}
                        />
                    ))}
                    {categories && categories.length === 0 && (
                        <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
                            No categories found. Create one to get started.
                        </Box>
                    )}
                </List>
            </Paper>

            <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingCategory ? 'Edit Category' : 'Add Category'}
                    {parentCategory && ` (Subcategory of ${parentCategory.name})`}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Category Name"
                        fullWidth
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" disabled={!formData.name}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CategoryManagement;
