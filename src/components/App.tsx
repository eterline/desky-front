import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Main from './MainPage/Main';
import Welcome from './WelcomePage/Welcome';
import { ToastContainer } from 'react-toastify';

import { Pictures } from '../assets';

import './App.css';

export const App = () => {

    const bgPicture = Pictures["login-bg"]

    console.log(bgPicture)

    const backgroundStyle = {
        height: '100vh',
        backgroundImage: `url(${bgPicture})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      };

    return (
    <div style={backgroundStyle}>
        <BrowserRouter>
            <Routes>
                <Route path='' element={ <Main/> }/>
                <Route path='welcome' element={ <Welcome/> }/>
            </Routes>
            <ToastContainer/>
        </BrowserRouter>
    </div>
    );
};