import { FC, useEffect, useState } from "react";
import LoadingContainer from "../Functional/LoadingContainer";
import showToast from "../../../libs/showToats";
import { getItemLocalStorage } from '../../../libs/localStorageService';
import { Stats } from '../../../libs/systemService';
import WSService from '../../../libs/wsService';
import { API, resolveApi } from "../../../libs/apiResolve";

import './Stats.css';
import CpuStats from "./StatsContainers/CpuStats";
import RamStats from "./StatsContainers/RamStats";
import TempStats from "./StatsContainers/TempStats";
import LoadStats from "./StatsContainers/LoadStats";
import { UiIcon } from "../Icons";
import InfoTable from "./StatsContainers/InfoTable";

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
            <div className="Stats">
                <h1 className="Stats-title">SystemInfo</h1>
                <div className="Stats-main">
                    <LoadingContainer/> 
                </div>
            </div>
        )
    }

    const { memory, cpu, temperature, load } = stats.data

    return (
        <div className="Stats">

            <h1 className="Stats-title">
                <UiIcon name="system" invert={true} size=".75em" />
                SystemInfo
            </h1>

            <div className="Stats-main">
                <InfoTable/>
                <CpuStats {...cpu} />
                <RamStats {...memory} />
                <LoadStats data={load} cores={cpu.threadCount}/>
                <TempStats {...temperature} />
            </div>
        </div>
    );
};

export default StatsTable;