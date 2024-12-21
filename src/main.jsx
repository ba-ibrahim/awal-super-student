import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './layouts/MainLayout';
import Profil from './pages/Profil/Profil';
import Blog from './pages/blog/Blog';
import Meeting from './pages/Meeting/Meeting';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateRoute from './PrivateRoute'; // Import the PrivateRoute component
import LoginPage from './pages/Login/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute element={<MainLayout/>} />,
    children: [
      {
        path: "profil",
        element: <PrivateRoute element={<Profil />} />
      },
      {
        path: "blog",
        element: <PrivateRoute element={<Blog />} />
      },
      {
        path: "meetings",
        element: <PrivateRoute element={<Meeting />} />
      },
      {
        path: "dashboard",
        element: <PrivateRoute element={<Dashboard />} />
      },
    ]
  },
  {
    path: "/login",
    element: <LoginPage/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
