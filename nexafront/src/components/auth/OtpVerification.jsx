import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress
} from '@mui/material';
import { useVerifyOtpMutation } from '../../store/api/api.slice';

const OtpVerification = ({ open, onClose, identifier, onSuccess }) => {
    const [otp, setOtp] = useState('');
    const [verifyOtp, { isLoading, error }] = useVerifyOtpMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await verifyOtp({ identifier, otp }).unwrap();
            onSuccess();
        } catch (err) {
            console.error('OTP Verification failed:', err);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Verify Phone Number</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Please enter the OTP sent to {identifier}
                    </Typography>
                    
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error?.data?.message || 'Verification failed'}
                        </Alert>
                    )}

                    <TextField
                        autoFocus
                        margin="dense"
                        label="OTP"
                        fullWidth
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        inputProps={{ maxLength: 6 }}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={onClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        disabled={isLoading || otp.length !== 6}
                    >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Verify'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default OtpVerification;
