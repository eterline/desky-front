import { useFetchAPI } from '../../../hooks';
import { resolveApi, API } from '../../../libs/apiResolve';
import { ErrorMsg } from '../Functional';
import AppsTopic from './AppsTopic';
import { FC } from "react";
import { AppAppend } from "../Functional";
import './AppService.css';

const AppService: FC = () => {
    const { loading, error, data } = useFetchAPI<Record<string, AppCardProps[]>>(resolveApi(API.apps.table));

    if (error) { return <ErrorMsg text={error} type="notice" /> }
    if (loading) { return <div>Loading...</div> }

    return (
        <div className="AppService UsualService">
            <AppAppend text='Add app'/>
                { 
                    Object.entries(data).map(([topicName, appList]) => (
                        <AppsTopic topic={topicName} apps={appList}/>
                    )) 
                }
        </div>
    );
};

export default AppService;