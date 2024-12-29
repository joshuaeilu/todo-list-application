import AddToDo from "./components/AddToDo";
import ShowToDoList from "./components/ShowToDoList";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
function App() {
  
  const navigate = useNavigate();


  // State to store the user's to-dos
  const [userToDos, setUserToDos] = useState([]);

  // Get user data from database
  const userData = useLocation().state;


  useEffect(() => {
    setUserToDos(userData.tasks); 
  }, [userData.tasks]);
  // Save and signout the user
  function saveAndSignOut() {
    window.electronAPI.saveData(userData.username, userToDos);
    navigate('/'); 
  }


  return (
    <div className="home-container">
      <div>
      <AddToDo todos={userToDos} setToDo={setUserToDos} username={userData.username} />
      <ShowToDoList todos={userToDos} setToDo={setUserToDos}/>
      </div>
      <div className="sign-out-button">
      <Button bg="#4CAF50" onClick={saveAndSignOut}>Save Changes and SignOut</Button>
      </div>
    </div>
  );
}

export default App;
