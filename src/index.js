import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from './components/ui/provider';
import { BrowserRouter, Routes, Route } from 'react-router';
import UserLogin from './UserLogin';
import UserSignUp from './UserSignUp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<UserLogin />} ></Route>
        <Route path="/userSignUp" element={<UserSignUp />} ></Route>

        <Route path="/home" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

