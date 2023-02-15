import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { auth, signInWithGoogle, logAnalyticsEvent } from './../../firebase';
import { FullscreenWindow } from "../Components";
import { LinkButton } from "../Components/Button/LinkButton";
import { Button } from "../Components/Button/Button";

export const Login = ({ ...props }) =>
{
    const [user, loading, error] = useAuthState(auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        
        if (user) navigate("/dashboard/");
    }, [user, loading]);

    const handleClick = () =>
    {
        logAnalyticsEvent();
        signInWithGoogle();
    }

    return (
        <>
            <FullscreenWindow 
                title="Login" 
                message="Bitte logge dich ein, um das Dashboard zu betreten"
                type="warning"
            >
                <LinkButton to="/">
                    <FontAwesomeIcon
                            className="icon"
                            icon={faChevronLeft}
                    />
                    Zurück
                </LinkButton>
                <Button
                    secondary
                    onClick={handleClick}
                >
                    Login
                </Button>
            </FullscreenWindow>
        </>
    )
}
