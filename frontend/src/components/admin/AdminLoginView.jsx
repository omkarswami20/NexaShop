import React from 'react';
import { Box, TextField, Button, Typography, Paper, Alert, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

const AdminLoginView = ({
    email,
    password,
    onEmailChange,
    onPasswordChange,
    onSubmit,
    isLoading,
    isError,
    error
}) => {
    return (
        <Box sx={{ maxWidth: 450, mx: 'auto', mt: 10 }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                <Paper
                    className="glass-card"
                    sx={{
                        p: 5,
                        borderRadius: 6,
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '4px',
                            background: 'linear-gradient(90deg, #00E5FF, #00B2CC)'
                        }}
                    />

                    <Typography variant="h4" align="center" gutterBottom fontWeight="800" sx={{ mb: 1 }}>
                        Admin Portal
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
                        Secure access for administrators only
                    </Typography>

                    {isError && (
                        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                            {error?.data?.message || error?.data || 'Access Denied.'}
                        </Alert>
                    )}

                    <form onSubmit={onSubmit}>
                        <TextField
                            fullWidth
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => onEmailChange(e.target.value)}
                            margin="normal"
                            required
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => onPasswordChange(e.target.value)}
                            margin="normal"
                            required
                            variant="outlined"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            size="large"
                            sx={{ mt: 4, mb: 2, py: 1.5, fontSize: '1rem' }}
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login to Dashboard'}
                        </Button>
                    </form>
                </Paper>
            </motion.div>
        </Box>
    );
};

export default AdminLoginView;
