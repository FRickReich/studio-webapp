import React, { useEffect, useState } from "react";

import './Form.scss';

export const FormField = ({ children, value, label, type, state, resize, name, ...props }) =>
{
    const [ val, setVal ] = useState("");

    useEffect(() => 
    {
        if(value !== "")
        {
            setVal(value);
        }
    }, [value])

    const handleChange = (e) =>
    {
        setVal(e.target.value);
    }

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
                        onChange={handleChange}
                        defaultValue={val}
                    >
                    </textarea>
                )
                :
                (
                    <input defaultValue={val} name={name} onChange={handleChange}/>
                )
            }
        </div>
    )
}
