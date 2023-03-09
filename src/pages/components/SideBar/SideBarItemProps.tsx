export interface SideBarItemProps {
    label: string;
    to?: string;
    disabled?: boolean;
    handleExpandChange?: ((event: React.SyntheticEvent<Element, Event>, expanded: boolean) => void) | undefined;
}
