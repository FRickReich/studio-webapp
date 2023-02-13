import React from 'react';
import { Link } from "react-router-dom";

export const Home = ({ ...props }) => {

    return (
        <>
            <div>Hello World</div>
            <div>
                Link to <Link to="/dashboard">Dashboard</Link>.
            </div>
        </>
    )
}
