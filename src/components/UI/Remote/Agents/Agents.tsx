import useWsAgentMonitor from '../../../../hooks/useWsAgents';
import { getItemLocalStorage } from '../../../../lib/localStorage/localStorageService';
import { ErrorMsg, LoadingContainer } from '../../Functional';
import AgentCard from './AgentCard';
import './Agents.css'

const Agents = () => {

    const {data, agentStatsMap, error, loading} = useWsAgentMonitor(false);

    if (error) { 
        return (<ErrorMsg text={error} type="alert" />)
    }

    if (loading && !data) { 
        return (<LoadingContainer/>)
    }

    return (
        <div className="Agents">
            {
                data.map(
                    (value, idx) => (
                        <AgentCard info={value} stats={agentStatsMap[value.id]} key={idx} />
                    )
                )
            }
        </div>
    );
};

export default Agents;