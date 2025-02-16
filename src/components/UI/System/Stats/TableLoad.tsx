import { FC } from "react";
import { CircleBar } from "../../Functional";
import { loadColorRGB, percentString } from "../../../../lib/utils";

import './TableLoad.css';
import { UiIcon } from "../../Icons";

interface TableLoadProps {
    loadPercent?: number
    titleName: string
    titleUpper?: boolean
    params: Map<string, string>
    disableBar?: boolean

    centText?: boolean

    icon?: string
}

const TableLoad: FC<TableLoadProps> = ({loadPercent, titleName, titleUpper, params, disableBar, icon, centText}) => {

    return (
        <div className='TableLoad'>
                {disableBar ? "" : <div className="TableLoad-graphic">
                    <CircleBar
                        size={100}
                        value={loadPercent}
                        strokeWidth={12}
                        centerText={percentString(loadPercent, 1)}
                        fillColor={loadColorRGB(loadPercent)}
                    />
                </div>}
            <div className="TableLoad-main">
                <h1 className="TableLoad-main-title">
                    {icon ? <UiIcon name={icon} invert={true} size=".75em" /> : ''}
                    {titleUpper ? titleName.toUpperCase() : titleName}
                </h1>
                <div className="TableLoad-main-parameters">
                {
                    Array.from(params).map(([key, value]) => (
                    <div key={key} style={{textAlign: centText ? "center" : null}}>
                        <strong style={{marginLeft: centText ? "auto" : null}} >{key}:</strong>
                        <span style={{marginRight: centText ? "auto" : null}} >{value}</span>
                    </div>
                    ))
                }
                </div>
            </div>
        </div>
    );
};

export default TableLoad;