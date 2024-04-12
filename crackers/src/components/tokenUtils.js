// tokenUtils.js
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
export const useTokenExpiration = () => {
    const navigate=useNavigate()
  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('token');
      const expiration = localStorage.getItem('expiration');

      if (token && expiration) {
        const expiryDate = new Date(expiration);
        if (expiryDate < new Date()) {
          // Token has expired
          // Perform any action you want, such as displaying a message or redirecting to the login page
          window.alert('session expired!!')
        //   navigate('/login');
        }
      }
    };

    // Call the function immediately
    checkTokenExpiration();

    // Check token expiration periodically, e.g., every minute (adjust as needed)
    const interval = setInterval(checkTokenExpiration, 2000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);
};
