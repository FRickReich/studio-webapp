import React from "react";

export const SectionArea = ({ children, title, ...props }) =>
{
    return (
        <div className="Section-Area">
            {
                title && <h3 className="Section-Area-title">{ title ? title : '' }</h3>
            }
            <div className="Section-Area-content">
                { children }
            </div>
        </div>
    )
}
