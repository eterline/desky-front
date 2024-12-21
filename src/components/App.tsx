import { HostInfoField } from "./templates/hostInfoField";
import { NetInfoField } from "./templates/netInfoField";
import { useState } from "react";
import { SwapBtn } from "./templates/UI/Functional/swapBtn";
import { ServiceSwitcher } from "./templates/UI/Services/ServiceProvide/serviceSwitcher";
import { ServiceView } from "./templates/UI/Services/ServiceProvide/serviceView";

import './App.css';

const serviceList: string[] = ["apps", "docker", "proxmox"];

export const App = () => {
    const [swapInfo, setSwapInfo] = useState<boolean>(true);
    const [service, setService] = useState<string>("apps");

    return (
        <>
            <div id="ServicesContainer" className={(swapInfo ? "display-On-Phone"  : "display-Off-Phone")}>
                <ServiceView serviceName={service}/>
                <ServiceSwitcher appList={serviceList} switched={service} switchFunc={setService}/>
            </div>
            
            <div id="DataContainer" className={(swapInfo ? "display-Off-Phone"  : "display-On-Phone")}>
                <div id="DataContainer-wrapper">
                    <HostInfoField />
                    <NetInfoField />
                </div>
            </div>

            <SwapBtn switcher={setSwapInfo} state={swapInfo}/>
        </>
    );
};