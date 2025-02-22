import { FC, useState } from 'react';
import './SSHhostCard.css'
import { deleteSSHhost, SSHhostInfo, SSHhostPing } from '../../../../lib/api/sshService';
import { UiIcon } from '../../Icons';
import TerminalShell from './TerminalShell';
import { createPortal } from 'react-dom';

export interface SSHhostCardProps {
    info: SSHhostInfo
    ping?: SSHhostPing
}

const SSHhostCard: FC<SSHhostCardProps> = ({info, ping}) => {

    const [isTerminalModalOpen, setTerminalModalOpen] = useState(false);

    const keyUsageText = info && info['private-key-use'] ? "🔐" : "❎"
    const accessText = ping && ping.available ? "🔓 Available" : "🔒 Not Access"
    const isAvail = ping && ping.available

    const accessColor = {color: (isAvail ? "#4bf645" : "#fd520f")}
    const connBtnColor = isAvail ? null : {backgroundColor: "red"}
    const connBtnText = isAvail ? "Connect SSH" : "Closed"

    return (
        <div className='SSHhostCard animated-topvisible'>
            <h2>
                📦 SSH ID: {info.id.toString()} 
                <div onClick={() => deleteSSHhost(info.id)}><UiIcon invert name='trash'/></div>
            </h2>
            <h3> SSH KEY: {keyUsageText}</h3>
            <h1>💻 {info.host}</h1>
            <div className='SSHhostCard-footer'>
                <h3>
                    STATUS: <span style={accessColor}>{accessText}</span>
                </h3>
                <div style={connBtnColor} className='SSHhostCard-ssh_button' onClick={() => setTerminalModalOpen(true)}>
                    {connBtnText}
                    <UiIcon invert name='terminal' size='30px'/>
                </div>
            </div>
            {isTerminalModalOpen && ping?.available && (
                <TerminalShell
                    id={info.id}
                    hostname={info.host}
                    onClose={() => setTerminalModalOpen(false)}
                />
            )}
        </div>
    );
};

export default SSHhostCard;