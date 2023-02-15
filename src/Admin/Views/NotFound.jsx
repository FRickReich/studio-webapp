import React from "react";

import { Link , useNavigate} from "react-router-dom";

export const NotFound = ({ children, ...props }) =>
{
    const navigate = useNavigate();

    return (
        <>
            Dashboard - NotFound (404)       
            <br />
            <br />
            <div className="backlink" onClick={ () => navigate(-1)}>Zurück</div>
            <br />
        </>
    )
}
