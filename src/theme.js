import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "#004B8D",
            light: "#336fa3",
            dark: "#003462"
        },
        secondary: {
            main: "#ffd141",
            light: "#ffda67",
            dark: "#b2922d"
        },
        navbg: {
            main: "#004B8D",
            light: "#e8eaf6",
            dark: "#003462"
        },
    },
    typography: {
        fontFamily: 'Libre Franklin, Roboto, Arial, sans-serif',
        h1: {
            fontWeight: 'bold',
        },
        body1: {
            fontSize: '1rem',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    transition: 'all 0.1s ease',
                    '&:hover': {
                        textDecoration: 'underline',
                        overflow: 'hidden',
                    },
                },
            },
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
            xxl: 2560,
        },
    },
});

export default theme;