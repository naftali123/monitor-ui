import * as React from 'react';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { SideBarItemProps } from './SideBarItemProps';
import { NonStyledLink } from './NonStyledLink';

export interface DefaultSidBarItemProps extends SideBarItemProps {
    children?: React.ReactNode;
}

export function DefaultSidBarItem(props: DefaultSidBarItemProps) {
    return props.to
        ? <NonStyledLink to={props.to} children={<SideBarItemWrapper {...props}/>}/>
        : <SideBarItemWrapper {...props}/>;
}

function SideBarItemWrapper(props: DefaultSidBarItemProps) {
    const { children, label, handleExpandChange, ...rest } = props;
    return <ListItem {...rest} disablePadding onClick={(e)=>handleExpandChange ? handleExpandChange(e, false) : null}>
        {children
            ? children
            : <ListItemButton><ListItemText primary={label} /></ListItemButton>}
    </ListItem>;
}

