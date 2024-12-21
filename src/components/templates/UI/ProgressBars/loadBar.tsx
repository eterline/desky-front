import { IconUI } from "../Pictures/uiIcon";
import { ProgressBar } from "./progressBar";
import "./loadBar.css"

export const LoadBar = (props: LoadBarProps) => {

    const loaded: number = ((props.actualValue ?? 0) / props.upperValue) * 100

    return (
        <div className="LoadBar">
            <div className="LoadBar-icon">
                <IconUI name={props.loadType} />
            </div>
            <div className="LoadBar-bar">
                < ProgressBar bgcolor={props.color} completed={loaded} direction="column"/>
            </div>
            <div className="LoadBar-data">
                [{props.actualValue ?? 0}]
            </div>
        </div>
    );
};