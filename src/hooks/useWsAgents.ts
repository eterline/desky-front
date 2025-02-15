import { useEffect, useRef, useState } from "react";
import { fetchMonitor, wsAgentMonitor } from "../lib/api/agentService";
import useFetchService from "./useFetchService";
import { WsConnectorAPI } from "../lib/api/apiBaseService";

export type AgentMonitorStatsMap = Record<string, AgentStats>

export interface AgentStatsMessage {
    id:     string
    data:   AgentStats
}

export interface AgentStats {
    cpu: Cpu
    host: Host
    load: Load
    partitions: Partition[]
    ports: Port[]
    ram: Ram
    temperature: Temperature[]
}
  
interface Cpu {
    name:           string
    model:          string
    "core-count":   number
    "thread-count": number
    cores:          Core[]
    cache:          number
    load:           number
}
  
interface Core {
    id:         string
    frequency:  number
}
  
interface Host {
    hostname:   string
    uptime:     number
    os:         string
    processes:  number
    hypervisor: string
}
  
interface Load {
    "load-1":   number
    "load-5":   number
    "load-15":  number
}

interface Partition {
    device:         string
    fs:             string
    total:          number
    free:           number
    used:           number
    "used-percent": number
}
  
interface Port {
    mtu:    number
    name:   string
    mac:    string
}
  
interface Ram {
    total:      number
    used:       number
    available:  number
    use:        number
}
  
interface Temperature {
    key:        string
    current:    number
    max:        number
}

const useWsAgentMonitor = () => {

    const {loading, error, data} = useFetchService(fetchMonitor);
    const [agentStatsMap, setAgentStatsMap] = useState<AgentMonitorStatsMap>({});
    const wsAgentsMonitorRef = useRef<WsConnectorAPI | null>(null);
    
    useEffect(() => {
        if (data?.length > 0 && !wsAgentsMonitorRef.current) {

            const ws = wsAgentMonitor();
            wsAgentsMonitorRef.current = ws;

            ws.AddReaction(
                'message', (e) => {
                    try {
                        const stats: AgentStatsMessage = JSON.parse(e.data);
                        if (stats && stats.data && stats.id) {
                            setAgentStatsMap( prev => (
                                {...prev, [stats.id]: stats.data }
                            ));
                        }
                    } catch (err) {
                        console.error('Error agents monitoring:', err);
                    }
                }
            );
    
          return () => { ws.CloseWS() };
        }
    }, [data]);

    return {data, agentStatsMap, loading, error};
};

export default useWsAgentMonitor;