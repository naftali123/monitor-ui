import * as React from 'react';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { SideBarItemProps } from './SideBarItemProps';

export interface DefaultSidBarItemProps extends SideBarItemProps {
    children?: React.ReactNode;
}

export function DefaultSidBarItem(props: DefaultSidBarItemProps) {
    const { label, children } = props;
    return <ListItem disablePadding>  
            { children
                ? children
                :  <ListItemButton><ListItemText primary={label} /></ListItemButton>
            }
            </ListItem>
}
