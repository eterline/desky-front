import { IconMapApps } from "../../../assets";
import { FC } from 'react';

interface AppIconProps {
    name: string;
    size?: string
}

export const AppIcon: FC<AppIconProps> = ({name, size}) => {

    const IconSrc = IconMapApps[name] ?? IconMapApps["default-app"];
    const targetSize = size ?? '100%'

    return (<div style={{width: targetSize, height: targetSize}} className="AppIcon">
        <img
            src={IconSrc} alt={name}
            style={{width: '100%', height: '100%'}} 
        />
    </div>)
};

interface AppIconURLProps {
    url: string;
    size?: string
}

export const AppIconURL: FC<AppIconURLProps> = ({url, size}) => {

    const targetSize = size ?? '100%'

    return (<div style={{width: targetSize, height: targetSize}}>
        <img
            src={url} 
            alt="icon from URL"
            style={{width: '100%', height: '100%'}} 
        />
    </div>)
};