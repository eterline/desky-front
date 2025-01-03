import { FC } from "react";
import AppCard from "./AppCard";
import "./AppsTopic.css";

interface AppsTopicProps {
    topic:  string;
    apps:   AppCardProps[];
}

const AppsTopic: FC<AppsTopicProps> = ({topic, apps}) => {

    const AppMap = apps.map((cardProps) => (<AppCard {...cardProps}/>));

    return (
        <div className="AppsTopic">
            <h1>{topic}</h1>
            <div className="AppsTopicRow">
                { AppMap }
            </div>
        </div>
    );
};

export default AppsTopic;