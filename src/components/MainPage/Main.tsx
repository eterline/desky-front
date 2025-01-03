import { Navigate } from "react-router-dom";
import { useAuthorized, useElementSwitch } from '../../hooks';
import { API, resolveApi } from "../../libs/apiResolve";
import { ServiceNav, ServiceView, ServiceProvider } from '../UI/Service';
import { SwitchButton } from '../UI/Functional'
import { FC } from 'react';

const Main: FC = () => {
    const isAuth = useAuthorized(resolveApi(API.check), true);
    const { status, switchStatusFunc } = useElementSwitch(false);

    if (!isAuth) {
        return (
            <Navigate to={'/welcome'} />
        );
    }

    return (
        <div className="MainPage">
            <ServiceProvider>
                <div style={{display: 'flex', width: '100%', height: '100vh'}}>
                    <ServiceNav show={status}/>
                    <ServiceView/>

                    <SwitchButton 
                        show={true} switcherFunc={switchStatusFunc} 
                        bgColor="none" showIcon={true} content="arrow-left-circle"
                    />

                </div>
            </ServiceProvider>
        </div>
    );
};

export default Main;