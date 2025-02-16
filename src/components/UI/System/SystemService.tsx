import './SystemService.css';
import { FC } from 'react';
import SystemdTable from './Systemd/SystemdTable';
import Stats from './Stats/Stats';



const SystemService: FC = () => {
    return (
        <div className='SystemService'>
            <div className='SystemService-side'>
                <h1 className='SystemService-side_header'>Host info</h1>
                <Stats />
            </div>
            <div className='SystemService-side'>
                <h1 className='SystemService-side_header'>Systemd</h1>
                <SystemdTable />
            </div>
        </div>
    );
};

export default SystemService;