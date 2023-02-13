import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithGoogle, logAnalyticsEvent } from './../../../firebase';
import { useAuthState } from "react-firebase-hooks/auth";

export const Home = ({ ...props }) =>
{
    const [user, loading, error] = useAuthState(auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        
        if (user) navigate("/dashboard");
    }, [user, loading]);

    const handleClick = () =>
    {
        logAnalyticsEvent();
        signInWithGoogle();
    }

    return (
        <>
            <div>Hello World</div>
            <button className="login__btn login__google" onClick={handleClick}>
                Login
            </button>
        </>
    )
}
