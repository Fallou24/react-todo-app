import React from 'react';

const Alert = ({alert}) => {
    let timer = null
    clearInterval(timer)
    return (
        <div className={alert.type==="danger"? "alert danger" :alert.type==="succes" ? "alert succes" : "alert" }> 
            {alert.msg}
        </div>
    );
};

export default Alert;