import React from "react";
import { Button } from "../Button/Button";

import './Form.scss';

export const Form = ({ children, ...props }) =>
{
    const handleClick = (e) =>
    {
        e.preventDefault();
        
        children.forEach((child, i) => {
            console.log(child.props.name + " => " + child.props.value)
        })
    }

    return (
        <form
            className="Form"
        >
            { children }

            <Button success onClick={handleClick}>Speichern</Button>
        </form>
    )
}
