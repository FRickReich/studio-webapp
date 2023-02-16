import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import './Table.scss'
import { Button } from "../Button/Button";

export const Table = ({ children, ...props }) =>
{
    return (
        <div className="Table">
            <div className="row heading">
                <div className="column">E-Mail</div>
                <div className="column"></div>
                <div className="column"></div>
            </div>
            <div className="row">
                <div className="column size4"><p>FRickReich</p></div>
                <div className="column">
                    <Button success>Bestätigen</Button>
                </div>
                <div className="column">
                    <Button error>
                        <FontAwesomeIcon
                            className="delete"
                            icon={faTimes}
                        />
                    </Button>
                </div>
            </div>
            <div className="row">
                <div className="column size4"><p>Celly</p></div>
                <div className="column">
                    <Button error>Deaktivieren</Button>
                </div>
                <div className="column">
                <Button error>
                    <FontAwesomeIcon
                        className="delete"
                        icon={faTimes}
                    />
                </Button>
                    
                </div>
            </div>
        </div>
    )
}
