import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import { GiHamburgerMenu } from "react-icons/gi";

// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/features/auth/AuthSlice';
import { RootState } from '@/store/store';
import { useNavigate, Link } from 'react-router-dom';
import Search from './Search';




export function SmToggle() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.auth.token);
  
    const isAuthenticated = !!token;
  
    // useEffect(() => {
    //   // console.log('Token updated or initial render:', token);
    // }, [token]); // Dependency ensures this runs whenever `token` changes
  
    const handleLogout = () => {
      dispatch(logout());
      navigate('/login'); // Redirect to login page
    };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <GiHamburgerMenu className="h-10 w-10" />
      </SheetTrigger>
      <SheetContent>
        {isAuthenticated ? (
            // Show logout button if the user is authenticated
            <div className='space-y-10 px-6 py-10'>
                <Search />
                <button
                  onClick={handleLogout}
                  className="text-[1.5rem] flex justify-center py-4 px-10 rounded-[20px] bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Logout
                </button>
            </div>
            ) : (
            // Show login and register buttons if the user is not authenticated
            <div className="py-16 mx-6">
              <Link 
                to="/"
                className="text-3xl bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                <h1 className="py-6">Home</h1>
              </Link>
              <Link
                to="/login"
                className="text-3xl py-4 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
               <h1 className="py-6">Login</h1> 
              </Link>
              <Link
                to="/register"
                className="text-3xl text-white rounded hover:bg-blue-600"
              >
                <h1 className="py-6">Register</h1>
              </Link>
            </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
