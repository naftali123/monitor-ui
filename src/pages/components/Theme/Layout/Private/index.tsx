import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { ThemeProvider } from '@mui/material/styles';
import { InputBaseProps } from '@mui/material/InputBase/InputBase';
import Footer from '../../Footer';
import { Avatar, Chip, Grid, Paper } from '@mui/material';
import CollapsedBreadcrumbs, { BreadcrumbsItem } from '../../CollapsedBreadcrumbs';
import { routesList } from '../../../../../routes';
import { NavBarLinks } from '../../NavBarLinks';
import theme from '../../ThemeConfig';

const drawerWidth = 240;

interface CustomThemeProps {
    window?: () => Window;
    title?: string,
    children: React.ReactNode,
    sideBar?: React.ReactNode,
    searchProps?: InputBaseProps,
    displayAppBar?: boolean,
    breadcrumbsItems?: BreadcrumbsItem[],
}

export default function PrivateLayoutTheme({ 
    window, 
    title,
    children,
    sideBar,
    searchProps,
    displayAppBar = true,
    breadcrumbsItems = []
}: CustomThemeProps) {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    React.useEffect(() => {
        if(title) document.title = title;
    }, [title]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar/>
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
                        width: { sm: '100%' },//`calc(100% - ${drawerWidth}px)` },
                        // ml: { sm: `${drawerWidth}px` },
                        zIndex: 9999,
                    }}
                >
                    <Toolbar sx={{ marginLeft: '15%', marginRight: '15%' }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ display: 'flex' }}>
                            <Grid container spacing={2} justifyContent="space-around">
                                <Grid item>
                                    <Chip
                                        icon={<Avatar sx={{ width: 24, height: 24 }}>
                                            <MonitorHeartIcon sx={{ width: 44, height: 44 }}/>
                                        </Avatar>}
                                        label="Urls monitor"
                                    />
                                    
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { md: 'flex' }, maxWidth: "70%", marginLeft: '15%', marginRight: '15%' }}>
                            <NavBarLinks pages={
                                routesList.filter((r)=>r.to !== '/').map((route) => ({
                                    to: route.to,
                                    label: route.name
                                }))
                            }/>
                        </Box>
                    </Toolbar>
                </AppBar> 
                ) : (<></>) }
                { sideBar ? (
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
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
                    <Paper elevation={3} sx={{ p: 0, mt: 1 }}>
                        <CollapsedBreadcrumbs items={[
                            ...[
                                {
                                    label: 'Urls monitor',
                                    to: '/',
                                }
                            ],
                            ...breadcrumbsItems
                        ]}/>
                    </Paper>
                    
                    { children && React.Children.count(children) > 0 && (
                        <Paper 
                            variant="outlined"
                            sx={{ 
                                p: 2, 
                                mt: 1, 
                                minHeight: '65vh' 
                            }}
                        >
                            { children }
                        </Paper>
                    )}
                  </Box>
                  <Footer />
                </Box>
            </Box>
        </ThemeProvider>
    );
}