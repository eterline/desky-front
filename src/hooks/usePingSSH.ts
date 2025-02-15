import useFetchService from "./useFetchService";
import { pingSSHhostList, SSHhostPing } from "../lib/api/sshService";

const usePingSSH = () => {

    const pingMap = new Map<number, SSHhostPing>()  
    const {error, loading, data} = useFetchService(pingSSHhostList)

    if (!error && !loading && data) {
        data.map((host) => pingMap.set(host.id, host))
    }

    return pingMap
}

export default usePingSSH;