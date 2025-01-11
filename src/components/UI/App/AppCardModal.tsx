import { FC, useState } from 'react';
import './AppCardModal.css';
import { ModalWindow } from '../Functional';
import { AppIcon, UiIcon } from '../Icons';
import AppService from '../../../libs/appService';

interface AppCardModalProps {
    app:    AppCardInfo
    topic:  string
    query:  number
    update: () => void
    api:    AppService
}

const AppCardModal: FC<AppCardModalProps> = ({app, topic, query, api, update}) => {

    const [show, setShow] = useState<boolean>(false);

    const openModal = () => {setShow(true)}
    const closeModal = () => { setTimeout(() => setShow(false), 50)}

    const deleteHandle = () => {
        api.delete(topic, query);

        setTimeout( () => closeModal(), 500);
        setTimeout( () => update(), 2000);
    }

    return (
        <div className="AppCardModal" onClick={openModal}>
            <UiIcon name="receipt" invert={true} />
            {
                show ? (<ModalWindow
                opened={true}
                closerFunc={closeModal}
                eventClose={closeModal}

                title={`Info:${app.name}`}
                paddingHide={true}
                innerContent={
                    <div className='AppCardModal-main'>
                        <div className='AppCardModal-main-icon'>
                            <AppIcon name={app.icon}/>
                        </div>

                        <h1>Description</h1>
                        <p>{app.description}</p>
                        <hr />
                        <strong>link:</strong><a href={app.link}>{app.link}</a>

                        <hr />

                        <div onClick={deleteHandle} className='AppCardModal-main-del'>
                            <UiIcon name='trash'/>
                        </div>
                    </div>
                }
                />) : ''
            }
        </div>
    );
};

export default AppCardModal;