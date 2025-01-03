import { FC } from "react";

import AppService from '../components/UI/App/AppService';

export type ServiceMapPattern  = Map<string, FC>

const ServiceMap: ServiceMapPattern = new Map([
    ['apps', AppService],
    ['stats', AppService],
    ['proxmox', AppService],
    ['docker', AppService],
]);

export default ServiceMap;
