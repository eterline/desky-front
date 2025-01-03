import FetchingService from "../../../../../libs/fetchingService";
import { API, resolveApi } from "../../../../../libs/apiResolve";
import { AppCard } from "./appCard";
import { useEffect, useState } from "react";
import { ErrorMessage } from "../../Dialog/errorMessage";
import { useFetchAPI } from "../../../../../hooks/useFetchAPI";

import "./appsField.css"

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
        <div className="AppsTopic UPonDisplay">
            <h1>{props.topic}</h1>
            <div className="AppsTopicRow">
                {list}
            </div>
        </div>
    );
};


export const AppsField = () => {
    const { loading, error, data } = useFetchAPI<Record<string, AppCardProps[]>>(resolveApi(API.apps.table));

    if (error) { return <ErrorMessage text={error} type="notice" /> }
    if (loading) { return <div>Loading...</div> }

    return (
        <div className="AppsField">
            <div className="AppsField-apps ServiceCase">
                { 
                    Object.entries(data).map(([topicName, appList]) => (
                        <AppsTopic topic={topicName} apps={appList}/>
                    )) 
                }
            </div>
        </div>
    );
};