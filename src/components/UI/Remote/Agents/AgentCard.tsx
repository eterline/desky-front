import { FC } from 'react';
import './AgentCard.css'
import { AgentStats } from '../../../../hooks/useWsAgents';
import { DeskyMonitorAgent } from '../../../../lib/api/agentService';
import { LoadingContainer } from '../../Functional';

export interface AgentCardProps {
    info: DeskyMonitorAgent
    stats: AgentStats | null
}
 
const AgentCard: FC<AgentCardProps> = ({info, stats}) => {
    return (
        <div className='AgentCard'>
            <div className='AgentCard-head_container'>
                <h3 className='AgentCard-head'>{info.hostname} - {info.url}</h3>
                <h3 className='AgentCard-head'>machine ID: {info.id}</h3>
            </div>
            <div className='AgentCard-main'>
                {
                    stats
                    ?
                    stats.temperature.map( v => <div>[{v.key}] = MAC:{v.current}</div>)
                    :
                    <LoadingContainer />
                }
                {
                    stats
                    ?
                    stats.ports.map( v => <div>[{v.name}] = MAC:{v.mac ?? "NONE"} | MTU:{v.mtu}</div>)
                    :
                    <LoadingContainer />
                }
            </div>
        </div>
    );
};

export default AgentCard;