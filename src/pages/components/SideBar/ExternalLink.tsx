import { ListItem, ListItemText, Grid, ListItemButton } from '@mui/material';
import { SideBarItemProps } from './SideBarItemProps';

export interface ExternalLinkProps extends SideBarItemProps {
    link: string;
}

export function isExternalLink(item: SideBarItemProps): item is ExternalLinkProps {
    return 'link' in item;
}

export function ExternalLink(props: ExternalLinkProps): JSX.Element {
    const { label, link, ...rest } = props;
    return <ListItem key={label} disablePadding>
        <ListItemText {...rest} primary={<Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
        >
            <Grid item xs>
                <ListItemButton
                    component="a"
                    href={link}
                    target="_blank"
                >
                    {label}
                </ListItemButton>
            </Grid>
        </Grid>} />
    </ListItem>;
}
