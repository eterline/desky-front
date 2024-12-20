import { AppsField } from "./templates/UI/Services/Apps/appsField";
import './App.css';
import { HostInfoField } from "./templates/hostInfoField";
import { NetInfoField } from "./templates/netInfoField";

export const App = () => {
    return (
        <>
            <div id="AppsContainer">
                <AppsField />
            </div>
            <div id="DataContainer">
                <HostInfoField />
                <NetInfoField />
            </div>
        </>
    );
};