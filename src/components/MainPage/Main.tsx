import { ServiceNav, ServiceView, ServiceProvider } from '../UI/Service';
import { FC } from 'react';

const Main: FC = () => {
    return (<>
        <ServiceProvider defaults="services">
            <ServiceNav show={true}/>
            <ServiceView/>
        </ServiceProvider>
    </>);
};

export default Main;