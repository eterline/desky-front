import { Navigate } from "react-router-dom";
import { useAuthorized, useElementSwitch } from '../../hooks';
import { ServiceNav, ServiceView, ServiceProvider } from '../UI/Service';
import { FC, useEffect } from 'react';
import showToast from '../../libs/showToats';

const Main: FC = () => {

    useEffect(()=>{ showToast("welcome") }, [])

    // const authState = useAuthorized(true)
    // if (!authState) { return (<Navigate to={'/welcome'} />) }

    const { status, switchStatusFunc } = useElementSwitch(false);
    const btnSize = status ? '4rem' : '2rem' ;

    return (<>
        <ServiceProvider defaults="services">
            <ServiceNav show={status}/>
            <ServiceView/>
        </ServiceProvider>
    </>);
};

export default Main;


/* <div className="ServiceNav-button">
                    <SwitchButton 
                        showIcon={true} width={btnSize} height={btnSize} content="apps"
                        switcherFunc={switchStatusFunc} bgColor="var(--window-shadow)"
                    />
                </div> */