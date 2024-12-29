/**
 * File: ToDoItem.js
 * Description: This contains the component that in a  task as a prop, and showcases the task along with an update and delete button.
 * Author: Josh Eilu
 * Created On: 12/23/2024
 * Last Updated: 12/27/2024
 * 
 * Purpose:
 * - This component is responsible for showcasing a single task in the list of tasks.
 * - It takes in the task as a prop, and showcases the task along with an update and delete button.
 */

import { Button, Input, HStack, Text, Image} from "@chakra-ui/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Checkbox } from "./ui/checkbox";

const MotionHStack = motion(HStack);

export default function ToDoItem({ todoItem, deleteToDo, updateToDo, todoRef }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    function updateToDoItem() {
        updateToDo();
        setIsEditing(false);
    }

    function updateStatus() {
        todoItem.status = todoItem.status === "pending" ? "done" : "pending";
        updateToDo();
    }

    function handleDelete() {
        // Trigger fade-out animation, then delete the task
        setIsVisible(false);
        setTimeout(deleteToDo, 300); // Delay deleteToDo to allow animation to complete
    }

    if (!isEditing) {
        return (
            <MotionHStack
                data-state="open"
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                justifyContent={"space-between"}
            >
                <Checkbox
                    checked={todoItem.status === "done"}
                    onChange={updateStatus}
                >
                    <Text textDecoration={todoItem.status === "done" ? "line-through" : "none"}>{todoItem.description}</Text>
                </Checkbox>

                <HStack>
                <Image 
                    src="/edit_svg.svg" 
                    onClick={() => setIsEditing(true)} 
                    alt="Edit"
                />
                <Image 
                    src="/delete_svg.svg" 
                    onClick={handleDelete} 
                    alt="Delete"
                />
                </HStack>
            </MotionHStack>
        );
    } else {
        return (
            <HStack>
                <Input
                    defaultValue={todoItem.description}
                    onChange={(e) => (todoRef.current = e.target.value)}
                    onKeyDown={(keyDownEvent) => keyDownEvent.keyCode === 13 ? updateToDoItem() : ''}
                />
                <Button bg="#20C997"onClick={updateToDoItem}>
                    Save
                </Button>
            </HStack>
        );
    }
}
