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