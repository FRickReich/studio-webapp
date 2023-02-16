import React from "react";

import './Button.scss';

export const LinkExternalButton = ({ 
    children, 
    path, 
    primary, 
    secondary,
    transparent,
    success,
    warning,
    fluid,
    error, 
    ...props
}) =>
{
    return (
        <a 
            href={`${ path }`}
            target="_blank"
            rel="noreferrer"
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
        >
            { children }
        </a>
    )
}
