import { Link, LinkProps } from "react-router-dom";

export function NonStyledLink(props: LinkProps) {
    return <Link {...props} style={{ textDecoration: "none", color: 'inherit' }}/>
}