/**
 * File: preload.js
 * Description: This contains the preload script that exposes the electronAPI to the react components.
 * Author: Josh Eilu
 * Created On: 12/23/2024
 * Last Updated: 12/23/2024
 * 
 * Purpose:
 * - This enables the react web components to interact with the main process (internal system/database) of the electron application.
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    readData: () => ipcRenderer.invoke('read-data'),
    saveData: (username, updatedToDoList) => ipcRenderer.invoke('save-data', username, updatedToDoList),
    addNewUser: (newUser) => ipcRenderer.invoke('add-new-user', newUser)
});