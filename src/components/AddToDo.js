/**
 * File: AddToDo.js
 * Description: This contains the component that is responsible for adding a new task to the list of tasks.
 * Author: Josh Eilu
 * Created On: 12/23/2024
 * Last Updated: 12/23/2024
 * 
 * Purpose:
 * - This component takes in the list of tasks as a prop, and updates the list when a new task is added.
 */

import { Button, Input, HStack } from "@chakra-ui/react";
import { useEffect } from "react";


import { useRef } from "react"

export default function AddToDo({ todos, setToDo, username }) {
    const inputRef = useRef(null);

    // Function to add a new task to the list of tasks
    function addToDo() {
        if (inputRef.current) {
            const newTask = { id: todos.length + 1, description: inputRef.current, status: "pending", date: new Date().toDateString(), time: new Date().toLocaleTimeString() };
            document.querySelector("input").value = "";
            setToDo([...todos, newTask]);

        } else {
            alert("Please enter a task");
        }
    }
    return (
        <HStack justify="center" mt={5}>
            <Input
                placeholder="Add a new task"
                onChange={inputEvent => (inputRef.current = inputEvent.target.value)}
                onKeyDown={(keyDownEvent) => keyDownEvent.keyCode === 13 ? addToDo() : ''}
                width="300px"
            />
            <Button onClick={addToDo}>Add</Button>
        </HStack>
    )
}
