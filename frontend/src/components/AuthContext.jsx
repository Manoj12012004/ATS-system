import { useEffect } from 'react';
import { useState,createContext,useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth,setAuth]=useState(()=>{
        const storedAuth = localStorage.getItem('auth');
        return storedAuth ? JSON.parse(storedAuth) : {
            isAuthenticated: false,
            user: null,
            token: null
        };
    });

    const login=(user,token)=>{
        const authData = {
            isAuthenticated: true,
            user,
            token
        };
        localStorage.setItem('auth',JSON.stringify(authData))
        setAuth(authData);
    };

    const logout=()=>{
        localStorage.removeItem('auth');
        setAuth({
            isAuthenticated: false,
            user: null,
            token: null
        });
        window.location.href = '/login'; // Redirect to login page
    };

    return(
        <AuthContext.Provider value={{...auth,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);