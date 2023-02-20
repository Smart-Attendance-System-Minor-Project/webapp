import {Link} from "react-router-dom"
import './styles/Navbar.css'
export default function Navbar() {
    return <nav className="nav">
        <Link to="/" className="site-title">
          <img src = {require("./images/logo-white.png")} className = "Navbar__Logo"/>
        </Link>
        <ul>
            <CustomLink to="/analytics">Developers</CustomLink>
            <CustomLink to="/Login">Logout</CustomLink>
            
            
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