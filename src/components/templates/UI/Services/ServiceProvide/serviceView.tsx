import { AppsField } from "../../Services/Apps/appsField";

import "./serviceView.css";


interface ServiceViewProps {
    serviceName: string;
}

export const ServiceView = (props: ServiceViewProps) => {

    const serviceMap = new Map<string, React.ReactNode>([
        ["apps",    <AppsField />],
        ["proxmox", <AppsField />],
    ]);

    return (
        <div className="ServiceView">
            <div className="ServiceView-title">
                [{props.serviceName}]
            </div>
            <div className="ServiceView-main">
                {serviceMap.get(props.serviceName) ?? <AppsField />}
            </div>
        </div>
    );
};