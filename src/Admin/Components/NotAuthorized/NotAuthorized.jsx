import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import "./NotAuthorized.scss";
import { AuthContext } from './../../../userContext';
import { Link } from "react-router-dom";

export const NotAuthorized = ({ ...props }) =>
{
    const { user } = useContext(AuthContext);

    return (
        <div className="NotAuthorized">
            <div className="messageBox">
                <div className="content">
                    <div className="meta">
                        <FontAwesomeIcon
                            className="icon"
                            icon={faTriangleExclamation}
                        />
                        <div className="info">
                            <div className="email">
                                { user?.email }
                            </div>
                            <div className="message">
                                Ist keine authorisierte E-Mail Adresse.
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <Link to="/">
                            <FontAwesomeIcon
                                className="icon"
                                icon={faChevronLeft}
                        />
                            Zurück
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}