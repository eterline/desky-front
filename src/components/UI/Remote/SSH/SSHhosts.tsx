import { FC, useState } from 'react';
import './SSHhosts.css'
import { useFetchService } from '../../../../hooks';
import { fetchSSHhostList, pingSSHhostList, SSHhostPing } from '../../../../lib/api/sshService';
import { ErrorMsg, LoadingContainer } from '../../Functional';
import SSHhostCard from './SSHhostCard';
import usePingSSH from '../../../../hooks/usePingSSH';
import { AppIcon, UiIcon } from '../../Icons';
import { createPortal } from 'react-dom';
import AppendSSH from './AppendSSH';
import openModal from '../../Functional/openModal';

const SSHhosts: FC = () => {

    const pingMap = usePingSSH();
    const {loading, error, data} = useFetchService(fetchSSHhostList)
    const [isAppendOpen, setAppendOpen] = useState(false);

    if (error) { return <ErrorMsg text={error} type="notice" /> }
    if (loading) { return <LoadingContainer/> }

    return (
        <div className='SSHhosts'>
            {
                data.map(
                    (data, idx) => 
                    <SSHhostCard 
                        ping={pingMap.get(data.id)} 
                        info={data} 
                        key={idx} 
                    />
                )
            }
            <div 
                className='SSHhosts-add'
                onClick={
                    () => openModal(
                        <AppendSSH onClose={() => setAppendOpen(false)}/>,
                        () => setAppendOpen(false)
                    )
                }
            >
                + <UiIcon name='terminal' size='30px'/>
            </div>
            {
                isAppendOpen && 
                <AppendSSH onClose={() => setAppendOpen(false)}/>
            }
        </div>
    );
};

export default SSHhosts;