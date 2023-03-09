import * as React from 'react';
import List from '@mui/material/List/List';
import { InternalLink, InternalLinkProps, isInternalLink } from './InternalLink';
import { ExternalLink, ExternalLinkProps, isExternalLink } from './ExternalLink';
import { SideBarItemProps } from './SideBarItemProps';
import { useCallback } from 'react';
import { DefaultSidBarItem, DefaultSidBarItemProps } from './DefaultSidBarItem';
import { CollapsedChildProps, isCollapsedChild, CollapsedChild } from './CollapsedChild';

interface SideBarProps {
    items: (DefaultSidBarItemProps | SideBarItemProps | CollapsedChildProps | ExternalLinkProps | InternalLinkProps)[];
}

export default function SideBar(props: SideBarProps) {
    const { items } = props;
    const [expanded, setExpanded] = React.useState<string | false>(items[0].label);
    
    const handleExpandChange = useCallback(
        (panel: string) => 
            (event: React.SyntheticEvent, newExpanded: boolean) => {
                setExpanded(newExpanded ? panel : false)
            },
        [setExpanded]
    );

    return (
        <div>
            <List style={{ paddingTop: 0, paddingBottom: 0 }}>
                {items.map((item: SideBarItemProps) => {
                    if (isCollapsedChild(item)) {
                        return <CollapsedChild 
                            {...{
                                ...item, 
                                ...{
                                    expanded, 
                                    handleExpandChange: handleExpandChange(item.label)
                                }
                            }} 
                            key={item.label}
                            />
                    } 
                    else if (isInternalLink(item)) {
                        return <InternalLink {...item} key={item.label} handleExpandChange={handleExpandChange(item.label)}/>
                    } else if (isExternalLink(item)) {
                        return <ExternalLink {...item} key={item.label} handleExpandChange={handleExpandChange(item.label)}/>
                    } 
                    return <DefaultSidBarItem {...item} key={item.label} handleExpandChange={handleExpandChange(item.label)}/>
            })}
            </List>
        </div>
    );
}
