import "./AppCard.css";
import { FC } from "react";
import { AppIcon, AppIconURL } from "../Icons";
import { urlValidate, stringCutter, linkWindowHandle } from "../../../lib/utils";
import AppCardModal from "./AppCardModal";
import { DeskyAppCard } from "../../../lib/api/appsService";

const AppCard: FC<DeskyAppCard> = (app: DeskyAppCard) => {

    const {ok, text} = urlValidate(app.icon)

    const Icon = ok ? <AppIconURL url={text}/> : <AppIcon name={text}/>;

    return (
        <div className="AppCard" onClick={linkWindowHandle(app.link)}>


            <div onClick={(e) => e.stopPropagation()}>
                <AppCardModal {...app} />
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