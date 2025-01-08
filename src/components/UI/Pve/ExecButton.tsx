import { FC } from "react";
import PveService from "../../../libs/pveService";
import { ExecStates, PVEData } from "../../../libs/pveService";
import './ExecButton.css'

interface ExecButtonProps {
    command: ExecStates
    upperFunc: (...args: any[]) => void;
    data?: PVEData
}

const ExecButton: FC<ExecButtonProps> = ({data: {session, host, vmid}, upperFunc, command}) => {

    const stylesState: Map<ExecStates, string> = new Map([
        ["start",       "button-green"],
        ["stop",        "button-red"],
        ["reboot",     "button-grey"],
        ["resume",      "button-green"],
        ["suspend",     "button-grey"],
        ["shutdown",    "button-orange"]
    ]);

    const api = new PveService({session, host, vmid})

    const handleClick = () => {
        upperFunc();
        api.execCommand(vmid, command);
    }

    return (
        <div className={`ExecButton`} onClick={handleClick}>
            <div className={`ExecButton-main ${stylesState.get(command)}`}>
                {command}
            </div>
        </div>
    );
};

export default ExecButton;