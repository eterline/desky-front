import { FC } from 'react';
import { ErrorMsg, LoadingContainer } from '../Functional';
import { useVESessionContext } from '../../../hooks/useVESessionContext';
import { useFetchAPI } from '../../../hooks';
import { API, resolveApi } from '../../../libs/apiResolve';
import { UiIcon } from '../Icons';

import './DisksList.css'
import DiskContainer from './DiskContainer';

export type DiskListResponse = DiskInfo[]

export interface DiskInfo {
    wwn:            string
    used:           string
    devpath:        string
    osdid:          number
    model:          string
    "osdid-list":   any
    serial:         string
    type:           string
    vendor:         string
    by_id_link:     string
    size:           number
    rpm:            number
    wearout:        number
    health:         string
    gpt:            number
}

const DisksList: FC = () => {

    const { session } = useVESessionContext();
    if (!session) return (
        <div className='DevicesList'>
            <LoadingContainer/>
        </div>
    )

    const {error, loading, data} = useFetchAPI<DiskListResponse>(
        resolveApi(API.pve.disks(session.session, session.node))
    )

    if (error) return (
        <div className='DisksList'>
            <ErrorMsg text={error} type="notice" />
        </div>
    )

    if (loading || data === null) return (
        <div className='DevicesList'>
            <LoadingContainer/>
        </div>
    )

    if (data) return (
        <div className='DisksList'>
            <h1 className='DisksList-title'>
                Disk List
            </h1>
            <div className='DisksList-main'>
            {
                Array.from(data).map((disk, idx) => (
                    <DiskContainer key={idx} {...disk} />
                ))
            }
            {
                Array.from(data).map((disk, idx) => (
                    <DiskContainer key={idx} {...disk} />
                ))
            }
            {
                Array.from(data).map((disk, idx) => (
                    <DiskContainer key={idx} {...disk} />
                ))
            }
            {
                Array.from(data).map((disk, idx) => (
                    <DiskContainer key={idx} {...disk} />
                ))
            }
            {
                Array.from(data).map((disk, idx) => (
                    <DiskContainer key={idx} {...disk} />
                ))
            }
            {
                Array.from(data).map((disk, idx) => (
                    <DiskContainer key={idx} {...disk} />
                ))
            }
            {
                Array.from(data).map((disk, idx) => (
                    <DiskContainer key={idx} {...disk} />
                ))
            }
            {
                Array.from(data).map((disk, idx) => (
                    <DiskContainer key={idx} {...disk} />
                ))
            }
            {
                Array.from(data).map((disk, idx) => (
                    <DiskContainer key={idx} {...disk} />
                ))
            }
            </div>
        </div>
    );
};

export default DisksList;