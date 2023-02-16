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
    fluid,
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
                ${ error ? 'error' : '' }
                ${ fluid ? 'fluid' : '' }`
            }
            onClick={ onClick }
        >
            { children }
        </button>
    )
}
