import Agents from './Agents/Agents';
import './RemoteService.css'
import SSHhosts from './SSH/SSHhosts';
import TerminalShell from './SSH/TerminalShell';

const RemoteService = () => {
    return (
        <div className='RemoteService'>
            <div className='RemoteService-side'>
                <h1 className='RemoteService-side_header'>SSH Hosts</h1>
                <SSHhosts/>
            </div>
            <div className='RemoteService-side'>
                <h1 className='RemoteService-side_header'>Desky Agents</h1>
                <Agents/>
            </div>
        </div>
    );
};

export default RemoteService;