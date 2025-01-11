import "./AppCard.css";
import { FC } from "react";
import { AppIcon, AppIconURL } from "../Icons";
import { urlValidate, stringCutter, linkWindowHandle } from "../../../libs/Utils";
import AppCardModal from "./AppCardModal";
import AppService from "../../../libs/appService";

interface AppCardProps {
    app:    AppCardInfo
    topic:  string
    query:  number
    updateFunc?: () => void
}

const AppCard: FC<AppCardProps> = ({app, topic, query, updateFunc}) => {

    const Icon = urlValidate(app.icon) ? <AppIconURL url={app.icon}/> : <AppIcon name={app.icon}/>;
    const API = new AppService()

    return (
        <div className="AppCard" onClick={linkWindowHandle(app.link)}>


            <div onClick={(e) => e.stopPropagation()}>
                <AppCardModal update={updateFunc} app={app} topic={topic} query={query} api={API} />
            </div>

            <div className="AppCard-icon">
                {Icon}
            </div>
            <div className="AppCard-name">
                { stringCutter(app.name, 8) }
            </div>

        </div>
    );
};

export default AppCard;