import React from "react";

import './Form.scss';

export const FormField = ({ children, value, label, ...props }) =>
{
    return (
        <div
            className="FormField"
        >
            <input required value={value}/>
            <label htmlFor="">{ label }</label>
        </div>
    )
}
