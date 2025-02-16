import { FC, useState } from 'react';
import './AppCardModal.css';
import { ModalWindow } from '../Functional';
import { AppIcon, UiIcon } from '../Icons';
import { deleteAppByID, DeskyAppCard } from '../../../lib/api/appsService';

const AppCardModal: FC<DeskyAppCard> = (app: DeskyAppCard) => {

    const [show, setShow] = useState<boolean>(false);

    console.log(app.id)

    const openModal = () => {setShow(true)}
    const closeModal = () => { setTimeout(() => setShow(false), 50)}
    const deleteHandle = () => {deleteAppByID(app.id)}

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