import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box/Box';
import { InputBaseProps } from '@mui/material/InputBase/InputBase';
import Footer from '../../Footer';
import theme from '../../ThemeConfig';

type PublicLayoutThemeProps = {
    children: React.ReactNode
    searchProps?: InputBaseProps,
    displayAppBar?: boolean
}

export default function PublicLayoutTheme({ children, searchProps, displayAppBar = true }: PublicLayoutThemeProps){
  return (
  <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
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