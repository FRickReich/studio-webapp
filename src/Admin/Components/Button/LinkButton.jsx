import React from "react";
import { Link } from "react-router-dom";

import './Button.scss';

export const LinkButton = ({ 
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
        <Link 
            to={ path } 
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
        </Link>
    )
}
