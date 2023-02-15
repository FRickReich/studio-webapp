import React, { useContext, useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faHouse, faUsers, faBookOpen, faDisplay, faPortrait } from '@fortawesome/free-solid-svg-icons'
import { db, logout } from "./../../firebase";

import { query, collection, getDocs, where } from "firebase/firestore";

import { AuthContext } from './../../userContext';
import { Header, NotAuthorized } from "../Components/";

import './Layout.scss';

export const Layout = ({ children, ...props }) =>
{
    const [isAdmin, setIsAdmin ] = useState(false);
    const [isLoading, setIsLoading ] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const fetchRole = async () =>
    {
        try
        {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            
            setIsAdmin(data.isAdmin);
            setIsLoading(false);
        }
        catch (err)
        {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    useEffect(() =>
    {
        if (!user) return navigate("/");
        fetchRole();
    }, [user]);

    return (
        <>
            {
                isLoading ? 
                (
                    <>
                        <p>LOADING...</p>
                    </>
                )
                :
                (
                    <>
                    {
                        isAdmin
                        ?
                        (
                            <>
                                <Header />
                                <div className="content">
                                    { children }
                                </div>
                            </>
                        )
                        :
                        (
                            <NotAuthorized />
                        )
                    }
                    </>
                )
            }
        </>
    )
}

// <h1>Logged in as</h1>
// <div>{user?.displayName}</div>
// <div>{user?.email}</div>

{/* <NavLink to="/dashboard/">
   <FontAwesomeIcon
       icon={faHouse}
   />
</NavLink>

<NavLink to="/dashboard/users">
   <FontAwesomeIcon
       icon={faUsers}
   />
</NavLink>

<NavLink to="/dashboard/blog">
   <FontAwesomeIcon
       icon={faBookOpen}
   />
</NavLink>

<NavLink to="/dashboard/pages">
   <FontAwesomeIcon
       icon={faDisplay}
   />
</NavLink>

<NavLink to="/dashboard/artists">
   <FontAwesomeIcon
       icon={faPortrait}
   />
</NavLink>

<button className="dashboard__btn" onClick={logout}>
   <FontAwesomeIcon
       icon={faArrowRightFromBracket}
   />
</button> */}

// <ul>
//     <li><NavLink to="/dashboard/">Home</NavLink></li>
//     <li><NavLink to="/dashboard/users">Users</NavLink></li>
//     <li><NavLink to="/dashboard/blog">Blog</NavLink></li>
//     <li><NavLink to="/dashboard/">Pages</NavLink></li>
//     <li><NavLink to="/dashboard/">Gallery</NavLink></li>
//     <li>
//         <button className="dashboard__btn" onClick={logout}>
//             <FontAwesomeIcon
//                 icon={faArrowRightFromBracket}
//             />
//         </button>
//     </li>
// </ul>

// <hr />