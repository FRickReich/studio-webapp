import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faChevronLeft, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import './FullscreenWindow.scss';
import { LinkButton } from "../Button/LinkButton";

export const FullscreenWindow = ({ 
    children, 
    title = "Default", 
    message = "Lorem und so weiter...",
    type,
    ...props
}) =>
{
    return (
        <div className="FullscreenWindow">
            <div className="box">
                <div className="content">
                    <div className="meta">
                        <FontAwesomeIcon
                            className={`icon ${
                                type === 'warning'
                                ? 'warning' : type === 'error' ? 'error' : ''}`}
                            icon={
                                type === "warning" ? faCircleExclamation : type === "error" && faTimesCircle
                            }
                        />
                        <div className="info">
                            <div className="title">
                                { title }
                            </div>
                            <div className="message">
                                { message }
                            </div>
                        </div>
                    </div>
                    <div className="interaction">
                        { children }
                    </div>
                </div>
            </div>
        </div>
    )
}
