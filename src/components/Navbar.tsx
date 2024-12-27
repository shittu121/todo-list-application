import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/features/auth/AuthSlice';
import { RootState } from '@/store/store';
import { useNavigate, Link } from 'react-router-dom';
import Search from './Search';
import { SmToggle } from './SmToggle';
import { ModeToggle } from './mode-toggle';
import { useTheme } from "@/components/ui/theme-provider"


const Navbar = () => {

    const { theme } = useTheme()

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.auth.token);
  
    const isAuthenticated = !!token;
  
    const handleLogout = () => {
      dispatch(logout());
      navigate('/login'); // Redirect to login page
    };
  
    return (
      <div className="flex items-center w-full justify-between px-6 lg:px-10 py-6 border-b border-gray-300">

        {/* Small Toggle */}
        <div className="lg:hidden md:hidden">
          <SmToggle />
        </div>

        <div className="flex items-center">
         <img 
            src={theme === "dark" ? "/todologo-white.png" : "/todologo.png"} 
            alt="logo" className='w-24 h-24 dark:text-white' 
         />
         <h1 className='text-muted-foreground text-3xl'>
            TaskMaster
         </h1>
        </div>

        <div className={`${isAuthenticated ? '' : 'lg:hidden md:hidden'} `}>
          <ModeToggle />
        </div>
      
        <div className="">
          {isAuthenticated ? (
            // Show logout button if the user is authenticated
            <div className='flex items-center gap-28'>
            <Link 
                to="/"
                className="text-3xl  py-2 px-4 rounded"
                >
                <h1>Home</h1>
            </Link>
            <div className="sm-hidden">
            <Search />
            </div>
            <button
              onClick={handleLogout}
              className="text-[1.5rem] sm-hidden flex justify-center py-4 px-10 rounded-[20px] bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
            </div>
          ) : (
            // Show login and register buttons if the user is not authenticated
          <>
             
            <Link
            to="/register"
            className="text-3xl py-2 px-4 rounded lg:hidden md:hidden"
          >
            Register
          </Link>

            <div className="flex justify-center gap-36 sm-hidden">
              <Link 
                to="/"
                className="text-3xl py-2 px-4 rounded"
                >
                <h1>Home</h1>
              </Link>
              <Link
                to="/login"
                className="text-3xl py-2 px-4 rounded"
              >
               <h1>Login</h1> 
              </Link>
              <Link
                to="/register"
                className="text-3xl py-2 px-4 rounded sm-show"
              >
                Register
              </Link>
              <ModeToggle />
            </div>
          </>
          )}
        </div>
      </div>
    );
};

export default Navbar
