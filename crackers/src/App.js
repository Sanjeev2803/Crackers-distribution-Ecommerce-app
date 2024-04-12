// ... Other imports
import { Navigate, RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import './App.css'
import LandingPage, { ProductCard } from './components/LandingPage';
import MainNav from './components/MainNav';
import RootLayout from './components/RootLayout';
import Register from './components/Register';
import Login from './components/Login';
import About from './components/About';
import UserProfile from './components/UserProfile';
import AdminDashboard from './components/AdminDashboard';
import Test from './components/Test';
import Addproducts from './components/addProducts';
import ViewProducts from './components/ViewProducts';
import Editproducts from './components/Editproducts';
import ProductDescription from './components/ProductDescription';
import CartTable from './components/ProductCart';
import { useSelector } from 'react-redux';
import Settings from './components/Settings';
import BannerModal from './components/Modal';
import Wishlist from './components/Wishlist';
import OrderHistory from './components/OrderHistory';
import AdminMontor from './components/AdminMonitor';
import Contact from './components/Contact';
import SessionExpiry from './components/SessionExpiry';
 // Adjust the path based on your project structure
import { useEffect } from 'react';

import { useTokenExpiration} from './components/tokenUtils'
  
function App() {
  
  
  const isAuthenticated=useSelector((state)=>state.login.loginStatus)
  
  const protectedRoutes = [
    {
      path: 'userProfile',
      element: isAuthenticated ? <UserProfile /> : <Login/>
    },
    {
      path: 'sellerDashboard',
      element: isAuthenticated ? <AdminDashboard /> : <Navigate to='/Login'/>
    },
    {
      path: 'addProduct',
      element: isAuthenticated ? <Addproducts /> : <Navigate to='/Login'/>
    },
    {
      path:'viewProduct',
      element: isAuthenticated ? <ViewProducts/> : <Navigate to='/Login'/>
    },
    {
      path: 'editProduct',
      element: isAuthenticated ? <Editproducts /> : <Navigate to='/Login'/>
    },
    {
      path:'productDescription',
      element: isAuthenticated ?<ProductDescription/> : <Navigate to='/Login'/>
    },
      {
        path:'cart',
        element: isAuthenticated ?<CartTable/> : <Navigate to='/Login'/>
      }
    ,{
      path: 'expired',
      element: isAuthenticated ? <SessionExpiry /> : <Navigate to='/Login'/>
    }
    // Add more protected routes here as needed
  ];
  let browserRouter=createBrowserRouter([{
path:'',
element:<RootLayout />,
children:[
  {
    path:'',
    element:<LandingPage/>
  },{
    path:'Home',
    element:<LandingPage/>
  },
  {
    path:'Register',
    element:<Register/>
  },{
    path:'login',
    element:<Login/>
  },{
    path:'About',
    element:<About/>
  },{path:'Wishlist',
element:<Wishlist/>},{
    path:'test',
    element:<Test/>
  },...protectedRoutes,
  {
    path:'settings',
    element:<Settings/>
  },{
    path:'orderHistory',
    element:<OrderHistory/>
  },{
    path:'contact',
    element:<Contact/>
  }  
    ]
  },
  {
    path:'banner',
    element:<BannerModal/>
  },


]

 )
  return <RouterProvider router={browserRouter}/>;
}
 


export default App;
