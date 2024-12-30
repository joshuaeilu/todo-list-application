/**
 * File: ShowToDoList.js
 * Description: This contains the component that takes in the list of tasks as a prop, and showcases the list of tasks using the ToDoItem component.
 * Created On: 12/23/2024
 * Last Updated: 12/23/2024
 * 
 * Purpose:
 * - This component is responsible for showcasing the list of tasks.
 * - Furthermore, it also contains the logic to update and delete the task.
 */

import { useRef } from "react";
import ToDoItem from "./ToDoItem";
import {  VStack, Text } from "@chakra-ui/react";
export default function ShowToDoList({ todos, setToDo}) {

    // Reference to the input field for editing the task
    const editRef = useRef(null);

    // Function to delete a task from the list
    function deleteToDoItem(todo) {
        const updatedToDoList = todos.filter((todoItem) => todoItem !== todo);
        setToDo(updatedToDoList);
    }

    // Function to update a task in the list
    async function updateToDoItem(todo) {
        const updatedToDoList = todos.map((todoItem) => {
            if (todoItem.id === todo.id && editRef.current) {
                return { ...todoItem, description: editRef.current, status:todo.status };
            }
            return todoItem;
        });
        setToDo(updatedToDoList);
    }


    return (
        <VStack spacing={4} align="stretch" mt={5}>
    {todos.length > 0 ? (
        todos.map((todo) => (
            <ToDoItem
                key={todo.id}
                todoItem={todo}
                deleteToDo={() => deleteToDoItem(todo)}
                updateToDo={() => updateToDoItem(todo)}
                todoRef={editRef}
            />
        ))
    ) : (
        <Text align="center">No tasks</Text>
    )}
</VStack>
    )
}