import React, { useContext, useState, useEffect } from 'react';
import {auth} from "../../firebase"

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [newAccount, setNewAccount] = useState(false);

    function signup(email, password){
        setNewAccount(true);
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function accountComplete (){
        setNewAccount(false);
    }

    const login = (email, password) =>{
        return auth.signInWithEmailAndPassword(email,password)
    }

    const logout = () =>{
        return auth.signOut();
    }

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false);
        })
        return unsubscribe
    },[])

    const value = {
        currentUser,
        newAccount,
        accountComplete,
        login,
        logout,
        signup
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}