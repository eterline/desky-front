import { IconUI } from "../Pictures/uiIcon";
import { ProgressBar } from "./progressBar";
import "./loadBar.css"

interface BarProps {
    loadType: "load-1" | "load-5" | "load-15";

    upperValue:     number;
    actualValue?:   number;
}

export const LoadBar = (props: BarProps) => {

    const loaded: number = ((props.actualValue ?? 0) / props.upperValue) * 100

    return (
        <div className="LoadBar">
            <div className="LoadBar-icon">
                <IconUI name={props.loadType} />
            </div>
            <div className="LoadBar-bar">
                < ProgressBar bgcolor="red" completed={loaded} direction="column"/>
            </div>
            <div className="LoadBar-data">
                [{props.actualValue ?? 0}]
            </div>
        </div>
    );
};