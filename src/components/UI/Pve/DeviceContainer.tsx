import { FC, useState } from 'react';
import './DeviceContainer.css';
import { UiIcon } from '../Icons';
import { SecToHHMMSSString } from '../../../libs/Utils';
import ExecButton from './ExecButton';

export interface DeviceContainerProps {
    dev: DeviceParams
    type: "qemu" | "lxc"
    host: string
    session: number
    updateFunc: () => void
}

export interface DeviceParams {
    type:       'lxc' | 'qemu'
    status:     "running" | "stopped" | "resumed" | "starting"
    name:       string,
    tags:       string,
    vmid:       number,
    cpus:       number,
    netRX?:     number | null,
    netTX?:     number | null,
    uptime?:    number | null,
    pid:        number
}

const DeviceContainer: FC<DeviceContainerProps> = ({dev, type, host, session, updateFunc}) => {

    const [ inactive, setInactive ] = useState<boolean>(false);

    const switchState = (sec: number) => { 
        return () => {
            setInactive(true);
            setTimeout(() => { setInactive(false) }, sec * 1000)
            setTimeout(() => { updateFunc() }, sec * 1000 + 500)
        }
    }

    const { status, name, tags, vmid, cpus, netRX, netTX, uptime, pid } = dev

    return (
        <div className={inactive ? 'DeviceContainer DeviceContainer-inactive' : 'DeviceContainer'}>
            <div className='DeviceContainer-logo'>
                <UiIcon name={`device-${type}`} size='100%'/>
                <ExecButton data={{host, session, vmid}} upperFunc={switchState(5)} command={status==='running' ? 'shutdown' : 'start'}/>
                {status==='running' ? <ExecButton data={{host, session, vmid}} upperFunc={switchState(5)} command='stop'/> : null}
            </div>

            <hr />

            <div className='DeviceContainer-info'>
            <p className={ status==='running' ? 'Status-green' : 'Status-red' }>{'⏼ ' + status}</p>
                <div className='DeviceContainer-info_text'> <strong>Name:</strong> {name ?? 'null'} </div>
                <div className='DeviceContainer-info_text'> <strong>Tags:</strong> {tags ?? 'null'} </div>
                <div className='DeviceContainer-info_text'> <strong>Vmid:</strong> {vmid ?? 'null'} </div>
                <div className='DeviceContainer-info_text'> <strong>Cpus:</strong> {cpus ?? 'null'} </div>
                <div className='DeviceContainer-info_text'> <strong>RX:</strong> {netRX ? (netRX/1024/8) : 'none'} </div>
                <div className='DeviceContainer-info_text'> <strong>TX:</strong> {netTX ? (netTX/1024/8) : 'none'} </div>
                <div className='DeviceContainer-info_text'> <strong>Uptime:</strong> {SecToHHMMSSString(uptime) ?? 'none'} </div>
                <div className='DeviceContainer-info_text'> <strong>PID:</strong> {pid ?? 'null'} </div>
            </div>
        </div>
    );
};

export default DeviceContainer;