
// PVE host status interface ===============

export interface PveStatus {
    name:   string
    load:   string[]
    fs:     FS
    ram:    RAM
    cpu:    CPU
    uptime: number
    kernel: string
}
  
export interface FS {
    used:   number
    total:  number
}
  
export interface RAM {
    used:   number
    total:  number
}
  
export interface CPU {
    load:       number
    model:      string
    cores:      number
    frequency:  string
}

// PVE devices interface ===============

export interface PveDevices {
    lxc:    PveDevice
    qemu:   PveDevice
}

export interface PveDevice {
    status: string
    name:   string
    tags:   string
    vmid:   number
    cpus:   number
    netRX:  number
    netTX:  number
    uptime: number
    pid:    number
}