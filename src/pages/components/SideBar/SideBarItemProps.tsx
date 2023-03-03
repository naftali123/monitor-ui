export interface SideBarItemProps {
    label: string;
    to?: string;
    handleExpandChange?: ((event: React.SyntheticEvent<Element, Event>, expanded: boolean) => void) | undefined;
}
