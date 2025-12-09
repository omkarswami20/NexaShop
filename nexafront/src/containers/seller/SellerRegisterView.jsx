import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';

const SellerRegisterView = ({
    formData,
    onChange,
    onSubmit,
    isLoading,
    isSuccess,
    isError,
    error
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const footer = (
        <Link to="/seller/login" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="body2" sx={{ '&:hover': { color: 'primary.main' } }}>
                Already have an account? <span style={{ fontWeight: 500 }}>Login here</span>
            </Typography>
        </Link>
    );

    const successMessage = isSuccess 
        ? "Registration successful! Please wait for admin approval. You can try logging in once approved." 
        : null;

    return (
        <AuthLayout
            title="Seller Registration"
            subtitle="Join NexaShop and start selling today"
            error={isError ? error : null}
            successMessage={successMessage}
            isLoading={isLoading}
            submitText="Create Seller Account"
            onSubmit={onSubmit}
            footer={footer}
            maxWidth={550}
        >
            <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={onChange}
                margin="normal"
                required
                variant="outlined"
            />
            <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={onChange}
                margin="normal"
                required
                variant="outlined"
            />
            <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={onChange}
                margin="normal"
                required
                variant="outlined"
                inputProps={{ maxLength: 10 }}
            />
            <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={onChange}
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
            <TextField
                fullWidth
                label="Store Name"
                name="storeName"
                value={formData.storeName}
                onChange={onChange}
                margin="normal"
                required
                variant="outlined"
            />
        </AuthLayout>
    );
};

export default SellerRegisterView;
