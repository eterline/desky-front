import { FC, useState } from "react";
import './AddApp.css'
import AppService from "../../../libs/appService";

interface AddAppProps {
    closeFunc: () => void
    updateFunc: () => void
}

const TimeoutDelay = 500

const AddApp: FC<AddAppProps> = ({updateFunc, closeFunc}) => {

    const [appTopic, setAppTopic] = useState<string>('');
    const [appName, setAppName] = useState<string>('');
    const [appDescription, setAppDescription] = useState<string>('');
    const [appLink, setAppLink] = useState<string>('');
    const [appIcon, setAppIcon] = useState<string>('');

    const api = new AppService()

    const closeWindow = (time: number) => {
        setTimeout(closeFunc, time);
    }

    const handleClick = () => {

        if (appName === '') {}

        api.add(appTopic, {
            name: appName,
            description: appDescription,
            link: appLink,
            icon: appIcon
        })

        closeWindow(TimeoutDelay);
        setTimeout(updateFunc, TimeoutDelay * 3);
    }

    return (
        <div className="AddApp">
            <div className="AddApp-title">
                <h1>Add App</h1>
                <div onClick={() => closeWindow(100)} className="AddApp-btn_close">
                    Close
                </div>
            </div>

            <hr/>

            <label>
                Topic:           
                <input placeholder="Serving" value={appTopic} onChange={(e) => setAppTopic(e.target.value)} />
            </label>
            <label>
                App Name:           
                <input placeholder="Docker" value={appName} onChange={(e) => setAppName(e.target.value)} />
            </label>
            <hr/>
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
            <div onClick={handleClick} className="AddApp-btn">
                ADD
            </div>
        </div>
    );
};

export default AddApp;