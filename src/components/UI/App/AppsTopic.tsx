import { FC } from "react";
import AppCard from "./AppCard";
import "./AppsTopic.css";
import { stringCutter } from "../../../lib/utils";
import { UiIcon } from "../Icons";
import { DeskyAppCard } from "../../../lib/api/appsService";

interface AppsTopicProps {
    topic:  string;
    apps:   DeskyAppCard[];
}

const AppsTopic: FC<AppsTopicProps> = ({topic, apps}) => {
    return (
        <div className="AppsTopic">
            <h1>
                <span>
                    <UiIcon name="stack-2" size="25"/>
                    {stringCutter(topic, 35)}
                </span>
            </h1>
            <div className="AppsTopicRow">
                { apps.map((app, i) => <AppCard key={i} {...app} />) }
            </div>
        </div>
    );
};

export default AppsTopic;