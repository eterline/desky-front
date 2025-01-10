import { useFetchAPI } from '../../../hooks';
import { resolveApi, API } from '../../../libs/apiResolve';
import AppsTopic from './AppsTopic';
import { FC, useState } from "react";
import AppAppend  from "./AppAppend";
import './AppService.css';
import { ErrorMsg, LoadingContainer } from '../Functional';

const AppService: FC = () => {
    const [refetch, setrefetch] = useState<number>(0);
    const { loading, error, data } = useFetchAPI<Record<string, AppCardProps[]>>(resolveApi(API.apps.table), refetch);

    if (error) { return <ErrorMsg text={error} type="notice" /> }
    if (loading) { return <LoadingContainer/> }

    return (
        <div className="AppService UsualService">
            <AppAppend text='Add app' updateFunc={() => setrefetch(refetch+1)}/>
                { 
                    Object.entries(data).map(([topicName, appList], i) => (
                        <AppsTopic key={i} topic={topicName} apps={appList}/>
                    )) 
                }
        </div>
    );
};

export default AppService;