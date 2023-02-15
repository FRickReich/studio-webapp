import React from "react";

import './Button.scss';

export const Button = ({
    children, 
    primary, 
    secondary,
    success,
    warning,
    error,
    onClick,
    ...props
}) =>
{
    return (
        <button 
            className={
                `LinkButton 
                ${ primary ? 'primary' : '' } 
                ${ secondary ? 'secondary' : '' }
                ${ success ? 'success' : '' }
                ${ warning ? 'warning' : '' }
                ${ error ? 'error' : '' }`
            }
            onClick={ onClick }
        >
            { children }
        </button>
    )
}
