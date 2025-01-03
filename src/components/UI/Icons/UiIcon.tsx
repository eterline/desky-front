import { UiIcons } from "../../../assets";
import { FC } from 'react';

interface AppIconProps {
    name: string;
    size?: string
}

const AppIcon: FC<AppIconProps> = ({name, size}) => {

    const IconSrc = UiIcons[name] ?? UiIcons["alert-circle"];
    const targetSize = size ?? '2rem'

    return (<img
        src={IconSrc} alt={name}
        style={{width: targetSize, height: targetSize}} 
    />)
};

export default AppIcon;