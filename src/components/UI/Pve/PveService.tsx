import { FC, useEffect } from 'react';
import './PveService.css'
import HostStatus from './HostStatus';
import DevicesList from './DevicesList';
import { usePveHost } from '../../../hooks';

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
    const {selected, setSelected} = usePveHost();

    useEffect( () => {setSelected(0 , 'micro-ve')} ,[])

    return (
        <div className='PveService UsualService'>
            <HostStatus  session={selected.session} host={selected.host}/>
            <hr />
            <DevicesList session={selected.session} host={selected.host}/>
        </div>
    );
};

export default PveService;