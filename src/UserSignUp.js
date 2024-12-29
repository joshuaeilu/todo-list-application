/**
 * File: UserSignup.js
 * Description: This contains the form to sign up a new user. 
 * Author: Josh Eilu
 * Created On: 12/23/2024
 * Last Updated: 12/23/2024
 * 
 * Purpose:
 * - This component takes in the username and password of the user and adds the user to the database.
 * - 
 */

import { NavLink } from "react-router";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "./components/ui/password-input"
import { Text, Button, Input } from '@chakra-ui/react';
export default function UserSignUp() {

    const navigate = useNavigate();

    // Reference to the input field for the username and password
    const usernameRef = useRef();
    const passwordRef = useRef();


    // Function to add the new user to the database and navigate to the home page
    function addUserAndNavigateHome(){
        const newUser = { username: usernameRef.current.value, password: passwordRef.current.value, tasks: [] };
        window.electronAPI.addNewUser(newUser);
        navigate('/home', {state: newUser});
    }
    return (
        <div className="page-container">
            <Text className="page-header">To-Do List Application</Text>
            <div className="main-content">
                <Text fontSize="2xl" className="form-header">User SignUp</Text>
                <div className="form-group">
                    <label>Username</label>
                    <Input
                        ref={usernameRef}
                        type="text"
                        placeholder="Enter your username"
                        className="form-input"
                        onKeyDown={(keyDownEvent) => keyDownEvent.keyCode === 13 ? passwordRef.current.focus() : ''}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <PasswordInput
                        ref={passwordRef}
                        type="password"
                        placeholder="Enter your password"
                        className="form-input"
                        onKeyDown={(keyDownEvent) => keyDownEvent.keyCode === 13 ? addUserAndNavigateHome() : ''}
                    />
                </div>
                <Button onClick={addUserAndNavigateHome} className="page-button">Submit</Button>
                <NavLink className="new-user-link" to="/">
                    <Button className="page-button">Already a user?</Button>
                </NavLink>
            </div>
        </div>
    );
}