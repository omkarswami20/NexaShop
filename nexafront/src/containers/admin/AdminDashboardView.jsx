import React from 'react';
import {
    Box, Typography, Button, CircularProgress, Tabs, Tab
} from '@mui/material';
import LogoutContainer from '../../containers/common/LogoutContainer';
import LogoutIcon from '@mui/icons-material/Logout';
import CategoryManagementContainer from './CategoryManagementContainer';
import SellerTable from '../../components/admin/SellerTable';
import RejectionDialog from '../../components/admin/RejectionDialog';

const AdminDashboardView = ({
    isLoading,
    sellers,
    tabValue,
    onTabChange,
    onApprove,
    onRejectClick,
    openRejectDialog,
    onCloseRejectDialog,
    rejectionReason,
    onRejectionReasonChange,
    onRejectConfirm
}) => {
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h4" fontWeight="600">
                    Admin Dashboard
                </Typography>
                <LogoutContainer>
                    <Button 
                        variant="outlined" 
                        color="error" 
                        startIcon={<LogoutIcon />}
                    >
                        Logout
                    </Button>
                </LogoutContainer>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 5 }}>
                Manage sellers, categories, and oversee platform activity
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
                <Tabs
                    value={tabValue}
                    onChange={onTabChange}
                    aria-label="admin dashboard tabs"
                    sx={{
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 500,
                            fontSize: '0.95rem',
                            minHeight: 48,
                            mr: 3,
                        },
                    }}
                >
                    <Tab label="All Sellers" />
                    <Tab label="Pending" />
                    <Tab label="Approved" />
                    <Tab label="Denied" />
                    <Tab label="Categories" />
                </Tabs>
            </Box>

            {tabValue === 4 ? (
                <CategoryManagementContainer />
            ) : (
                isLoading ? (
                    <Box display="flex" justifyContent="center" p={8}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <SellerTable 
                        sellers={sellers}
                        onApprove={onApprove}
                        onRejectClick={onRejectClick}
                    />
                )
            )}

            <RejectionDialog 
                open={openRejectDialog}
                onClose={onCloseRejectDialog}
                onConfirm={onRejectConfirm}
                reason={rejectionReason}
                onReasonChange={onRejectionReasonChange}
            />
        </Box>
    );
};

export default AdminDashboardView;
