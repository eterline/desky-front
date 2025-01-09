import { FC } from "react";
import { memoryData } from "../../../libs/systemService";
import CircleBar from "../Functional/CircleBar";
import { bytesToGB } from "../../../libs/Utils";

const MemoryLoad: FC<memoryData> = ({available, total, use, used}) => {
    return (
        <div className="StatsTable-div_memory">
        
            <div className="main-pad-col_center">
                <h1 className="StatsTable-div-title">RAM</h1>
                <div className="StatsTable-div-param">
                    <strong>Avail:</strong>{bytesToGB(available, 2)}
                </div>
                <div className="StatsTable-div-param">
                    <strong>Total:</strong>{bytesToGB(total, 2)}
                </div>
                <div className="StatsTable-div-param">
                    <strong>Used:</strong>{bytesToGB(used, 2)}
                </div>
            </div>

            <div className="StatsTable-bar">
                <CircleBar size={100} value={use} strokeWidth={15} centerText={use.toFixed(1).toString() + '%'}/>
            </div>
        
        </div>
    );
};

export default MemoryLoad;