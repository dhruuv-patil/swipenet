import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';

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
  }
])


const App = () => {
  return (
    <>
    <div className="foreground">
      <RouterProvider router={appRouter}/>
    
    </div>
    </>
  );
};

export default App;
