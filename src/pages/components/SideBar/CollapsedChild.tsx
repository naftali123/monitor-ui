import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { SideBarItemProps } from './SideBarItemProps';
import { NonStyledLink } from './NonStyledLink';
import { ListItemButton, ListItemText } from '@mui/material';

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    // border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));
const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props} />
))(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(0),
    // borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

function SummaryWrapper({ label }: { label: string }) {
    return <AccordionSummary aria-controls={`panel-${label}-content`} id={`panel-${label}-header`}>
        <Typography>{label}</Typography>
    </AccordionSummary>;
}

export interface CollapsedChildProps extends SideBarItemProps {
    expanded: string | boolean;
    children: React.ReactNode;
    onClick?: ((event: React.MouseEvent<Element, MouseEvent>) => void) | undefined;
}

export function isCollapsedChild(item: SideBarItemProps): item is CollapsedChildProps {
    return 'children' in item && 'expanded' in item;
}

export function CollapsedChild(props: CollapsedChildProps) {
    const { label, children, expanded, handleExpandChange, onClick, to, disabled,...rest } = props;

    return (disabled
        ? <ListItemButton disabled><ListItemText primary={label} /></ListItemButton>
        : <Accordion {...rest} expanded={expanded === label} onChange={handleExpandChange} onClick={onClick}>
            { to 
                ? <NonStyledLink to={to}><SummaryWrapper label={label} /></NonStyledLink>
                : <SummaryWrapper label={label} />
            }
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    );
}
