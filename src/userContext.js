import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";

import { auth, db, logout } from "./firebase";

import { useNavigate, NavLink } from "react-router-dom";

import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserContextProvider = ({ children }) =>
{
    const [user, loading, error] = useAuthState(auth);
    const [ userData, setUserData ] = useState({});

    const navigate = useNavigate();
        
    const fetchUserName = async () =>
    {
        try
        {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            
            setUserData(data);
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
        if (!userData) return navigate("/");
        fetchUserName();
    }, [userData, loading]);


    return(
        // <UserContext.Provider value={ userData }>
            { children }
        // </UserContext.Provider>
    );
}

export { UserContext, UserContextProvider };
