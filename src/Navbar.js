import {Link} from "react-router-dom"

export default function Navbar() {
    return <nav className="nav">
        <Link to="/" className="site-title">
            WellAttend
        </Link>
        <ul>
            <CustomLink to="/analytics">Analytics</CustomLink>
            <CustomLink to="/downloads">Downloads</CustomLink>
            <CustomLink to="/login">Login</CustomLink>
        </ul>
    </nav>
}

function CustomLink ({to, children, ...props}) {
    return (
        <li>
        <Link to={to} {...props}>{children}</Link>
        </li>
    )
}