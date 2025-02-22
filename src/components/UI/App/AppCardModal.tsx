import { FC, useState } from 'react';
import './AppCardModal.css';
import { AppIcon, UiIcon } from '../Icons';
import { deleteAppByID, DeskyAppCard } from '../../../lib/api/appsService';
import openModal from '../Functional/openModal';

const AppCardModal: FC<DeskyAppCard> = (app: DeskyAppCard) => {

    const [show, setShow] = useState<boolean>(false);
    const deleteHandle = () => {deleteAppByID(app.id)}


    return (
        <div 
            className="AppCardModal" 
            onClick={() => openModal(
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
                </div>, () => setShow(false)
            )}>
            <UiIcon name="receipt" invert={true} />
        </div>
    );
};

export default AppCardModal;