import { useFetchAPI } from "../../../../hooks";
import { API, resolveApi } from "../../../../libs/apiResolve";
import { SecToHHMMSSString } from "../../../../libs/Utils";
import TableLoad from "./TableLoad";

export interface SystemInfoResponse {
    hostname: string
    uptime: number
    os: string
    procs: number
    virt: string
    addrs: string[]
}

const InfoTable = () => {

    const parameters = new Map<string, string>

    const { error, loading, data } = useFetchAPI<SystemInfoResponse>(
        resolveApi(API.system.info)
    );

    if (!error && !loading && data) {
        parameters.set("Procs", data?.procs.toString() ?? 'unknown')
        parameters.set("Uptime", SecToHHMMSSString(data?.uptime ?? 0))
        parameters.set("Virt", data?.virt ?? 'unknown')
    }

    return (
        <>
        <TableLoad
                titleName={data?.hostname ?? 'hostname'}
                titleUpper={true}
                params={parameters}
                disableBar={true}
            />
        </>
    );
};

export default InfoTable;