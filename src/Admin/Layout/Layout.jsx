import React, { useEffect, useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, NavLink } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import { auth, db, logout } from "./../../firebase";

import { UserContext } from "../../userContext";

import './Layout.scss';
import { UserContextProvider } from "../../userContext";

export const Layout = ({ children, ...props }) =>
{
    const userData = useContext(UserContext);

    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [isAdmin, setIsAdmin ] = useState(false);

    const navigate = useNavigate();
        
    const fetchUserName = async () =>
    {
        try
        {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            
            setName(data.name);
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
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
    }, [user, loading]);


    return (
        <>
            {
                isAdmin ?
                (
                    <>
                        <h1>Logged in as</h1>
                        <div>{name}</div>
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
                (<div>Account not validated by Admin</div>)
            }
        </>
    )
}
