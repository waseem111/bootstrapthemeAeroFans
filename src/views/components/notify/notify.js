import React, { useEffect, useState } from "react";
const Notify = (props) => {
   
    const { type, message, duration = 3000 } = props?.options;

    return (
        <>
        <div className={`alert alert-${type}`} role="alert">
                {message}
            </div>
        </>
    )
}

export default Notify

