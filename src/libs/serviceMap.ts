import { FC } from "react";

import AppService from '../components/UI/App/AppService';

export type ServiceMapPattern  = Map<string, FC>

const ServiceMap: ServiceMapPattern = new Map([
    ['apps', AppService],
    ['stats', AppService],
    ['proxmox', AppService],
    ['docker', AppService],
]);

const SelectService = (service: string): FC => {
    return ServiceMap.get(service)
}

export { ServiceMap, SelectService };
