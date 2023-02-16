import React from "react";

import './Form.scss';

export const Form = ({ children, ...props }) =>
{
    return (
        <form
            className="Form"
        >
            { children }
        </form>
    )
}
