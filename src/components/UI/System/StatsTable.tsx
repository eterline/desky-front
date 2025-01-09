import { FC, useEffect, useState } from "react";
import { SysData } from '../../../libs/systemService';
import './StatsTable.css';
import CircleBar from "../Functional/CircleBar";
import { bytesToGB } from "../../../libs/Utils";
import LoadingContainer from "../Functional/LoadingContainer";
import showToast from "../../../libs/showToats";
import { getItemLocalStorage } from '../../../libs/localStorageService';
import { Stats } from '../../../libs/systemService';
import WSService from '../../../libs/wsService';
import { API, resolveApi } from "../../../libs/apiResolve";
import AvgLoad from "./AvgLoad";
import MemoryLoad from "./MemoryLoad";
import CpuLoad from "./CpuLoad";
import TemperatureStats from "./TempertureStats";

const StatsTable: FC = () => {

    const [stats, setStats] = useState<Stats>({loading: true, data: null});
    
    useEffect(() => {

        const conn = new WSService(resolveApi(API.system.stats), {"DeskyJWT": getItemLocalStorage('token')})
        conn.on('message', (data) => {
            if (data && data.data) { 
                setStats({ loading: false, data: JSON.parse(data.data) });
            } else {
                setStats({ loading: true, data: null });
            }
        });
    
        conn.on('error', (err) => {
            showToast(`WebSocket error: ${err.data || err}`);
        });
    
    }, []);

    if (stats.loading || stats.data === null) {
        return (
            <div className="StatsTable">
                <h1 className="StatsTable-title">SystemInfo</h1>
                <div className="StatsTable-main">
                    <LoadingContainer/> 
                </div>
            </div>
        )
    }

    const { memory, cpu, temperature, load } = stats.data

    return (
        <div className="StatsTable">

            <h1 className="StatsTable-title">SystemInfo</h1>

            <div className="main-pad">
                <AvgLoad cpuLoad={cpu.load} coreCount={cpu.coreCount} avg={load}/>

                <div className="StatsTable-main">
                    <hr />
                    <CpuLoad {...cpu}/>
                    <hr />
                    <MemoryLoad {...memory}/>
                    <hr />
                    <TemperatureStats {...temperature}/>
                </div>
            </div>

                

                {/* <div className="StatsTable-div_cpu">

                    <h1 className="StatsTable-div-title">RAM</h1>
                    <div className="StatsTable-div_memory-param">
                        <strong>Avail:</strong>{bytesToGB(memory.available, 2)}
                    </div>
                    <div className="StatsTable-div_memory-param">
                        <strong>Total:</strong>{bytesToGB(memory.total, 2)}
                    </div>
                    <div className="StatsTable-div_memory-param">
                        <strong>Used:</strong>{bytesToGB(memory.used, 2)}
                    </div>
                    </div>
                </div> */}
        </div>
    );
};

export default StatsTable;