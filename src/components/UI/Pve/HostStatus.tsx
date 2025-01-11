import { FC, ReactNode } from 'react';
import { useFetchAPI } from '../../../hooks';
import { resolveApi, API } from '../../../libs/apiResolve';
import { PveStatus } from '.';
import { SecToHHMMSSString } from '../../../libs/Utils';
import HostStatusInfoBlock from './HostStatusInfoBlock';
import { UiIcon } from "../Icons";

import './HostStatus.css';
import { ErrorMsg } from '../Functional';
import LoadingContainer from '../Functional/LoadingContainer';
import { useVESessionContext } from '../../../hooks/useVESessionContext';

interface NodeStatusProps {
    ss?:    number
    node?:       string
}

const NodeStatus: FC<NodeStatusProps> = ({ss, node}) => {

    const renderComponent = (child: React.ReactNode) => (
        <div className='HostStatus'>{child}</div>
    );

    const { session } = useVESessionContext();
    if (!session) return (renderComponent(<LoadingContainer/>))

    const { loading, error, data } = useFetchAPI<PveStatus>(resolveApi(API.pve.status(session.session, session.node)));

    if (error) return (renderComponent(<ErrorMsg text={error} type='warn'/>))
    if (loading) return (renderComponent(<LoadingContainer/>))

    const { name, load, cpu, uptime, kernel } = data

    return (renderComponent(<div className='HostStatus-info_block-pad'>

        <HostStatusInfoBlock
            header='System'
            child={new Map([
                ["Host",        name],
                ["Uptime",      SecToHHMMSSString(uptime)],
                ["Kernel",      kernel],
            ])
        }/>
        <HostStatusInfoBlock
            header='CPU'
            child={new Map([
                ["Model",       cpu.model],
                ["Cores",       cpu.cores.toString()],
                ["Freq",        cpu.frequency + " MHZ"],
            ])
        }/>
        {/* <HostStatusInfoBlock
            header='RAM'
            child={new Map([
                ["Total",       ram.total.toString()],
                ["Used",        ram.used.toString()],
            ])
        }/> */}
        <HostStatusInfoBlock
            header='LOAD'
            child={new Map([
                ["load-5",      load[0]],
                ["load-10",     load[1]],
                ["load-15",     load[2]],
            ])
        }/>
        {/* <HostStatusInfoBlock
            header='File System'
            child={new Map([
                ["Total",       fs.total.toString()],
                ["Used",        fs.used.toString()],
            ])
        }/> */}
    </div>));
};

export default NodeStatus;