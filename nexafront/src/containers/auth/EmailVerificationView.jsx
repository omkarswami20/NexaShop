import React from 'react';
import { Box, Paper, Typography, CircularProgress, Alert, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Link } from 'react-router-dom';

const EmailVerificationView = ({ token, isLoading, isSuccess, verified, error }) => {
    return (
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            minHeight="100vh" 
            bgcolor="grey.100"
        >
            <Paper 
                elevation={0}
                sx={{ 
                    p: 5, 
                    maxWidth: 500, 
                    width: '100%', 
                    textAlign: 'center',
                    border: '1px solid',
                    borderColor: 'divider'
                }}
            >
                {!token ? (
                    <Alert severity="error">Invalid verification link.</Alert>
                ) : isLoading ? (
                    <Box>
                        <CircularProgress sx={{ mb: 2 }} />
                        <Typography>Verifying your email...</Typography>
                    </Box>
                ) : isSuccess || verified ? (
                    <Box>
                        <CheckCircleIcon color="success" sx={{ fontSize: 64, mb: 2 }} />
                        <Typography variant="h5" gutterBottom fontWeight="600">
                            Email Verified!
                        </Typography>
                        <Typography color="text.secondary" paragraph>
                            Your email has been successfully verified. 
                            Your account is now pending Admin Approval. 
                            You will receive an email once your account is approved.
                        </Typography>
                        <Button 
                            component={Link} 
                            to="/seller/login" 
                            variant="contained" 
                            sx={{ mt: 2 }}
                        >
                            Go to Login
                        </Button>
                    </Box>
                ) : (
                    <Box>
                        <ErrorIcon color="error" sx={{ fontSize: 64, mb: 2 }} />
                        <Typography variant="h5" gutterBottom fontWeight="600">
                            Verification Failed
                        </Typography>
                        <Typography color="text.secondary" paragraph>
                            {error?.data?.message || 'We could not verify your email. The link may be invalid or expired.'}
                        </Typography>
                        <Button 
                            component={Link} 
                            to="/seller/login" 
                            variant="outlined" 
                            sx={{ mt: 2 }}
                        >
                            Back to Login
                        </Button>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default EmailVerificationView;
