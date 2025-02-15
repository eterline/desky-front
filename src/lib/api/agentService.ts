import axios from "axios";
import { APIResponse, joinApiRoute, WsConnectorAPI } from "./apiBaseService";

// ===========================================================================

const base = "agent"

// ===========================================================================

export interface DeskyMonitorAgent {
    hostname:      string
    id:            string
    url:           string
}

export interface AgentStats {
  // ... здесь поля параметров хостов 
}

// ===========================================================================

export const fetchMonitor = async (): Promise<APIResponse<DeskyMonitorAgent[]>> => {
    return axios
      .get<DeskyMonitorAgent[]>(joinApiRoute(base, "monitor"))
      .then((response) => ({ Data: response.data, Code: response.status }))
      .catch((err) => {
        throw new Error("Fetch app table error: " + err.message);
      });
};

export const wsAgentMonitor = (): WsConnectorAPI => {
  return new WsConnectorAPI(base, "monitor")
};
