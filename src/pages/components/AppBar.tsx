import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { PropsWithChildren } from 'react';
import { InputBaseProps } from '@mui/material/InputBase/InputBase';

type SearchAppBarProps = {
  title?: string,
  searchInput?: boolean,
  searchProps: InputBaseProps
}

export default function CustomAppBar({ title, children }: PropsWithChildren<SearchAppBarProps>) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          {title!= null && <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {title}
          </Typography>}
          {children}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
