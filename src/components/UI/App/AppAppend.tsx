import { FC, useState } from 'react';
import { UiIcon } from '../Icons';
import './AppAppend.css';
import { ModalWindow } from '../Functional';
import { addApp } from '../../../lib/api/appsService';

interface AppAppendProps {
    icon?: string
    size?: string
    text?: string
}

const AppAppend: FC<AppAppendProps> = ({icon, size, text}) => {

    const [appTopic, setAppTopic] = useState<string>('');
    const [appName, setAppName] = useState<string>('');
    const [appDescription, setAppDescription] = useState<string>('');
    const [appLink, setAppLink] = useState<string>('');
    const [appIcon, setAppIcon] = useState<string>('');

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleReq = () => {
        if (appName === '') {return}
        addApp(appTopic, {
            name: appName,
            description: appDescription,
            link: appLink,
            icon: appIcon
        })
        // setTimeout(updateFunc, 1500)
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
                        <input minLength={6} placeholder="Serving" value={appTopic} onChange={(e) => setAppTopic(e.target.value)} />
                    </label>
                    <label>
                        App Name:           
                        <input minLength={3} placeholder="Docker" value={appName} onChange={(e) => setAppName(e.target.value)} />
                    </label>
                    <p>info</p>
                    <label>
                        Description:        
                        <input minLength={4} placeholder="Container engine" value={appDescription} onChange={(e) => setAppDescription(e.target.value)} />
                    </label>
                    <label>
                        Link:               
                        <input placeholder="http://docker.lan" value={appLink} onChange={(e) => setAppLink(e.target.value)} />
                    </label>
                    <label>
                        Icon (Name/URL):    
                        <input minLength={2} placeholder="docker" value={appIcon} onChange={(e) => setAppIcon(e.target.value)} />
                    </label>
                </div>}
            />
        </div>
    );
};

export default AppAppend;