import React, { useEffect, useState } from "react";

export const SectionCard = ({ children, ...props }) =>
{
    return (
        <div className="Section-Card">
            <div className="Section-Card-inner">
                { children }
            </div>
        </div>
    )
}
