import React, { useContext, useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { db } from "./../../firebase";

import { query, collection, getDocs, where } from "firebase/firestore";

import { AuthContext } from './../../userContext';
import { FullscreenWindow, Header, LinkButton } from "../Components/";

import './Layout.scss';

export const Layout = ({ children, title, backlink, ...props }) =>
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
        <div className="Layout">
            {
                isLoading ? 
                (
                    <>
                       
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
                                    <h1 className="page-title">
                                        {
                                            backlink &&
                                            <FontAwesomeIcon
                                                onClick={ () => navigate(-1) }
                                                className="go-back"
                                                icon={faChevronLeft}
                                            />
                                        }
                                        { title }
                                    </h1>
                                    { children }
                                </div>
                            </>
                        )
                        :
                        (
                            <FullscreenWindow
                                type="warning"
                                title="Achtung!"
                                message={`${ user?.email } Ist keine authorisierte E-Mail Adresse.`}
                            >
                                <LinkButton to="/">
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faChevronLeft}
                                    />
                                    Zurück
                                </LinkButton>
                            </FullscreenWindow>
                        )
                    }
                    </>
                )
            }
        </div>
    )
}
