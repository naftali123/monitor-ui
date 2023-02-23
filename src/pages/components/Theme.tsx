import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InputBaseProps } from '@mui/material/InputBase/InputBase';
import Footer from './Footer';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const drawerWidth = 240;

interface Props {
    window?: () => Window;
    title?: string,
    children: React.ReactNode,
    sideBar?: React.ReactNode,
    searchProps?: InputBaseProps,
    displayAppBar?: boolean,
}

export default function CustomTheme({ 
    window, 
    title,
    children,
    sideBar,
    searchProps,
    displayAppBar = true,

}: Props) {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            { sideBar }
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                { displayAppBar ? (
                <AppBar
                    position="fixed"
                    sx={ !sideBar ? {} : {
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar> 
                ) : (<></>) }
                { sideBar ? (
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                ) : (<></>) }
                <Box
                    component="main"
                    sx={{ minHeight: '100vh', flexDirection: 'column', display: 'flex', flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                  <Box sx={{ p: 3 }}>
                    <Toolbar />
                        {children}
                  </Box>
                  <Footer />
                </Box>
            </Box>
        </ThemeProvider>
    );
}
// import CssBaseline from '@mui/material/CssBaseline';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Box from '@mui/material/Box/Box';
// import Footer from './Footer';
// import CustomAppBar from './AppBar';
// import { InputBaseProps } from '@mui/material/InputBase/InputBase';

// const theme = createTheme({
//     palette: {
//       mode: 'dark',
//     },
//   });

// type CustomThemeProps = {
//     children: React.ReactNode
//     searchProps?: InputBaseProps,
//     displayAppBar?: boolean
// }

// export default function CustomTheme({ children, searchProps, displayAppBar = true }: CustomThemeProps){
//   return (
//   <ThemeProvider theme={theme}>
//     { displayAppBar && <CustomAppBar searchProps={searchProps ?? {}} searchInput/> }
//     <Container component="main" maxWidth="xl">
//         <Box
//         margin={0}
//             sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 minHeight: '100vh',
//             }}
//         >
//             <CssBaseline />
//             <Container component="main" sx={{ mt: 0, mb: 2 }} maxWidth="lg">
//                 { children }
//             </Container>
//             <Footer />
//         </Box>
//     </Container>
//   </ThemeProvider>
//   );
// }