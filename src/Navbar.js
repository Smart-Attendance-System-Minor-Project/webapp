import {Link} from "react-router-dom"
import './styles/Navbar.css'
export default function Navbar() {

    const logoutHandler =()=>{
        localStorage.removeItem('username');
        window.location.assign('/login');
    }
    return <nav className="nav">
        <Link to="/" className="site-title">
          <img src = {require("./images/logo-white.png")} className = "Navbar__Logo"/>
        </Link>
        <ul>
            <CustomLink to="/developers">Developers</CustomLink>
            <button onClick={logoutHandler} className = "Navbar__Logout">Logout</button>
            
        
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