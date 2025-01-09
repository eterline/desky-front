import { FC } from "react";
import { loadData } from "../../../libs/systemService";
import CircleBar from "../Functional/CircleBar";

interface AvgLoadProps {
    cpuLoad: number
    coreCount: number
    avg:    loadData
}


const AvgLoad: FC<AvgLoadProps> = ({cpuLoad, avg, coreCount}) => {
    return (
        <div className="StatsTable-div_load">

            <h1 className="StatsTable-div-title">CPU Load</h1>
            <CircleBar
                size={120}
                value={cpuLoad}
                strokeWidth={15}
                centerText={cpuLoad.toFixed(1).toString() + '%'}
            />
            <hr />
            <h1 className="StatsTable-div-title">AVG Load</h1>
            {
                Object.entries(avg).map(([key, val], idx) => (
                    <CircleBar 
                        key={idx}
                        max={coreCount}
                        size={120} 
                        value={val}
                        strokeWidth={15}
                        centerText={val.toFixed(2).toString()}
                    />
                ))
            }
        </div>
    );
};

export default AvgLoad;