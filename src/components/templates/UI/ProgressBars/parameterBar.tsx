import { IconUI } from "../Pictures/uiIcon";
import { ProgressBar } from "./progressBar";
import "./parameterBar.css"

type UnitPrefix = "GB" | "MB" | "%" | "B";

interface BarProps {
    icon:           string;
    descriprion?:   string;

    upperValue:     number;
    actualValue?:   number;

    prefix?:         UnitPrefix;
}

export const ParameterBar = (props: BarProps) => {

    const loaded: number = ((props.actualValue ?? 0) / props.upperValue) * 100

    return (
        <div className="ParameterBar">
            <div className="ParameterBar-icon">
                <IconUI name={props.icon ?? "alert-circle"} />
            </div>
            <div className="ParameterBar-bar">
                <span>{props.descriprion}</span>
                < ProgressBar bgcolor="red" completed={loaded}/>
            </div>
            <div className="ParameterBar-data">
                {props.actualValue}/{props.upperValue}({props.prefix})
            </div>
        </div>
    );
};