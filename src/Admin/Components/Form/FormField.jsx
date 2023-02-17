import React, { useEffect, useState } from "react";

import './Form.scss';

export const FormField = ({ children, label, type, state, resize, name, ...props }) =>
{
    return (
        <div
            className="FormField"
        >
            <label>{ label }</label>
            {
                type === "textarea" ?
                (
                    <textarea
                        name={name}
                        className={`${ 
                            resize === "both" ? 'resize-both' : 
                            resize === "vertical" ? 'resize-vertical' : 
                            resize === "horizontal" && 'resize-horizontal'
                        }`}
                        defaultValue={props.value}
                        onChange={props.onChange}
                    >
                    </textarea>
                )
                :
                (
                    <input
                        name={name}
                        defaultValue={props.value}
                        onChange={props.onChange}
                    />
                )
            }
        </div>
    )
}
