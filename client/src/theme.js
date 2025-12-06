import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
            dark: '#1565c0',
            light: '#42a5f5',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#424242',
            dark: '#212121',
            light: '#616161',
            contrastText: '#ffffff',
        },
        background: {
            default: '#fafafa',
            paper: '#ffffff',
        },
        text: {
            primary: '#212121',
            secondary: '#757575',
        },
        success: {
            main: '#2e7d32',
        },
        error: {
            main: '#d32f2f',
        },
        warning: {
            main: '#ed6c02',
        },
        divider: '#e0e0e0',
    },
    typography: {
        fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        h1: {
            fontWeight: 600,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontWeight: 600,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontWeight: 600,
        },
        h4: {
            fontWeight: 600,
        },
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
            letterSpacing: '0.01em',
        },
    },
    shape: {
        borderRadius: 0,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: 'none',
                    padding: '10px 24px',
                    fontWeight: 500,
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
                contained: {
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
                outlined: {
                    borderWidth: '1.5px',
                    '&:hover': {
                        borderWidth: '1.5px',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
                },
                elevation1: {
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
                },
                elevation2: {
                    boxShadow: '0 2px 4px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 0,
                        '& fieldset': {
                            borderWidth: '1.5px',
                        },
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    fontWeight: 500,
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 0,
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                    minHeight: 48,
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                },
            },
        },
    },
});

export default theme;
