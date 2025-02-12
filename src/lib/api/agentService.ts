import axios from "axios";
import { APIResponse, joinApiRoute } from "./apiBaseService";

// ===========================================================================

const base = "agent"

// ===========================================================================

export interface DeskyMonitorAgent {
    hostname:      string
    id:            string
    url:           string
}

// ===========================================================================

export const fetchMonitor = (): Promise<APIResponse<DeskyMonitorAgent[]>> => {
    return axios
      .get<DeskyMonitorAgent[]>(joinApiRoute(base, "monitor"))
      .then((response) => ({ Data: response.data, Code: response.status }))
      .catch((err) => {
        throw new Error("Fetch app table error: " + err.message);
      });
};