import React from "react";

import './Button.scss';

export const Button = ({
    children, 
    primary, 
    secondary,
    transparent,
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
                ${ transparent ? 'transparent' : '' }
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
