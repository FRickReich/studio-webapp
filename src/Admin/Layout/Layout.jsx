import React, { useContext, useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { auth, db, logout } from "./../../firebase";

import { query, collection, getDocs, where } from "firebase/firestore";


import { AuthContext } from './../../userContext'

export const Layout = ({ children, ...props }) =>
{
    const [isAdmin, setIsAdmin ] = useState(false);
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
                isAdmin
                ?
                (
                    <>
                        <h1>Logged in as</h1>
                        <div>{user?.displayName}</div>
                        <div>{user?.email}</div>

                        <ul>
                            <li><NavLink to="/dashboard/">Home</NavLink></li>
                            <li><NavLink to="/dashboard/users">Users</NavLink></li>
                            <li>
                                <button className="dashboard__btn" onClick={logout}>
                                    <FontAwesomeIcon
                                        icon={faArrowRightFromBracket}
                                    />
                                </button>
                            </li>
                        </ul>

                        <hr />
                        { children }
                    </>
                )
                :
                (
                    <>
                        <div>Account not validated by Admin</div>
                    </>
                )
            }
        </>
    )
}
