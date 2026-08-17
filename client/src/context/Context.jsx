import React, { useState } from "react";

export const OnlyContext= React.createContext();
 const ContextProvider=({children})=>{
    const [accountDetails, setAccountDetails] = useState({
        username: sessionStorage.getItem('username') || '',
        name: sessionStorage.getItem('name') || '',
        id: sessionStorage.getItem("id") || ""
    })
    return <OnlyContext.Provider value={{
        accountDetails,setAccountDetails
    }} >{children}</OnlyContext.Provider>
}
export default ContextProvider