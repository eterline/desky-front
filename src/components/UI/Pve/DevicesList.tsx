import { FC, useState, useCallback, useEffect } from 'react';
import './DevicesList.css';
import DeviceContainer from './DeviceContainer';
import { DeviceParams } from './DeviceContainer';
import { useFetchAPI } from '../../../hooks';
import { resolveApi, API } from '../../../libs/apiResolve';
import { ErrorMsg, SwitchButton } from '../Functional';
import FetchingService from '../../../libs/fetchingService';
import LoadingContainer from '../Functional/LoadingContainer';

interface ErrResponse {
    code: string
    message: string
}

interface DevicesListProps {
    session:    number
    host:       string
}

interface DevicesResponse {
    qemu:   DeviceParams[]
    lxc:    DeviceParams[]
}

const DevicesList: FC<DevicesListProps> = ({session, host}) => {

    const [data, setData] = useState<DevicesResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const Fetcher = new FetchingService(resolveApi(API.pve.devices(session, host)), false);

    const fetchData = useCallback(() => {
    
            Fetcher.fetchInfo()
            .then(() => {
                const result = Fetcher.getAllData<DevicesResponse>();
                setData(result)
            })
            .catch((err) => {
                const errorResponse = Fetcher.getAllData<ErrResponse>();
                setError(errorResponse?.message || err.message || 'Unknown error');
                setData(null);
            })
            setLoading(false);

    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (error) { return <ErrorMsg text={error} type="notice" /> }
    if (loading || data === null) { return <LoadingContainer/> }

    const { qemu, lxc } = data

    return (
        <div className='DevicesList'>

            <details className='DevicesList-details' open> <summary>QEMU</summary>
                {
                    qemu.map((device, idx) => (
                        <DeviceContainer key={idx} dev={device} type="qemu" host={host} session={session} updateFunc={fetchData} />
                    ))
                    .sort((a, b) => {
                        return a.props.dev.name.localeCompare(b.props.dev.name);
                    })
                }
            </details>

            <details className='DevicesList-details' open> <summary>LXC</summary>
            {
                    lxc.map((device, idx) => (
                        <DeviceContainer key={idx} dev={device} type="lxc" host={host} session={session} updateFunc={fetchData} />
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