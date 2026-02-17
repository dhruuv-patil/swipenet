import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import JobseekerDashboard from './pages/Dashboard/Jobseeker/JobseekerDashboard';
import EmployerDashboard from  './pages/Dashboard/Employer/EmployerDashboard';
import JobseekerProfileCreation from './components/common/JsForm';
import EmployerProfileCreation from './components/common/EpForm';
import ProtectedRoute from './routes/ProtectedRoute';
import JsProfile from './pages/Profile/JsProfile';
import EpProfile from './pages/Profile/EpProfile';
import JsSwipe from './pages/SwipePage/JsSwipe';

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
  {path: "/Jobseeker/Dashboard",
    element: (
      <ProtectedRoute allowedUserType="jobseeker">
        <JobseekerDashboard />
        </ProtectedRoute>
    )},
  {path: "/Employer/Dashboard",
    element: (
      <ProtectedRoute allowedUserType="employer">
        <EmployerDashboard />
        </ProtectedRoute>
    )},
    {path: "/profile/jobseeker",
    element: (
      <ProtectedRoute allowedUserType="jobseeker">
        <JsProfile/>
        </ProtectedRoute>
    )},
    {path: "/profile/employer",
    element: (
      <ProtectedRoute allowedUserType="employer">
        <EpProfile/>
        </ProtectedRoute>
    )},
    {path: "/create-profile/jobseeker",
    element: (
      <ProtectedRoute allowedUserType="jobseeker">
        <JobseekerProfileCreation/>
        </ProtectedRoute>
    )},
    {path: "/create-profile/employer",
    element: (
      <ProtectedRoute allowedUserType="employer">
        <EmployerProfileCreation/>
        </ProtectedRoute>
    )},
    {path: "/jobseeker/SwipePage",
    element: (
      <ProtectedRoute allowedUserType="jobseeker">
        <JsSwipe/>
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
