import "./AppCard.css";
import { FC } from "react";
import { AppIcon, AppIconURL } from "../Icons";
import { urlValidate, stringCutter, linkWindowHandle } from "../../../libs/Utils";

const AppCard: FC<AppCardProps> = ({name, link, icon, description}) => {

    const Icon = urlValidate(icon) ? <AppIconURL url={icon}/> : <AppIcon name={icon}/>; 

    return (
        <div className="AppCard" onClick={linkWindowHandle(link)}>

            <div className="AppCard-icon">
                {Icon}
            </div>

            <div className="AppCard-name">
                { stringCutter(name, 8) }
            </div>

        </div>
    );
};

export default AppCard;