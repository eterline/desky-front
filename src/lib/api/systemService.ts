import axios from "axios";
import { joinApiRoute, PromiseResponse, WsConnectorAPI } from "./apiBaseService";

// ===========================================================================

const base = "system"

// ===========================================================================

export interface DeskyHostStats {
    hostname:   string
    uptime:     number
    os:         string
    procs:      number
    virt:       string
    addrs:      string[]
}

export interface DeskySystemdUnit {
    unit_file:  string
    state:      string
    preset:     string
}

// ===========================================================================

export const fetchStats = async (): PromiseResponse<DeskyHostStats> => {
    return axios
      .get<DeskyHostStats>(joinApiRoute(base, "stats"))
      .then((response) => ({ Data: response.data, Code: response.status }))
      .catch((err) => {
        throw new Error("Fetch stats error: " + err.message);
      });
};

export const fetchSystemdUnits = async (): PromiseResponse<DeskySystemdUnit[]> => {
    return axios
      .get<DeskySystemdUnit[]>(joinApiRoute(base, "systemd"))
      .then((response) => ({ Data: response.data, Code: response.status }))
      .catch((err) => {
        throw new Error("Fetch systemd units error: " + err.message);
      });
};

export const wsSystemStats = (): WsConnectorAPI => {
    return new WsConnectorAPI(base, "stats")
};

// ===========================================================================
// ===========================================================================
// ===========================================================================

export interface SystemStats {
    memory: Memory
    cpu: Cpu
    temperature: Temperature[]
    load: Load
  }
  
  export interface Memory {
    total: number
    used: number
    available: number
    use: number
  }
  
  export interface Cpu {
    name: string
    model: string
    coreCount: number
    threadCount: number
    cores: Core[]
    cache: number
    load: number
  }
  
  export interface Core {
    id: string
    frequency: number
  }
  
  export interface Temperature {
    key: string
    current: number
    max: number
  }
  
  export interface Load {
    load1: number
    load5: number
    load15: number
  }