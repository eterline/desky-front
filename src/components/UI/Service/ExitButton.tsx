import './ExitButton.css';
import loginService from '../../../lib/loginService';
import { FC } from 'react';

const ExitButton: FC = () => {

    const logginer = new loginService("/login", true)

    const logoutHandle = () => {
        logginer.logOut()
    }

    return (
        <div className='ExitButton' onClick={logoutHandle}>
            Log Out
        </div>
    );
};

export default ExitButton;