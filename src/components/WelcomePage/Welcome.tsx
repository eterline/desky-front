import { useState } from "react";
import { Navigate } from "react-router-dom";
import loginService from '../../libs/loginService';
import useAuthorized from '../../hooks/useAuthorized';
import { API, resolveApi } from "../../libs/apiResolve";

import "./Welcome.css";

const Welcome = () => {

    const [formSended, setFormSended] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    console.log(resolveApi(API.check))

    const isAuth = useAuthorized(resolveApi(API.check), false);

    if (isAuth || formSended) {
        return (
            <Navigate to={'/'} />
        );
    }

    const logginer = new loginService("/login", true)

    const postLogin = () => {
        logginer.postLogin({
            username: username,
            password: password
        })
        .then( () => {setFormSended(true)})
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

                    <button className="WelcomePage-button" onClick={postLogin}>Log In</button>

                </div>
        </div>
    );
};

export default Welcome;

