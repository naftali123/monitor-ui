import * as React from 'react';
import { ListItem, ListItemText, Grid, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { SideBarItemProps } from './SideBarItemProps';

export interface InternalLinkProps extends SideBarItemProps {
    id: string;
    secondaryAction: JSX.Element;
}

export function isInternalLink(item: SideBarItemProps): item is InternalLinkProps {
    return 'secondaryAction' in item && 'id' in item;
}

const onPress = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const target = window.document.getElementById(
        e.currentTarget.href.split("#")[1]
    );
    if (target) {
        var headerOffset = 80;
        var elementPosition = target.getBoundingClientRect().top;
        var offsetPosition = elementPosition - headerOffset;

        window.scrollBy({
            top: offsetPosition,
            behavior: "smooth",
        });
    }
};

export function InternalLink(props: InternalLinkProps) {
    const { secondaryAction, id, label } = props;
    return (
        <ListItem disablePadding secondaryAction={secondaryAction}>
            <ListItemText primary={<Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item xs>
                    <ListItemButton
                        onClick={(e) => onPress(e)}
                        component={Link}
                        to={`#${id}`}
                    >
                        <div data-to-scrollspy-id={id}>
                            {label}
                        </div>
                    </ListItemButton>
                </Grid>
            </Grid>} />
        </ListItem>
    );
}
