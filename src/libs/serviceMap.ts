import { FC } from "react";

import AppService from '../components/UI/App/AppService';
import PveService from '../components/UI/Pve/PveService';
import SystemService from '../components/UI/System/SystemService';

export type ServiceMapPattern  = Map<string, FC>

const ServiceMap: ServiceMapPattern = new Map([
    ['services',    AppService],
    ['proxmox',     PveService],
    ['system',      SystemService]
]);

const SelectService = (service: string): FC => {
    return ServiceMap.get(service)
}

export { ServiceMap, SelectService };
