import axios from "axios";
import { APIResponse, joinApiRoute } from "./apiBaseService";

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

export const fetchStats = (): Promise<APIResponse<DeskyHostStats>> => {
    return axios
      .get<DeskyHostStats>(joinApiRoute(base, "stats"))
      .then((response) => ({ Data: response.data, Code: response.status }))
      .catch((err) => {
        throw new Error("Fetch stats error: " + err.message);
      });
};

export const fetchSystemdUnits = (): Promise<APIResponse<DeskySystemdUnit[]>> => {
    return axios
      .get<DeskySystemdUnit[]>(joinApiRoute(base, "systemd"))
      .then((response) => ({ Data: response.data, Code: response.status }))
      .catch((err) => {
        throw new Error("Fetch systemd units error: " + err.message);
      });
};

// ===========================================================================
// ===========================================================================
// ===========================================================================

export interface SysData {
    memory:         memoryData,
    cpu:            cpuData,
    temperature:    tempData,
    load:           loadData
}

export interface memoryData {
    total:      number,
    used:       number,
    available:  number,
    use:        number
}

export interface cpuData {
    name:           string,
    model:          string,
    coreCount:      number,
    threadCount:    number,
    cores:          coreInfo[]
    cache:          number,
    load:           number
}

export interface coreInfo {
    id:         string,
    frequency:  number
}

export type tempData = tempInfo[];
export interface tempInfo {
    key:      string,
    current:  number,
    max:      number
}

export interface loadData {
    load1:number,
    load5:number,
    load15:number
}


export interface Stats {
    loading:    boolean;
    data:       SysData | null;
}