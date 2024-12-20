import "./appCard.css";
import { AppIcon } from "./appIcon";

export interface CardProps {
    name:           string;
    link:           string;
    icon:           string;
    description:    string;
}

export const AppCard = (props: CardProps) => {
    
    return (
        <div className="AppCard">

            <div className="AppCard-icon">
                <AppIcon name={props.icon}/>
            </div>

            <div className="AppCard-name">
                {props.name}
            </div>

        </div>
    );
};