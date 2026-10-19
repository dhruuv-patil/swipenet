import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import Dashboard from './pages/Dashboard';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/Login",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/Signup",
    element: <Navigate to="/signup" replace />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/Dashboard",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

const App = () => {
  return (
    <div className="foreground">
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
