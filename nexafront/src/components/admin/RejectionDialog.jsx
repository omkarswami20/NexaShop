import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    TextField,
    Button,
} from '@mui/material';

const RejectionDialog = ({
    open,
    onClose,
    onConfirm,
    reason,
    onReasonChange,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    border: '1px solid',
                    borderColor: 'divider',
                }
            }}
        >
            <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider', pb: 2 }}>
                Reject Seller Application
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Please provide a reason for rejection. This will be emailed to the seller.
                </Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Rejection Reason"
                    fullWidth
                    multiline
                    rows={3}
                    value={reason}
                    onChange={(e) => onReasonChange(e.target.value)}
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
                <Button onClick={onClose} color="inherit">Cancel</Button>
                <Button onClick={onConfirm} color="error" variant="contained">
                    Confirm Rejection
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RejectionDialog;
