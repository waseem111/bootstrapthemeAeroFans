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


// import React, { useEffect, useState } from 'react';

// const Message = ({ variant, children }) => {
//   const [alert, setAlert] = useState(true);
      
//   useEffect(() => {
//     setTimeout(() => {
//       setAlert(false);
//     }, 3000);
//   }, []);     
    
//   return (
//     {alert && <div className={`alert alert-${variant}`}>{children}</div>}
//   )
// }