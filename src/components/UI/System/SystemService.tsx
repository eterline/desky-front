import './SystemService.css';
import { FC } from 'react';
import StatsTable from './StatsTable';
import SystemdTable from './SystemdTable';



const SystemService: FC = () => {
    return (
        <div className='SystemService'>
            <StatsTable />
            <SystemdTable />
        </div>
    );
};

export default SystemService;