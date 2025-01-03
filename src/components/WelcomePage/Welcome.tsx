import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import loginService from '../../libs/loginService';
import useAuthorized from '../../hooks/useAuthorized';

import "./Welcome.css";
import showToast from "../../libs/showToats";

const Welcome = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const logginer = new loginService("/login", true)

    const postLogin = async () => {
        logginer.postLogin({
            username: username,
            password: password
        });
    }

    const isAuth = useAuthorized(false)
    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <div className="WelcomePage">
            <h1>Desky Panel</h1>

                <div className="WelcomePage-form">
                    <h2>Welcome!</h2>

                    <input
                        type="text" value={username}
                        onChange={ e => setUsername(e.target.value) }
                        placeholder="username">
                    </input>

                    <input 
                        type="password" value={password}
                        onChange={ e => setPassword(e.target.value) }
                        placeholder="password">
                    </input>

                    <div className="WelcomePage-button" onClick={postLogin}>Log In</div>

                </div>
        </div>
    );
};

export default Welcome;

