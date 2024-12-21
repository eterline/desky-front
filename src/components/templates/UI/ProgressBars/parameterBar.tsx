import { IconUI } from "../Pictures/uiIcon";
import { ProgressBar } from "./progressBar";
import "./parameterBar.css"


export const ParameterBar = (props: ParameterBarProps) => {

    const loaded: number = ((props.actualValue ?? 0) / props.upperValue) * 100

    return (
        <div className="ParameterBar">
            <div className="ParameterBar-icon">
                <IconUI name={props.icon ?? "alert-circle"} />
            </div>
            <div className="ParameterBar-bar">
                <span>{props.descriprion}</span>
                < ProgressBar bgcolor={props.color} completed={loaded}/>
            </div>
            <div className="ParameterBar-data">
                {props.actualValue}/{props.upperValue}({props.prefix})
            </div>
        </div>
    );
};