import FetchingService from "../../../../../libs/fetchingService";
import { API, resolveApi } from "../../../../../libs/apiResolve";
import { AppCard, CardProps } from "./appCard";
import { useEffect, useState } from "react";
import { ErrorMessage } from "../../Dialog/errorMessage";

import "./appsField.css"



class ApplicationsService extends FetchingService {
    constructor(api: string, debug: boolean = false) {
        super(api, debug);
    }

    getApps() {
        return this.fetchedData;
    }
}

interface AppsTopicProps {
    topic:  string;
    apps:   CardProps[];
}

const AppsTopic = (props: AppsTopicProps) => {

    const list = props.apps.map(
        (app) => (
            <AppCard 
                name={app.name} 
                icon={app.icon} 
                link={app.link} 
                description={app.description}
            />
        )
    );

    return (
        <div className="AppsTopic" style={{width: '100%'}}>
            <h1>{props.topic}</h1>
            <div className="AppsTopicRow">
                {list}
            </div>
        </div>
    );
};


interface ComponentStatus {
    err?:      string | null;
    loading:   boolean;
}


export const AppsField = () => {
    const [cardsData, setCardsData] = useState([]);
    const [status, setStatus] = useState<ComponentStatus>({loading: true});

    const Apps = new ApplicationsService("apps.json");

    useEffect(() => {

        Apps.fetchInfo()
        .then(() => {
            setCardsData(Apps.getApps());
        })

        .catch((err) => {
            setStatus({err: err.message, loading: false})
        });

        setStatus({loading: false});

    }, []);

    if (status.err) { return <ErrorMessage text={status.err} type="notice" /> }
    if (status.loading) { return <div>Loading...</div> }

    return (
        <div className="AppsField">
            <div id="AppsField-title">
                {'ss'}
            </div>
            <div id="AppsField-apps">
                { cardsData.map((data) => (<AppsTopic topic={data.topic} apps={data.apps}/>)) }
            </div>
        </div>
    );
};