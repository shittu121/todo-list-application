import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/features/auth/AuthSlice';
import { RootState } from '@/store/store';
import { useNavigate, Link } from 'react-router-dom';
import { Search } from './Search';
import { SmToggle } from './SmToggle';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.auth.token);
  
    const isAuthenticated = !!token;
  
    useEffect(() => {
      console.log('Token updated or initial render:', token);
    }, [token]); // Dependency ensures this runs whenever `token` changes
  
    const handleLogout = () => {
      dispatch(logout());
      navigate('/login'); // Redirect to login page
    };
  
    return (
      <div className="flex items-center w-full justify-between px-6 lg:px-10 py-6 border-b border-grey-300">
        <div className="flex items-center">
         <img src="/todologo.png" alt="logo" className='w-24 h-24' />
         <h1 className='text-muted-foreground text-3xl'>
            TaskMaster
         </h1>
        </div>

        {/* Small Toggle */}
        <div className="lg:hidden md:hidden flex justify-end w-full">
          <SmToggle />
        </div>

        <div className="sm-hidden">
          {isAuthenticated ? (
            // Show logout button if the user is authenticated
            <div className='flex items-center gap-28'>
            <Link 
                to="/"
                className="text-3xl py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                <h1>Home</h1>
            </Link>
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
            <div className="flex justify-center gap-36">
              <Link 
                to="/"
                className="text-3xl py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                <h1>Home</h1>
              </Link>
              <Link
                to="/login"
                className="text-3xl py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
               <h1>Login</h1> 
              </Link>
              <Link
                to="/register"
                className="text-3xl py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    );
};

export default Navbar
