import * as React from 'react';
import Link, { LinkProps } from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@mui/material';

export interface LinkRouterProps extends LinkProps {
    to: string;
    label: string;
}

export function LinkRouter(props: LinkRouterProps) {
    return <Link {...props} component={RouterLink as any} underline="none">
        <Button>{props.label}</Button>
    </Link>;
}
