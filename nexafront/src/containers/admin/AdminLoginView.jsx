import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AuthLayout from '../../components/auth/AuthLayout';

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
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <AuthLayout
            title="Admin Portal"
            subtitle="Secure access for administrators only"
            error={isError ? error : null}
            isLoading={isLoading}
            submitText="Login to Dashboard"
            onSubmit={onSubmit}
            submitButtonColor="secondary"
        >
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

export default AdminLoginView;
