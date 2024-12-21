import "./appCard.css";
import { AppIcon } from "./appIcon";

export const AppCard = (props: AppCardProps) => {
    
    return (
        <div className="AppCard UPonDisplay">

            <div className="AppCard-icon">
                <AppIcon name={props.icon}/>
            </div>

            <div className="AppCard-name UPonDisplay">
                {props.name}
            </div>

        </div>
    );
};