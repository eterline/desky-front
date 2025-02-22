import AppsTopic from './AppsTopic';
import { FC, useState } from "react";
import './AppService.css';
import { ErrorMsg, LoadingContainer } from '../Functional';
import useFetchService from '../../../hooks/useFetchService';
import { fetchTable } from '../../../lib/api/appsService';
import AppAppend from './AppAppend';
import { UiIcon } from '../Icons';
import { createPortal } from 'react-dom';
import openModal from '../Functional/openModal';

const AppService: FC = () => {

    const { loading, error, data } = useFetchService(fetchTable)
    const [ modalOpened, setModalOpened ] = useState<boolean>(false);

    if (error) { return <ErrorMsg text={error} type="notice" /> }
    if (loading) { return <LoadingContainer/> }

    return (
        <div className="AppService">
                { 
                    Object.entries(data).map(([topicName, appList], i) => (
                        <AppsTopic key={i} topic={topicName} apps={appList}/>
                    )) 
                }
                <div 
                    className='AppService-append' 
                    onClick={() => {
                        openModal(
                            <AppAppend onClose={() => setModalOpened(false)}/>,
                            () => setModalOpened(false)
                        )
                    }}>
                    <UiIcon name= {'apps'} size= {'3rem'} />
                    <p className='AppService-append_text'>Append App</p>
                </div>
        </div>
    );
};

export default AppService;