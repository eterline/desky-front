import { useFetchAPI } from '../../../hooks';
import { resolveApi, API } from '../../../libs/apiResolve';
import { ErrorMsg } from '../Functional';
import AppsTopic from './AppsTopic';
import { FC } from "react";
import { AppAppend } from "../Functional";
import './AppService.css';
import LoadingContainer from '../Functional/LoadingContainer';

const AppService: FC = () => {
    const { loading, error, data } = useFetchAPI<Record<string, AppCardProps[]>>(resolveApi(API.apps.table));

    if (error) { return <ErrorMsg text={error} type="notice" /> }
    if (loading) { return <LoadingContainer/> }

    return (
        <div className="AppService UsualService">
            <AppAppend text='Add app'/>
                { 
                    Object.entries(data).map(([topicName, appList], i) => (
                        <AppsTopic key={i} topic={topicName} apps={appList}/>
                    )) 
                }
        </div>
    );
};

export default AppService;