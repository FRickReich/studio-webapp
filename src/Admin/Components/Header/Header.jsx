import React, { useState } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { logout } from "./../../../firebase";

import './Header.scss';

export const Header = ({ children, ...props }) =>
{
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () =>
    {
        setIsOpen(!isOpen);
    }

    return (
        <div className="Header">
            <div className="bar">
            <Link to="/dashboard/" className="brand">Dashboard</Link>
                <div className="toggle" onClick={ handleOpen }>
                    <FontAwesomeIcon
                        className="icon"
                        icon={faBars}
                    />
                </div>
            </div>
            <div className={`menu ${ isOpen ? 'open' : 'closed'}`}>
                <nav className={`items ${ isOpen ? 'open' : 'closed' }`}>
                    <NavLink to="/dashboard/" className="link">Home</NavLink>
                    <NavLink to="/dashboard/users" className="link">Users</NavLink>
                    <NavLink to="/dashboard/blog" className="link">Blog</NavLink>
                    <NavLink to="/dashboard/pages" className="link">Pages</NavLink>
                    <NavLink to="/dashboard/gallery" className="link">Gallery</NavLink>
                </nav>
                <nav className={`items ${ isOpen ? 'open' : 'closed' }`}>
                    <div className="link" onClick={logout}>
                        <span className="logout-text">Logout</span>
                        <FontAwesomeIcon
                            className="logout-icon"
                            icon={faArrowRightFromBracket}
                        />
                    </div>
                </nav>
            </div>
            
        </div>
    )
}