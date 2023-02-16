import React from "react";
import { Link , useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import { LinkButton } from "../Components/Button/LinkButton";
import { Button } from "../Components/Button/Button";
import { FullscreenWindow } from "../Components";

export const NotFound = ({ children, ...props }) =>
{
    const navigate = useNavigate();

    return (
        <>
        <FullscreenWindow 
                title="404" 
                message="Seite nicht gefunden!"
                type="error"
            >
                <Button
                    onClick={ () => navigate(-1)}
                >
                    <FontAwesomeIcon
                            className="icon"
                            icon={faChevronLeft}
                    />
                    Zurück
                </Button>
            </FullscreenWindow>
        </>
    )
}
