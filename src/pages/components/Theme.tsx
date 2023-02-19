import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box/Box';
import Footer from './Footer';
import CustomAppBar from './AppBar';
import { InputBaseProps } from '@mui/material/InputBase/InputBase';

const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

type CustomThemeProps = {
    children: React.ReactNode
    searchProps?: InputBaseProps,
    displayAppBar?: boolean
}

export default function CustomTheme({ children, searchProps, displayAppBar = true }: CustomThemeProps){
  return (
  <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
        { displayAppBar && <CustomAppBar searchProps={searchProps ?? {}} searchInput/> }
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <CssBaseline />
            <Container component="main" sx={{ mt: 0, mb: 2 }} maxWidth="sm">
                { children }
            </Container>
            <Footer />
        </Box>
    </Container>
    </ThemeProvider>
  );
}