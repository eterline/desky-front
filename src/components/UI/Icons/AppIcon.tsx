import { AppsIcons } from "../../../assets";
import { FC } from 'react';

interface AppIconProps {
    name: string;
    size?: string
}

const AppIcon: FC<AppIconProps> = ({name, size}) => {

    const IconSrc = AppsIcons[name] ?? AppsIcons["default-app"];
    const targetSize = size ?? '100%'

    return (<div style={{width: targetSize, height: targetSize}} className="mx-auto">
        <img
            src={IconSrc} alt={name}
            style={{width: '100%', height: '100%'}} 
        />
    </div>)
};

export default AppIcon;