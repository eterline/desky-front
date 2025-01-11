import { FC } from "react";
import AppCard from "./AppCard";
import "./AppsTopic.css";

interface AppsTopicProps {
    topic:  string;
    apps:   AppCardInfo[];
    updateFunc: () => void
}

const AppsTopic: FC<AppsTopicProps> = ({topic, apps, updateFunc}) => {

    const AppMap = apps.map((cardProps, i) => (
        <AppCard key={i} topic={topic} query={i}  app={cardProps} updateFunc={updateFunc} />
    ));

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