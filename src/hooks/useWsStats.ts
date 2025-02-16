import { useEffect, useRef, useState } from "react";
import { WsConnectorAPI } from "../lib/api/apiBaseService";
import useFetchService from "./useFetchService";
import { fetchStats, SystemStats, wsSystemStats } from "../lib/api/systemService";

const emptySystemStats: SystemStats = {
    memory: {
      total: 0,
      used: 0,
      available: 0,
      use: 0,
    },
    cpu: {
      name: "loading",
      model: "loading",
      coreCount: 0,
      threadCount: 0,
      cores: [],
      cache: 0,
      load: 0,
    },
    temperature: [],
    load: {
      load1: 0,
      load5: 0,
      load15: 0,
    },
  };
  

const useWsStats = (stubbed?: boolean) => {

    const {loading, error, data} = useFetchService(fetchStats);
    const wsSystemStatsRef = useRef<WsConnectorAPI | null>(null);
    const [stats, setStats] = useState<SystemStats | null>(emptySystemStats);
    
    useEffect(() => {
        if (data && !wsSystemStatsRef.current) {

            const ws = stubbed ? null : wsSystemStats();
            wsSystemStatsRef.current = ws;
            if (!ws) return
        
            ws.AddReaction(
                'message', (e) => {
                    try {

                        const stats: SystemStats = JSON.parse(e.data);

                        if (stats) {
                            setStats(stats)
                        } else {
                            setStats(emptySystemStats)
                        }

                    } catch (err) {
                        console.error('Error stats monitoring:', err);
                    }
                }
            );
           
    
          return () => { ws.CloseWS() };
        }
    }, [data]);

    return {data, stats, loading, error};
};

export default useWsStats;