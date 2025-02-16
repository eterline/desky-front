import useFetchService from "../../../../hooks/useFetchService";
import { fetchStats } from "../../../../lib/api/systemService";
import { SecToHHMMSS } from "../../../../lib/utils";
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

    const { error, loading, data } = useFetchService(fetchStats)

    if (!error && !loading && data) {
        parameters.set("Procs", data?.procs.toString() ?? 'unknown')
        parameters.set("Uptime", SecToHHMMSS(data?.uptime ?? 0))
        parameters.set("Virt", data?.virt ?? 'unknown')
    }

    return (
        <>
        <TableLoad
                titleName={data?.hostname ?? 'hostname'}
                titleUpper={true}
                params={parameters}
                disableBar={true}
                centText
            />
        </>
    );
};

export default InfoTable;