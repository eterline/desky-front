import { API, resolveApi } from "./apiResolve";
import FetchingService from "./fetchingService"
import showToast from "./showToats";

export type SystemdCmd = "stop" | "start" | "restart";

export type SystemdUnitList = SystemdUnit[]

export interface SystemdUnit {
    unit_file:  string,
    state:      string,
    preset:     string,
}      

export class SystemdService {

    constructor() {}

    execUnit(unit: string, cmd: SystemdCmd) {

        const api = new FetchingService(resolveApi(''))

        api.postInfo({})
            .then(() => {
                if (api.getStatusCode() === 200) {
                    showToast(`Systemd Unit: '${unit}'.\nExecuted: ${cmd}`)
                }
            })
            .catch((e) => showToast(e))
    }
}