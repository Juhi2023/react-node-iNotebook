import React, { useState } from 'react'
import AlertContext from './AlertContext';


function AlertState(props) {
    const [alertState, setAlertState]= useState({show: false, msg:'', type:''});
    
    const showAlertState=(message, type)=>{
        setAlertState({show: true, msg:message, type:type});
        setTimeout(()=>{
            setAlertState({show: false, msg:'', type:''});
        }, 2000)
    }

  return (
    <AlertContext.Provider value={{alertState, showAlertState}}>
        {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState;
