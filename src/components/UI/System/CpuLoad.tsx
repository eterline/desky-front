import { FC } from "react";
import { cpuData } from "../../../libs/systemService";

const CpuLoad: FC<cpuData> = ({name, model, coreCount, threadCount, cache}) => {
    return (
        <div className='CpuLoad'>
            <h1 className="StatsTable-div-title">CPU Info</h1>

            <div className="StatsTable-div-param">
                <strong>Model:</strong>{model}
            </div>
            <div className="StatsTable-div-param">
                <strong>Name:</strong>{name}
            </div>
            <div className="StatsTable-div-param">
                <strong>Cores:</strong>{`${coreCount}/${threadCount}`}
            </div>
        </div>
    );
};

export default CpuLoad;