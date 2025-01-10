import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Main from './MainPage/Main';
import Welcome from './WelcomePage/Welcome';
import { ToastContainer } from 'react-toastify';

import { Pictures } from '../assets';

import './App.css';
import './AppPhone.css';

export const App = () => {

    const backgroundStyle = {
        height: '100vh',
        backgroundImage: `url(${Pictures["login-bg"]})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      };

    return (
    <div style={backgroundStyle}>
        <BrowserRouter>
        <ToastContainer />
            <Routes>
                <Route path='' element={ <Main/> }/>
                <Route path='welcome' element={ <Welcome/> }/>
            </Routes>
            <ToastContainer/>
        </BrowserRouter>
    </div>
    );
};