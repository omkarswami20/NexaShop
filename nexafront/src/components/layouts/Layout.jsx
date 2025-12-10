import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Menu, MenuItem } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentToken, selectCurrentRole, logout } from '../../store/slices/auth.slice';

const Layout = () => {
    const token = useSelector(selectCurrentToken);
    const role = useSelector(selectCurrentRole);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        handleClose();
        navigate('/');
    };

    return (
        <Box sx={{ flexGrow: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
            <ToastContainer position="top-right" autoClose={3000} />
            <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ py: 1 }}>
                        <ShoppingBagIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1.5, color: 'primary.main' }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 600,
                                letterSpacing: '0.02em',
                                color: 'text.primary',
                                textDecoration: 'none',
                                flexGrow: 1,
                            }}
                        >
                            NEXASHOP
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                            <Button
                                component={Link}
                                to="/seller/register"
                                sx={{ color: 'text.primary', display: { xs: 'none', md: 'block' } }}
                            >
                                Sell on NexaShop
                            </Button>

                            {!token ? (
                                <>
                                    <Button
                                        color="inherit"
                                        component={Link}
                                        to="/login"
                                        sx={{
                                            color: 'text.primary',
                                        }}
                                    >
                                        Log In
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component={Link}
                                        to="/register"
                                    >
                                        Sign Up
                                    </Button>
                                </>
                            ) : (
                                <div>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                        color="inherit"
                                        sx={{ color: 'text.primary' }}
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                        PaperProps={{
                                            sx: {
                                                mt: 1.5,
                                                minWidth: 160,
                                                border: '1px solid',
                                                borderColor: 'divider',
                                            }
                                        }}
                                    >
                                        {role === 'ROLE_SELLER' && (
                                            <MenuItem onClick={() => { handleClose(); navigate('/seller/dashboard'); }}>Dashboard</MenuItem>
                                        )}
                                        {role === 'ROLE_ADMIN' && (
                                            <MenuItem onClick={() => { handleClose(); navigate('/admin/dashboard'); }}>Dashboard</MenuItem>
                                        )}
                                        {(role === 'ROLE_CUSTOMER' || role === 'CUSTOMER') && (
                                            <MenuItem onClick={() => { handleClose(); navigate('/customer/profile'); }}>My Profile</MenuItem>
                                        )}
                                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    </Menu>
                                </div>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
                <Container maxWidth="lg">
                    <Outlet />
                </Container>
            </Box>

            <Box
                component="footer"
                sx={{
                    py: 3,
                    mt: 'auto',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper'
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant="body2" color="text.secondary" align="center">
                        {'Copyright © '}
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}>
                            NexaShop
                        </Link>{' '}
                        {new Date().getFullYear()}
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default Layout;
