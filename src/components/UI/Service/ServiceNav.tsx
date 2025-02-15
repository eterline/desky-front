
import ServiceCard from './ServiceCard';
import useServiceContext, { ServiceMap } from '../../../hooks/useServiceContext';
import ExitButton from './ExitButton';
import { FC } from 'react';

import './ServiceNav.css';

interface ServiceNavProps {
    show: boolean
}

type showClass = "ServiceNav_hidden" | "ServiceNav_showed"


const ServiceNav: FC<ServiceNavProps> = ({ show }) => {
    const { setSelectedService } = useServiceContext();

    const displayClass: showClass = show ? "ServiceNav_showed" : "ServiceNav_hidden";

    return (
        <div className={`ServiceNav ${displayClass}`}>
            <h1 className='ServiceNav-logo'>Desky</h1>
            {Array.from(ServiceMap.entries()).map(([key], i) => (
                <ServiceCard
                    key={i}
                    serviceName={key} iconName={key}
                    onClick={ () => { setSelectedService(key) } }
                />
            ))}

            <ExitButton />
        </div>
    );
};

export default ServiceNav;