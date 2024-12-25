import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { ToastContainer } from 'react-toastify';
import './index.css';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <Provider store={store}>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;