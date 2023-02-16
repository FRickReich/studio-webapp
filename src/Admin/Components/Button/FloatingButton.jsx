import React from "react";
import { Link } from "react-router-dom";

import './Button.scss';

export const FloatingButton = ({ 
    children, 
    path, 
    primary, 
    secondary,
    transparent,
    success,
    warning,
    error, 
    ...props
}) =>
{
    return (
        <Link 
            to={ path } 
            className={
                `FloatingButton 
                ${ primary ? 'primary' : '' } 
                ${ secondary ? 'secondary' : '' }
                ${ transparent ? 'transparent' : '' }
                ${ success ? 'success' : '' }
                ${ warning ? 'warning' : '' }
                ${ error ? 'error' : '' }`
            }
        >
            { children }
        </Link>
    )
}
