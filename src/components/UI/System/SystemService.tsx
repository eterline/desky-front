import './SystemService.css';
import { FC } from 'react';
import StatsTable from './StatsTable';



const SystemService: FC = () => {
    return (
        <div className='SystemService'>
            <StatsTable />
        </div>
    );
};

export default SystemService;