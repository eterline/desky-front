import { useFetchAPI } from '../../../hooks';
import { API, resolveApi } from '../../../libs/apiResolve';
import { ErrorMsg } from '../Functional';
import { SystemdService, SystemdUnitList } from '../../../libs/systemdService';
import './SystemService.css';
import { FC } from 'react';
import SystemUnit from './SystemUnit';

const SystemService: FC = () => {

    const { loading, error, data } = useFetchAPI<SystemdUnitList>(resolveApi(API.system.status));
    const api = new SystemdService()

    if (error) { return <ErrorMsg text={error} type="notice" /> }
    if (loading) { return <div>Loading...</div> }

    return (
        <div className='SystemService UsualService'>
            {
                Object.entries(data).map(([_, u]) => (
                    <SystemUnit unit={u} service={api}  />
            )) 
            }
        </div>
    );
};

export default SystemService;