/**
 * File: main.js
 * Description: This contains functions for creating a new electron window, and interacting with the json file.
 * Author: Josh Eilu
 * Created On: 12/23/2024
 * Last Updated: 12/23/2024
 * 
 * Purpose:
 * - Creates a new electron window
 * - Interacts with the json file
 */


const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            sandbox: true,
        }
    })
    win.setMenuBarVisibility(false);
    win.loadURL(
       'http://localhost:3000'
    )
}

app.whenReady().then(createWindow)

// Path to JSON database file
const databasefilePath = path.join(__dirname, 'data.json');

// Get data from JSON file
function getDatabaseData(){
    return JSON.parse(fs.readFileSync(databasefilePath, 'utf8'));
}


// Send the data to the react renderer process
ipcMain.handle('read-data', async () => {
    return getDatabaseData();
});

// Add a new user to the database
ipcMain.handle('add-new-user', async (addUserEvent, newUser) => {
    const databaseData = getDatabaseData();
    const databaseWithNewUser = [...databaseData, newUser];
    fs.writeFileSync(databasefilePath, JSON.stringify(databaseWithNewUser));
});


// Save the database data to the JSON file
// Update task in the JSON file
ipcMain.handle('save-data', async (saveEvent, username, updatedToDoList) => {
    const databaseWithUpdatedTask = getDatabaseData().map(user => {
        if (user.username === username) {
            user.tasks = updatedToDoList;
        }
        return user;
    })
    fs.writeFileSync(databasefilePath, JSON.stringify(databaseWithUpdatedTask));
});