import AppsTopic from './AppsTopic';
import { FC } from "react";
import './AppService.css';
import { ErrorMsg, LoadingContainer } from '../Functional';
import useFetchService from '../../../hooks/useFetchService';
import { fetchTable } from '../../../lib/api/appsService';
import AppAppend from './AppAppend';

const AppService: FC = () => {

    const { loading, error, data } = useFetchService(fetchTable)

    if (error) { return <ErrorMsg text={error} type="notice" /> }
    if (loading) { return <LoadingContainer/> }

    return (
        <div className="AppService">
                { 
                    Object.entries(data).map(([topicName, appList], i) => (
                        <AppsTopic key={i} topic={topicName} apps={appList}/>
                    )) 
                }

                <AppAppend />
        </div>
    );
};

export default AppService;