import React from "react";
import { Link } from "react-router-dom";

export const Home = ({ children, ...props }) =>
{
    return (
        <>
            <h1>Hello World!</h1>
            <hr />
            <Link to="/dashboard/login">Dashboard</Link>
        </>
    )
}
