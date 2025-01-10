import { FC, useState } from "react";
import { SystemdUnit, SystemdService, SystemdCmd } from "../../../libs/systemdService";
import './SystemdUnit.css'

interface SystemdUnitProps {
    unit: SystemdUnit
    api: SystemdService
    refetchFunc: () => void
}



const SystemdUnit: FC<SystemdUnitProps> = ({unit:{unit_file, state, preset}, api, refetchFunc}) => {

    const [ inactive, setInactive ] = useState<boolean>(false);

    const handleCommand = (cmd: SystemdCmd) => {
        return () => {
            api.execUnit(unit_file, cmd);
            setInactive(true);
            setTimeout( () => {
                setInactive(false);
                refetchFunc();
            }, 5000);
        }
    }

    return (
        <div className={inactive ? 'SystemdUnit Block-inactive' : 'SystemdUnit'}>
            <div className="SystemdCalc-param">
                <strong>Unit Name:</strong>{unit_file}
            </div>
            <div className="SystemdCalc-param">
                <strong>Unit State:</strong>{state}
            </div>
            <div className="SystemdCalc-param">
                <strong>Unit Preset:</strong>{preset}
            </div>

            <div 
                onClick={handleCommand('start')}
                className="SystemdUnit-btn SystemdUnit-btn_start">
                Start Service
            </div>

            <div 
                onClick={handleCommand('stop')}
                className="SystemdUnit-btn SystemdUnit-btn_stop">
                Stop Service
            </div>

            <div 
                onClick={handleCommand('restart')}
                className="SystemdUnit-btn SystemdUnit-btn_restart">
                Restart Service
            </div>
        </div>
    );
};

export default SystemdUnit;