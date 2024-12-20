import { useEffect, useState } from "react";
import { ErrorMessage } from "./UI/Dialog/errorMessage";
import { ParameterBar } from "./UI/ProgressBars/parameterBar";
import { LoadBar } from "./UI/ProgressBars/loadBar";

import FetchingService from "../../libs/fetchingService";
import "./hostInfoField.css"


interface SystemInfo {
    system:     string;
    hostname:   string;
    uptime:     number;

    kernel:     string
    arch:       string
}

class SystemInfoService extends FetchingService {
    constructor(api: string, debug: boolean = false) {
        super(api, debug);
    }

    getHostInfo(): SystemInfo {
        return this.fetchedData;
    }
}

export const HostInfoField = () => {
    const [hostData, setHostData] = useState<SystemInfo>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const System = new SystemInfoService("");

    useEffect(() => {

        System.fetchInfo()
        .then(() => {
            setHostData(System.getHostInfo());
            setIsLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setIsLoading(false);
        });

    }, []);
    return (
        <div className="HostInfoField text-4xl">
            {
                // isLoading ? (<div>Loading...</div>) : 
                // error ? (<ErrorMessage text={error} type="warning" />) : 
            }
            <div id="HostInfoField-load">
                < LoadBar loadType="load-1" upperValue={6} actualValue={1}/>
                < LoadBar loadType="load-5" upperValue={6} actualValue={2}/>
                < LoadBar loadType="load-15" upperValue={6} actualValue={3}/>
            </div>
            <hr />
            <div id="HostInfoField-param">
                < ParameterBar icon="cpu-64" upperValue={100} actualValue={80} prefix="%" />
                < ParameterBar icon="ram" upperValue={32} actualValue={8} prefix="GB" />
                < ParameterBar icon="hdd" upperValue={512} actualValue={132} prefix="GB" />
            </div>
        </div>
    );
};