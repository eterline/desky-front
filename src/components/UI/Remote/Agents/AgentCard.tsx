import { FC } from 'react';
import './AgentCard.css'
import { AgentStats, emptyAgentStats } from '../../../../hooks/useWsAgents';
import { DeskyMonitorAgent } from '../../../../lib/api/agentService';
import { bytesToGB } from '../../../../lib/utils';
import { UiIcon } from '../../Icons';
import { loadColorRGB, percentString } from '../../../../lib/utils';
import { CircleBar } from '../../Functional';

export interface AgentCardProps {
    info: DeskyMonitorAgent
    stats: AgentStats | null
}
 
const AgentCard: FC<AgentCardProps> = ({info, stats}) => {

    const hasValidStats = (stats: AgentStats | null): boolean => {
        if (!stats) return false;

        return (
            stats.cpu &&
            stats.ram &&
            stats.load &&
            Array.isArray(stats.ports) &&
            Array.isArray(stats.temperature) &&
            Array.isArray(stats.partitions)
        );
    };

    const isOnline = hasValidStats(stats);
    const infoStat = isOnline ? stats : emptyAgentStats;


    return (
        <div className='AgentCard animated-topvisible'>
            <div className='AgentCard-head_container'>
                <h3 className='AgentCard-head'  style={{backgroundColor: isOnline ? "green" : "red"}}>machine ID: {info.id}</h3>
                <h3 className='AgentCard-head'>
                    <a href={`${info.url}`}>{info.hostname}</a>
                </h3>
                
            </div>

            {
                <div className='AgentCard-main'>
                    <div className='AgentCard-data'>

                        <div className='AgentCard-data-bar'>
                        <CircleBar 
                            textSize='1.2rem' 
                            textColor='rgb(var(--text-invert))' 
                            fillColor={loadColorRGB(infoStat.cpu.load)} 
                            value={infoStat.cpu.load} 
                            size={100} 
                            strokeWidth={12} 
                            centerText={percentString(infoStat.cpu.load, 1)} 
                        />
                        <span>{`${infoStat.cpu['core-count']}/${infoStat.cpu['thread-count']}`}</span>
                        </div>

                        <div className='AgentCard-data-bar'>
                            <CircleBar 
                                textSize='1.2rem' 
                                textColor='rgb(var(--text-invert))' 
                                fillColor={loadColorRGB(infoStat.ram.use)} 
                                value={infoStat.ram.use} 
                                size={100} 
                                strokeWidth={12} 
                                centerText={percentString(infoStat.ram.use, 1)} 
                            />
                            <span>{bytesToGB(infoStat?.ram.used, 1)}</span>
                        </div>

                        <div className='AgentCard-data-item'>
                            <span> <UiIcon name='cpu-64' size='18px'/> CPU </span>
                            <p>
                                {infoStat?.cpu.name ?? "[null]"}
                            </p>
                        </div>

                        <div className='AgentCard-data-item'>
                            <span> <UiIcon name='ram' size='18px'/> RAM </span>
                            <p>
                                Used: {bytesToGB(infoStat?.ram.used, 2)}
                                <br />
                                Free: {bytesToGB(infoStat?.ram.available, 2)}
                                <br />
                                Total: {bytesToGB(infoStat?.ram.total, 2)}
                            </p>
                        </div>

                        <div className='AgentCard-data-item'>
                            <span>AVG LOAD:</span>
                            <p>{`${infoStat?.load['load-1']} | ${infoStat?.load['load-5']} | ${infoStat?.load['load-15']}`}</p>
                        </div>
                    </div>
                </div>
            }
            <details className='AgentCard-details'>
                <summary>
                    <span> <UiIcon name='plug' size='18px'/> Network</span>
                    <span> <UiIcon name='temperature' size='18px'/> Temperature</span>
                    <span> <UiIcon name='hdd' size='18px'/> Partitions</span> 
                </summary>
                <div className='AgentCard-details-data'>
                    <div className='AgentCard-details-item'>
                        {infoStat?.ports.map(
                            (port, key) => <div key={key}>
                                <span>{port.name}</span>
                                <p>MAC:{port.mac}</p>
                            </div>
                        )}
                    </div>

                    <div className='AgentCard-details-item'>
                        {infoStat?.temperature.map(
                            (temp, key) => <div key={key}>
                                <span>{temp.key}</span>
                                <p style={{color: loadColorRGB(temp.current, temp.max > 150 ? 85:temp.max)}}>
                                    {temp.current + " °C"}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className='AgentCard-details-item'>
                        {infoStat?.partitions.map(
                            (part, key) => <div key={key}>
                                <span>{part.device}</span>
                                <p>fs:{part.fs}</p>
                            </div>
                        )}
                    </div>
                </div>
            </details>
        </div>
    );
};

export default AgentCard;