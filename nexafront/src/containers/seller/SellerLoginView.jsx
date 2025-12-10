import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';

const SellerLoginView = ({
    email,
    password,
    onEmailChange,
    onPasswordChange,
    onSubmit,
    isLoading,
    isError,
    error
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const footer = (
        <Link to="/seller/register" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="body2" sx={{ '&:hover': { color: 'primary.main' } }}>
                Don't have an account? <span style={{ fontWeight: 500 }}>Register</span>
            </Typography>
        </Link>
    );

    return (
        <AuthLayout
            title="Seller Login"
            subtitle="Manage your store and products"
            error={isError ? error : null}
            isLoading={isLoading}
            submitText="Login to Store"
            onSubmit={onSubmit}
            footer={footer}
        >
            <TextField
                fullWidth
                label="Email or Phone Number"
                type="text"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                margin="normal"
                required
                variant="outlined"
            />
            <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                margin="normal"
                required
                variant="outlined"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </AuthLayout>
    );
};

export default SellerLoginView;
