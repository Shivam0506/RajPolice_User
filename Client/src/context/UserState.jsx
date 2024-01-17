import React, { useState } from "react";
import UserContext from './UserContext'

export const UserState = (props) => {

    const [User, setUser] = useState({});

    // Get User Info from anywhere
    const getUserInfo = async () => {
        // API call
        const response = await fetch('https://rajpoliceuserapi.onrender.com/api/auth/getuser', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        
        setUser(json)
    }


    return (
        <UserContext.Provider value={{User, setUser, getUserInfo}}>
            {props.children}
        </UserContext.Provider>
    )
}