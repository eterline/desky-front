import { FC, useState } from "react";
import './SystemdTable.css'
import { useFetchAPI } from "../../../hooks";
import { API, resolveApi } from "../../../libs/apiResolve";
import { SystemdService, SystemdUnitList } from "../../../libs/systemdService";
import { ErrorMsg, LoadingContainer } from '../Functional';
import SystemdCalc from "./SystemdCalc";
import SystemdUnit from "./SystemdUnit";



const SystemdTable: FC = () => {

    const [doRefetch, setDoRefetch] = useState<number>(0);
    const { loading, error, data } = useFetchAPI<SystemdUnitList>(resolveApi(API.system.status), doRefetch)
    const api = new SystemdService()


    const refetchUnits = () => {
        setDoRefetch(doRefetch+1)
    }


    if (error) { return (
        <div className="SystemdTable">
            <ErrorMsg text={error} type="notice" />
        </div>
    )}

    if (loading) { return (
        <div className="SystemdTable">
            <LoadingContainer/>
        </div>
    )}

    return (
        <div className="SystemdTable">
            <h1 className="SystemdTable-title">Systemd</h1>
            <SystemdCalc {...data} />
            <hr />
            <div className="SystemdTable-main">
                {
                    data.map(function(data, idx) {
                        return <SystemdUnit unit={data} api={api} refetchFunc={refetchUnits}  />
                    })
                }
            </div>
        </div>
    );
};

export default SystemdTable;