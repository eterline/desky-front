import { FC, useState } from 'react';
import './DeviceContainer.css';
import { UiIcon } from '../Icons';
import { bytesToGB, SecToHHMMSSString } from '../../../libs/Utils';
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
        <div className={inactive ? 'DeviceContainer Block-inactive' : 'DeviceContainer'}>
            <div className='DeviceContainer-logo'>
                <UiIcon name={`device-${type}`} size='100%'/>
                <ExecButton data={{host, session, vmid}} upperFunc={switchState(5)} command={status==='running' ? 'shutdown' : 'start'}/>
                {status==='running' ? <ExecButton data={{host, session, vmid}} upperFunc={switchState(5)} command='stop'/> : null}
            </div>

            <hr />

            <div className='DeviceContainer-info'>
            <p className={ status==='running' ? 'Status-green' : 'Status-red' }>{`⏼ ${status} | PID:${pid}`}</p>
                <div className='DeviceContainer-info_text'> 
                    <strong>
                        <UiIcon name='accessible' size=".8em" />
                        Name:
                    </strong> {name ?? 'null'} 
                </div>
                <div className='DeviceContainer-info_text'> 
                    <strong>
                        <UiIcon name='article' size=".8em" />
                        Vmid:
                    </strong> {vmid ?? 'null'} 
                </div>
                <div className='DeviceContainer-info_text'> 
                    <strong>
                        <UiIcon name='tags' size=".8em" />
                        Tags:
                    </strong> {tags ?? 'null'} 
                </div>
                <div className='DeviceContainer-info_text'> 
                    <strong>
                        <UiIcon name='' size=".8em" />
                        Cpus:
                    </strong> {cpus ?? 'null'} 
                </div>
                <div className='DeviceContainer-info_text'> 
                    <strong>
                        <UiIcon name='net-in' size=".8em" />
                        Net IN:
                    </strong> {netRX ? (bytesToGB(netRX, 3)) : 'none'} 
                </div>
                <div className='DeviceContainer-info_text'> 
                    <strong>
                        <UiIcon name='net-out' size=".8em" />
                        Net OUT:
                    </strong> {netTX ? (bytesToGB(netTX, 3)) : 'none'} 
                </div>
                <div className='DeviceContainer-info_text'> 
                    <strong>
                        <UiIcon name='clock' size=".8em" />
                        Uptime:
                    </strong> {SecToHHMMSSString(uptime) ?? 'none'} 
                </div>
            </div>
        </div>
    );
};

export default DeviceContainer;