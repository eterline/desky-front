import { FC } from 'react';
import './SSHhosts.css'
import { useFetchService } from '../../../../hooks';
import { fetchSSHhostList, pingSSHhostList, SSHhostPing } from '../../../../lib/api/sshService';
import { ErrorMsg, LoadingContainer } from '../../Functional';
import SSHhostCard from './SSHhostCard';
import usePingSSH from '../../../../hooks/usePingSSH';
import { AppIcon } from '../../Icons';

const SSHhosts: FC = () => {

    const pingMap = usePingSSH();
    const {loading, error, data} = useFetchService(fetchSSHhostList)

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
            <div className='SSHhosts-add'>
                + <AppIcon name='terminal' size='30px'/>
            </div>
        </div>
    );
};

export default SSHhosts;