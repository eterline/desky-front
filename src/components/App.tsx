import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Main from './MainPage/Main';
import Welcome from './WelcomePage/Welcome';

import './App.css';
import './AppPhone.css';
import Modal from 'react-modal';
import useTheme from '../hooks/useTheme';

export const App = () => {
    Modal.setAppElement("#app-root");
    useTheme("black");
    return (
    <>
        <BrowserRouter>
        {/* <ToastContainer /> */}
            <Routes>
                <Route path='' element={ <Main/> }/>
                <Route path='welcome' element={ <Welcome/> }/>
            </Routes>
        {/* <ToastContainer/> */}
        </BrowserRouter>
    </>
    );
};