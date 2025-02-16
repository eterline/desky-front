import { FC } from "react";
import { AppIcon, UiIcon } from "../Icons";

import './ServiceCard.css';

interface ServiceCardProps {
    serviceName: string
    iconName?: string
    onClick?: () => void; // switch service click function.
}

const ServiceCard: FC<ServiceCardProps> = ({serviceName, iconName, onClick}) => {
    return (<>
        <div className="ServiceCard" onClick={onClick}>
            <UiIcon name={iconName ?? serviceName} size="60px"/>
            <div className="ServiceCard-name"> {serviceName} </div>
        </div>
        <hr/>
    </>);
};

export default ServiceCard;
