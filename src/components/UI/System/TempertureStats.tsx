import { FC } from "react";
import { tempData } from "../../../libs/systemService";

const TemperatureStats: FC<tempData> = (data: tempData) => {
    return (
        <div className="TemperatureStats">
            <h1 className="StatsTable-div-title">Temperature</h1>
            <div className="TemperatureStats-params">
                {
                    Object.entries(data).map(
                        ([_ ,u], idx)=>(
                            <div className="StatsTable-div-param" key={idx}>
                                <strong>{u.key}</strong>={u.current.toFixed(2) ?? 'unknown'}
                            </div>
                        )
                    )
                }
            </div>
            
        </div>
    );
};

export default TemperatureStats;