import AppsIcons from "../../../../assets/apps";
import { ErrorMessage } from "../../Dialog/errorMessage";

interface AppIconProps {
    name: string;
}

export const AppIcon = (props: AppIconProps) => {

    const IconSrc = AppsIcons[props.name] ?? AppsIcons["default-app"];

    return IconSrc ? (
        <img className="AppIcon" src={IconSrc} alt={props.name} style={{width: '100%'}} />
    ) : (
        <ErrorMessage text={"Icon not found"} type="notice" />
    );
};