import { Navigate } from "react-router-dom";
import { useAuthorized, useElementSwitch } from '../../hooks';
import { ServiceNav, ServiceView, ServiceProvider } from '../UI/Service';
import { SwitchButton } from '../UI/Functional'
import { FC, useEffect } from 'react';
import showToast from '../../libs/showToats';

const Main: FC = () => {

    useEffect(()=>{ showToast("welcome") }, [])

    const authState = useAuthorized(true)
    if (!authState) { return (<Navigate to={'/welcome'} />) }

    const { status, switchStatusFunc } = useElementSwitch(false);
    const btnSize = status ? '4rem' : '2rem' ;

    return (
        <div className="MainPage">
            <ServiceProvider defaults="services">
                <div style={{display: 'flex', width: '100%', height: '100vh'}}>

                    <ServiceNav show={status}/>
                    <ServiceView/>

                    <div className="ServiceNav-button">
                        <SwitchButton 
                            showIcon={true} width={btnSize} height={btnSize} content="apps"
                            switcherFunc={switchStatusFunc} bgColor="var(--window-shadow)"
                        />
                    </div>

                </div>
            </ServiceProvider>
        </div>
    );
};

export default Main;