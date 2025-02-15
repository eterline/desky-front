import './SystemService.css';
import { FC } from 'react';
import SystemdTable from './SystemdTable';



const SystemService: FC = () => {
    return (
        <div className='SystemService UsualService'>
            {/* <Stats /> */}
            <SystemdTable />
        </div>
    );
};

export default SystemService;