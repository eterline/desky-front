import { FC } from 'react';
import './SSHhostCard.css'
import { SSHhostInfo, SSHhostPing } from '../../../../lib/api/sshService';
import useSSHConnContext from '../../../../hooks/useSSHConnect';
import { UiIcon } from '../../Icons';

export interface SSHhostCardProps {
    info: SSHhostInfo
    ping?: SSHhostPing
}

const SSHhostCard: FC<SSHhostCardProps> = ({info, ping}) => {

    // const {setSelectedSSHConn} = useSSHConnContext()

    const keyUsageText = info && info['private-key-use'] ? "🔐" : "❎"
    const accessText = ping && ping.available ? "🔓 Available" : "🔒 Not Access"

    const accessColor = {
        color: (ping && ping.available ? "#4bf645" : "#fd520f"),
    }

    const handleConnectClick = () => {
        // setSelectedSSHConn({id: info.id, hostname: info.host, allow: true})
    }

    return (
        <div className='SSHhostCard'>
            <h2>📦 SSH ID: {info.id.toString()}</h2>
            <h3> SSH KEY: {keyUsageText}</h3>
            <h1>💻 {info.host}</h1>
            <div className='SSHhostCard-footer'>
                <h3>
                    STATUS: <span style={accessColor}>{accessText}</span>
                </h3>
                <div className='SSHhostCard-ssh_button' onClick={handleConnectClick}>
                    Connect SSH <UiIcon name='terminal' size='30px'/>
                </div>
            </div>
        </div>
    );
};

export default SSHhostCard;