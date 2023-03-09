import { Grid } from '@mui/material';
import { LinkRouter, LinkRouterProps } from './LinkRouter';

export interface NavBarLinksProps {
  pages: LinkRouterProps[];
}

export function NavBarLinks(props: NavBarLinksProps) {
  const { pages } = props;
  return (
    <Grid container spacing={4} justifyContent="start">
      {pages.map((page: LinkRouterProps) => (
        <Grid item key={page.label}><LinkRouter {...page} /></Grid>
      ))}
    </Grid>
  );
}
