import './SystemService.css';
import { FC } from 'react';
import Stats from './Stats';
import SystemdTable from './SystemdTable';



const SystemService: FC = () => {
    return (
        <div className='SystemService'>
            <Stats />
            <SystemdTable />
        </div>
    );
};

export default SystemService;