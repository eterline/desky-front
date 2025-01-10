import { FC, useState } from 'react';
import { UiIcon } from '../Icons';
import './AppAppend.css';
import Modal from 'react-modal';
import { ModalWindow } from '../Functional';
import AppService from '../../../libs/appService';

interface AppAppendProps {
    icon?: string
    size?: string
    text?: string
    updateFunc: () => void
}

const AppAppend: FC<AppAppendProps> = ({icon, size, text, updateFunc}) => {

    const [appTopic, setAppTopic] = useState<string>('');
    const [appName, setAppName] = useState<string>('');
    const [appDescription, setAppDescription] = useState<string>('');
    const [appLink, setAppLink] = useState<string>('');
    const [appIcon, setAppIcon] = useState<string>('');

    const api = new AppService()

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleReq = () => {
        if (appName === '') {return}
        api.add(appTopic, {
            name: appName,
            description: appDescription,
            link: appLink,
            icon: appIcon
        })

        setTimeout(updateFunc, 1500)
    }

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setTimeout(() => {setModalIsOpen(false)}, 50)
    };

    return (
        <div className='AppAppend' onClick={openModal}>
            <div className='AppAppend_inner'>
                <UiIcon name= {icon ?? 'apps'} size= {size ?? '3rem'} />
            </div>
            <div className='AppAppend_text'>{text ?? 'Append App'}</div>

            <ModalWindow 
                opened={modalIsOpen}
                eventClose={closeModal}
                closerFunc={closeModal}
                doFunc={handleReq}
                title='Append App'
                buttonText='ADD APP'
                innerContent={
                <div className="AppAppend-main">
                    <p>main</p>
                    <label>
                        Topic:           
                        <input placeholder="Serving" value={appTopic} onChange={(e) => setAppTopic(e.target.value)} />
                    </label>
                    <label>
                        App Name:           
                        <input placeholder="Docker" value={appName} onChange={(e) => setAppName(e.target.value)} />
                    </label>
                    <p>info</p>
                    <label>
                        Description:        
                        <input placeholder="Container engine" value={appDescription} onChange={(e) => setAppDescription(e.target.value)} />
                    </label>
                    <label>
                        Link:               
                        <input placeholder="http://docker.lan" value={appLink} onChange={(e) => setAppLink(e.target.value)} />
                    </label>
                    <label>
                        Icon (Name/URL):    
                        <input placeholder="docker" value={appIcon} onChange={(e) => setAppIcon(e.target.value)} />
                    </label>
                </div>}
            />
        </div>
    );
};

export default AppAppend;