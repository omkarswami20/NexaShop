import React, { useState } from 'react';
import {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} from '../../store/api/api.slice';
import CategoryManagementView from './CategoryManagementView';

const CategoryManagementContainer = () => {
    const { data: categories, isLoading, error } = useGetCategoriesQuery();
    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

    const handleOpenDialog = (category = null) => {
        setEditingCategory(category);
        setFormData({
            name: category ? category.name : '',
            description: category ? category.description : '',
        });
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setEditingCategory(null);
        setFormData({ name: '', description: '' });
    };

    const handleSubmit = async () => {
        try {
            if (editingCategory) {
                await updateCategory({
                    id: editingCategory.id,
                    ...formData,
                }).unwrap();
                showNotification('Category updated successfully');
            } else {
                await createCategory({
                    ...formData,
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

    return (
        <CategoryManagementView
            categories={categories}
            isLoading={isLoading}
            error={error}
            dialogOpen={dialogOpen}
            editingCategory={editingCategory}
            formData={formData}
            notification={notification}
            onOpenDialog={handleOpenDialog}
            onCloseDialog={handleCloseDialog}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            onFormDataChange={setFormData}
        />
    );
};

export default CategoryManagementContainer;
