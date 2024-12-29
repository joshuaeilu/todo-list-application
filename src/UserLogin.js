/**
 * File: UserLogin.js
 * Description: This contains the UserLogin component that is responsible for logging in the user.
 * Author: Josh Eilu
 * Created On: 12/23/2024
 * Last Updated: 12/23/2024
 * 
 * Purpose:
 * - This component checks if the user is a new user or an existing user. 
 * - It also checks if the user has entered the correct username and password.
 */
import { NavLink } from "react-router";
import React, { useEffect, useRef, useState } from 'react';
import { Button } from './components/ui/button';
import { Text, Input } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "./components/ui/password-input"



export default function UserLogin() {
    const navigate = useNavigate();
    // State to store the database
    const [database, setDatabase] = useState([]);

    // Reference to the input field for the username and password
    const usernameRef = useRef();
    const passwordRef = useRef();

    // State to store the error message
    const [errorMessage, setErrorMessage] = useState('');

      // Fetch the data from the database through electronAPI and store it in the database state
      useEffect(() => {
        const fetchData = async () => {
            const response = await window.electronAPI.readData();
            setDatabase(response);
        }
        fetchData();
    }
        , []);


        // filter the database to find the user data
        function searchForUserData(){
            const userData = database.filter(user => user.username === usernameRef.current.value && user.password === passwordRef.current.value);
            if(userData.length === 0){
                return false;
            }else{
                return userData[0];
            }
        }

        // login the user if user data is found, else show an error message
        function loginOrShowError(){
            const userData = searchForUserData();
            if(userData){
                console.log('User data found:', userData);
                navigate('/home', {state: userData});
            }else{
                setErrorMessage('Invalid username or password');
            }

        }

        return (
            <div className="page-container">
            <Text className="page-header">To-Do List Application</Text>
            <div className="main-content">
                <Text fontSize="2xl" className="form-header">User Identification</Text>
                <div className="form-group">
                    <label>Username</label>
                    <Input type="text" ref={usernameRef} placeholder="Enter your username" className="form-input" onKeyDown={(keyDownEvent) => keyDownEvent.keyCode === 13 ? passwordRef.current.focus() : ''} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <PasswordInput type="password" ref={passwordRef} placeholder="Enter your password" className="form-input" onKeyDown={(keyDownEvent) => keyDownEvent.keyCode === 13 ? loginOrShowError() : ''} />
                    
                </div>
                {errorMessage && <Text className="error-message" color="red">{errorMessage}</Text>}
                <Button onClick={loginOrShowError} className="page-button">Submit</Button>
                <NavLink className="new-user-link" to="/userSignUp">
                    <Button className="page-button">New User?</Button>
                </NavLink>
            </div>
        </div>
        )

}

