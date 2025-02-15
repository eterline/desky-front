// import { data } from "react-router-dom";
// import { API, resolveApi } from "./apiResolve";
// import FetchingService from "./fetchingService";
// import showToast from "./showToats";

// export type ExecStates = "start" | "stop" | "reboot" | "resume" | "suspend" | "shutdown"

// export interface PVEData {
//     session?:    number
//     host?:       string
//     vmid?:       number
// }

// export default class PveService {

//     protected session:  number;
//     protected host:     string;

//     constructor(data: PVEData) {
//             this.session = data.session;
//             this.host = data.host;
//     }

//     execCommand(vmid: number, cmd: ExecStates) {

//         const data = (): PVEData => {
//             return { 
//                 session: this.session ,
//                 host: this.host,
//                 vmid: vmid
//             };
//         }

//         const api = new FetchingService(resolveApi(API.pve.exec(data(), cmd)))

//         api.postInfo({})
//             .then(() => {
//                 if (api.getStatusCode() === 200) {
//                     showToast(`VMID: ${vmid}.\nExecuted: ${cmd}`)
//                 }
//             })
//             .catch((e) => showToast(e))
//     }
// }