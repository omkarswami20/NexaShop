import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Menu, MenuItem } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentToken, selectCurrentRole, logout } from '../features/authSlice';

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
        <Box sx={{ flexGrow: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div className="mesh-gradient-bg" />
            <AppBar position="sticky">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <ShoppingBagIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'primary.main' }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: '"Outfit", sans-serif',
                                fontWeight: 800,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                flexGrow: 1,
                                background: 'linear-gradient(90deg, #fff, #94A3B8)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            NEXASHOP
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {!token ? (
                                <>
                                    <Button color="inherit" component={Link} to="/seller/login">
                                        Seller Login
                                    </Button>
                                    <Button variant="contained" color="primary" component={Link} to="/admin/login">
                                        Admin Portal
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
                                                bgcolor: 'background.paper',
                                                backgroundImage: 'none',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                            }
                                        }}
                                    >
                                        {role === 'seller' && (
                                            <MenuItem onClick={() => { handleClose(); navigate('/seller/dashboard'); }}>Dashboard</MenuItem>
                                        )}
                                        {role === 'admin' && (
                                            <MenuItem onClick={() => { handleClose(); navigate('/admin/dashboard'); }}>Dashboard</MenuItem>
                                        )}
                                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    </Menu>
                                </div>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box component="main" sx={{ flexGrow: 1, py: 6 }}>
                <Container maxWidth="lg">
                    <Outlet />
                </Container>
            </Box>

            <Box component="footer" sx={{ py: 4, mt: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', bgcolor: 'rgba(15, 23, 42, 0.5)' }}>
                <Container maxWidth="sm">
                    <Typography variant="body2" color="text.secondary" align="center">
                        {'Copyright © '}
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 600 }}>
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
