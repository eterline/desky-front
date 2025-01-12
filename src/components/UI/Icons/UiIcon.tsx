import { UiIcons } from "../../../assets";
import { FC } from 'react';
import { NumberRange } from "../../../types/libs/utils";

interface AppIconProps {
    name:       string;
    size?:      string

    invert?:    boolean
}

const UiIcon: FC<AppIconProps> = ({name, size, invert}) => {

    const IconSrc = UiIcons[name] ?? UiIcons["alert-circle"];
    const targetSize = size ?? '2rem'

    return (<img className="UiIcon"
        src={IconSrc} 
        alt={name}
        style={{
            width: targetSize,
            height: targetSize,
            filter: `invert(${invert ? '1' : 'none'})`,
        }} 
    />)
};

export default UiIcon;