import { createContext, useContext } from "react";

export const AuthContext = createContext({
    isLoggedIn : false,
    token : null,
    userId : null,
    login : ()=>{},
    logout : ()=>{}
})