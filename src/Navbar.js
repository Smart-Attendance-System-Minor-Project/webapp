import { useEffect,useState } from "react";
import {Link} from "react-router-dom"
import './styles/Navbar.css'
export default function Navbar() {

    const [user,setUsername] = useState('');
    const logoutHandler =()=>{
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        window.location.assign('/login');
    }

    useEffect(()=>{

        setUsername(localStorage.getItem('username'));
    },[user])
    return <nav className="nav">
        <Link to="/" className="site-title">
          <img src = {require("./images/logo_white.png")} className = "Navbar__Logo"/>
        </Link>
        <ul>
            
            <li style={{color:'#29b0db'}}>{user}</li>
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