import React, { useEffect, useState } from "react";
const Notify = (props) => {

    const { type, message } = props?.options;

    return (
        <>
            <div className={`alert alert-${type}`} role="alert">
                {message}
            </div>
        </>
    )
}

export default Notify

