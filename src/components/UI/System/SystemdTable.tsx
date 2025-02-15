import { FC } from "react";
import './SystemdTable.css'
import { ErrorMsg, LoadingContainer } from '../Functional';
import SystemdTableHead from "./SystemdTableHead";
import SystemdUnit from "./SystemdUnit";
import useFetchService from "../../../hooks/useFetchService";
import { fetchSystemdUnits } from "../../../lib/api/systemService";



const SystemdTable: FC = () => {

    const { loading, error, data } = useFetchService(fetchSystemdUnits)


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
            <h1 className="SystemdTable-title">Systemd Units</h1>
            <SystemdTableHead {...data} />
            <hr />
            <div className="SystemdTable-main">
                {data.map((data, idx) => (<SystemdUnit {...data} key={idx} />))}
            </div>
        </div>
    );
};

export default SystemdTable;