import { FC } from "react";
import { DiskInfo } from "./DisksList";
import { bytesToGB } from "../../../libs/Utils";

import './DiskContainer.css'

const DiskContainer: FC<DiskInfo> = ({
    devpath,
    model,
    serial,
    by_id_link,
    size,
    rpm,
    wearout,
    health
}) => {

    const data = new Map<string, string>([
        ["Serial", serial],
        ["Wearout", (wearout ? wearout.toString() : 'none')],
        ["RPM", (rpm ? rpm.toString() : 'none')],
        ["dev", devpath],
    ]);

    return (
        <div className="DiskContainer">
            <h2 className="DiskContainer-title">{model.toUpperCase() ?? 'Null'}</h2>
            <div className="DiskContainer-size">
                    <h3 className="DiskContainer-size-h">
                        {bytesToGB(size, 2)}
                    </h3>
                    <h3 
                        className="DiskContainer-health-h" 
                        style={{color: health === 'PASSED' ? 'rgb(41, 227, 29)' : 'orange'}}
                    >
                        TEST: {health}
                    </h3>
            </div>
            <div className="DiskContainer-main">
                {
                    Array.from(data).map(([key, value]) => (

                        <div className="DiskContainer-param" key={key}>
                            <strong>{key}:</strong>
                            <span>{value}</span>
                        </div>

                    ))
                }
            </div>
        </div>
    );
};

export default DiskContainer;