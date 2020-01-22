import React from 'react';
import {NavLink} from 'react-router-dom';
import './Header.css'
const Header =(props) =>{
    return(<div className="Header_background">
    <ul className="nav_link">
        <NavLink className="nav_link_items" to="/contents"><li>Home</li></NavLink>
        <li onClick={props.handlepopup}>About me</li>
    </ul>
</div>);
}

export default Header;