import { FC, useState, useCallback, useEffect } from 'react';
import './DevicesList.css';
import DeviceContainer from './DeviceContainer';
import { DeviceParams } from './DeviceContainer';
import { useFetchAPI } from '../../../hooks';
import { resolveApi, API } from '../../../libs/apiResolve';
import { ErrorMsg, SwitchButton } from '../Functional';
import FetchingService from '../../../libs/fetchingService';
import LoadingContainer from '../Functional/LoadingContainer';
import { useVESessionContext } from '../../../hooks/useVESessionContext';

interface ErrResponse {
    code: string
    message: string
}

interface DevicesListProps {
    ss?:    number
    node?:       string
}

interface DevicesResponse {
    qemu:   DeviceParams[]
    lxc:    DeviceParams[]
}

const DevicesList: FC<DevicesListProps> = ({ss, node}) => {

    const { session } = useVESessionContext();
    if (!session) return (
        <div className='DevicesList'>
            <LoadingContainer/>
        </div>
    )

    const [ refetch, setRefetch ] = useState<number>(0);
    const {error, loading, data} = useFetchAPI<DevicesResponse>(
        resolveApi(API.pve.devices(session.session, session.node)), refetch
    )

    const fetchData = () => {setRefetch(refetch+1)};


    if (error) { return <ErrorMsg text={error} type="notice" /> }
    if (loading || data === null) { return <LoadingContainer/> }

    const { qemu, lxc } = data

    return (
        <div className='DevicesList'>

            <details className='DevicesList-details' open> <summary>QEMU</summary>
                {
                    qemu.map((device, idx) => (
                        <DeviceContainer 
                            key={idx} dev={device} 
                            type="qemu" 
                            host={session.node} session={session.session} 
                            updateFunc={fetchData} 
                        />
                    ))
                    .sort((a, b) => {
                        return a.props.dev.name.localeCompare(b.props.dev.name);
                    })
                }
            </details>

            <details className='DevicesList-details' open> <summary>LXC</summary>
            {
                    lxc.map((device, idx) => (
                        <DeviceContainer 
                            key={idx} dev={device} 
                            type="lxc" 
                            host={session.node} session={session.session} 
                            updateFunc={fetchData} 
                        />
                    ))
                    .sort((a, b) => {
                        return a.props.dev.name.localeCompare(b.props.dev.name);
                    })
                }
            </details>
        </div>
    );
};

export default DevicesList;