import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#558b2f'
        },
        secondary: {
            main: '#9e9e9e'
        }
    },
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    textTransform: 'capitalize'
                }
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    border: '3px rgba(255, 255, 255, 0.12) solid',
                    marginBottom: 1,
                    '&.Mui-selected': {
                        background: 'rgba(85, 139, 47, 0.24)',
                        border: '3px #558b2f solid'
                    }
                }
            }
        }
    }
});

export default theme;
