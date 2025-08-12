import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import JobseekerDashboard from './pages/Dashboard/Jobseeker/JobseekerDashboard';
import EmployerDashboard from  './pages/Dashboard/Employer/EmployerDashboard';

import ProtectedRoute from './routes/ProtectedRoute';
const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>
  },{
    path:'/Login',
    element:<Login/>
  },{
    path:'/Signup',
    element:<Signup/>
  },
  {
    path: "/Jobseeker/Dashboard",
    element: (
      <ProtectedRoute allowedType="jobseeker">
        <JobseekerDashboard />
        </ProtectedRoute>
    )},
  {path: "/Employer/Dashboard",
    element: (
      <ProtectedRoute allowedType="employer">
        <EmployerDashboard />
        </ProtectedRoute>
    )}
])


const App = () => {
  return (
    <>
    <div className="foreground" >
      <RouterProvider router={appRouter}/>
    
    </div>
    </>
  );
};

export default App;
