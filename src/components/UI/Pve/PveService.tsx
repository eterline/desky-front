import { FC, useEffect } from 'react';
import './PveService.css'
import HostStatus from './HostStatus';
import DevicesList from './DevicesList';
import { usePveHost } from '../../../hooks';
import VESessionProvider from './VESessionProvider';
import SessionSelect from './SessionSelect';
import DisksList from './DisksList';

const Device = {
    "status": "stopped",
    "name": "code",
    "tags": "",
    "vmid": 500,
    "cpus": 1,
    "uptime": 0,
    "pid": 0
}

const PveService: FC = () => {
    return (
        <div className='PveService UsualService'>
            <VESessionProvider>
                <SessionSelect/>
                <hr />
                <HostStatus/>
                {/* <hr />
                <DisksList/> */}
                <hr />
                <DevicesList/>
            </VESessionProvider>
        </div>
    );
};

export default PveService;