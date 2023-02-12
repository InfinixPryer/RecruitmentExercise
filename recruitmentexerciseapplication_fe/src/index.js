import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/HomePage.js';
import Login from './pages/LoginPage.js';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/home/index/" />
    },
    {
        path: "/home/index/*",
        element: <Home />
    },
    {
        path: "/account/login/*",
        element: <Login />
    }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
