import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { SectionCard } from "./SectionCard";

import './Section.scss';

export const Section = ({ children, title, collapsable = true, box = true, ...props }) =>
{
    const [open, setOpen] = useState(true);

    const handleToggleOpen = () =>
    {
        setOpen(!open);
    }

    return (
        <section className="Section">
            <div className="Section-wrapper">
                <div className="Section-header">    
                    <h2 className="Section-header-title">{ title }</h2>
                    {
                        collapsable &&
                        (open ?
                            (
                                <FontAwesomeIcon
                                    className="Section-header-icon"
                                    icon={faChevronUp}
                                    onClick={handleToggleOpen}
                                />
                            )
                            :
                            (
                                <FontAwesomeIcon
                                    className="Section-header-icon"
                                    icon={faChevronDown}
                                    onClick={handleToggleOpen}
                                />
                            ))
                        
                    }
                </div>
                <div
                    className={`Section-content ${open ? "content-show" : "content-hide"} ${ box === true ? 'box' : ''}`}>
                        <SectionCard>
                            { children }
                        </SectionCard>
                </div>
            </div>
        </section>
    )
}
