import React from 'react';
import { Box, Paper, Typography, Alert, Button, CircularProgress } from '@mui/material';

const AuthLayout = ({
    title,
    subtitle,
    error,
    successMessage,
    isLoading,
    submitText,
    onSubmit,
    children,
    footer,
    maxWidth = 450,
    submitButtonColor = 'primary'
}) => {
    return (
        <Box sx={{ maxWidth, mx: 'auto', mt: 8 }}>
            <Paper
                elevation={0}
                sx={{
                    p: 5,
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Typography variant="h4" align="center" gutterBottom fontWeight="600" sx={{ mb: 1 }}>
                    {title}
                </Typography>
                {subtitle && (
                    <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
                        {subtitle}
                    </Typography>
                )}

                {successMessage && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                        {successMessage}
                    </Alert>
                )}

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error?.data?.message || error?.data || 'An error occurred.'}
                    </Alert>
                )}

                <form onSubmit={onSubmit}>
                    {children}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color={submitButtonColor}
                        size="large"
                        sx={{ mt: 4, mb: 3, py: 1.5 }}
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : submitText}
                    </Button>

                    {footer && (
                        <Box textAlign="center">
                            {footer}
                        </Box>
                    )}
                </form>
            </Paper>
        </Box>
    );
};

export default AuthLayout;
