import * as React from 'react';
import { Button } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { LinkRouter } from './LinkRouter';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export interface BreadcrumbsItem {
    label: string;
    to: string;
}

export interface CollapsedBreadcrumbsProps {
    items: BreadcrumbsItem[];
    maxItems?: number;
}

export default function CollapsedBreadcrumbs(props: CollapsedBreadcrumbsProps) {
    const { maxItems, items } = props;
    return (
        <div role="presentation" onClick={handleClick}>
            <Breadcrumbs separator="|" maxItems={maxItems ?? 2} aria-label="breadcrumb">
                {
                    items.map((item, index) => {
                        const { to, label } = item;
                        if (index === items.length - 1) {
                            return <Button key={to} disabled >
                                {label}
                            </Button>
                        }
                        return <LinkRouter underline="hover" color="inherit" to={to} key={to} label={label}/>
                    })
                }
            </Breadcrumbs>
        </div>
    );
}