import { FC } from "react";
import { SystemdUnit } from '../../../libs/systemdService';
import { SystemdService, SystemdCmd } from "../../../libs/systemdService";
import './SystemUnit.css';

interface Unit {
    unit: SystemdUnit
    service: SystemdService
}

const SystemUnit: FC<Unit> = ({unit:{unit_file, state, preset}, service}) => {

    const handleClick = (cmd: SystemdCmd) => {
        return () => { service.execUnit(unit_file, cmd) }
    } 

    return (
        <div className="SystemUnit">
            {unit_file}
            {state}
            {preset}
        </div>
    );
};

export default SystemUnit;