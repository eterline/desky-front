import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from "react";
import './App.css';
import './AppPhone.css';
import Modal from 'react-modal';
import useTheme from '../hooks/useTheme';
import { LoadingContainer } from './UI/Functional';

const MainPage = lazy(() => import('./MainPage/Main'));
const WelcomePage = lazy(() => import('./WelcomePage/Welcome'));

export const App = () => {
    Modal.setAppElement("#app-root");
    useTheme("white");
    return (
    <>
        <BrowserRouter>
            <Suspense fallback={<LoadingContainer/>}>
                <Routes>
                    <Route path='' element={ <MainPage/> }/>
                    <Route path='welcome' element={ <WelcomePage/> }/>
                </Routes>
            </Suspense>
        </BrowserRouter>
    </>
    );
};