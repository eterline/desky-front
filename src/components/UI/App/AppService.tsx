import { useFetchAPI } from '../../../hooks';
import { resolveApi, API } from '../../../libs/apiResolve';
import AppsTopic from './AppsTopic';
import { FC, useState } from "react";
import AppAppend  from "./AppAppend";
import './AppService.css';
import { ErrorMsg, LoadingContainer } from '../Functional';

const AppService: FC = () => {
    const [refetch, setrefetch] = useState<number>(0);
    const { loading, error, data } = useFetchAPI<Record<string, AppCardInfo[]>>(resolveApi(API.apps.table), refetch);

    const refetchFunc = () => setrefetch(refetch+1)

    if (error) { return <ErrorMsg text={error} type="notice" /> }
    if (loading) { return <LoadingContainer/> }

    return (
        <div className="AppService UsualService">
            <AppAppend text='Add app' updateFunc={refetchFunc}/>
                { 
                    Object.entries(data).map(([topicName, appList], i) => (
                        <AppsTopic updateFunc={refetchFunc} key={i} topic={topicName} apps={appList}/>
                    )) 
                }
        </div>
    );
};

export default AppService;