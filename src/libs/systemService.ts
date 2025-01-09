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