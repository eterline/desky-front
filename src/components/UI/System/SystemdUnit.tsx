import { FC, useState } from "react";
import { DeskySystemdUnit } from "../../../lib/api/systemService";
import './SystemdUnit.css'





const SystemdUnit: FC<DeskySystemdUnit> = (unit: DeskySystemdUnit) => {

    const [ inactive, setInactive ] = useState<boolean>(false);

    return (
        <div className={inactive ? 'SystemdUnit Block-inactive' : 'SystemdUnit'}>
            <div className="SystemdCalc-param">
                <strong>Unit Name:</strong>{unit.unit_file}
            </div>
            <div className="SystemdCalc-param">
                <strong>Unit State:</strong>{unit.state}
            </div>
            <div className="SystemdCalc-param">
                <strong>Unit Preset:</strong>{unit.preset}
            </div>

            {/* <div 
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
            </div> */}
        </div>
    );
};

export default SystemdUnit;