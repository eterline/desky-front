// ===========================================================================

import axios from "axios";
import { APIResponse, APIStatusOK, joinApiRoute, PromiseResponse, WsConnectorAPI } from "./apiBaseService";

const base = "ssh"

// ===========================================================================

export interface SSHhostInfo {
    id:                 number
    host:               string
    "private-key-use":  boolean
}

export interface SSHhostPing {
    id:                 number
    available:          boolean
}

export interface SSHhostForm {
    os:                 string
    port:               number
    host:               string
    user:               string
    "private-key-use":  boolean
    password:           string
    "private-key":      string
}

// ===========================================================================

export const fetchSSHhostList = async (): PromiseResponse<SSHhostInfo[]> => {
    return axios
      .get<SSHhostInfo[]>(joinApiRoute(base, "list"))
      .then((response) => ({
        Data: response.status == 204 ? [] : response.data,
        Code: response.status
      }))
      .catch((err) => {
        throw new Error("Fetch user list error: " + err.message);
      });
};

export const createSSHhost = async (ssh: SSHhostForm): PromiseResponse<APIStatusOK> => {
    return axios
      .post<APIStatusOK>(joinApiRoute(base, "list"), ssh)
      .then((response) => ({ Data: response.data, Code: response.status }))
      .catch((err) => {
        throw new Error("Fetch user list error: " + err.message);
      });
};

export const deleteSSHhost = async (id: number): PromiseResponse<APIStatusOK> => {
    return axios
      .delete<APIStatusOK>(joinApiRoute(base, "list", id.toString()))
      .then((response) => ({ Data: response.data, Code: response.status }))
      .catch((err) => {
        throw new Error("Fetch user list error: " + err.message);
      });
};

export const pingSSHhostList = async (): PromiseResponse<SSHhostPing[]> => {
    return axios
      .get<SSHhostPing[]>(joinApiRoute(base, "ping"))
      .then((response) => ({ Data: response.data, Code: response.status }))
      .catch((err) => {
        throw new Error("Fetch user list error: " + err.message);
      });
};

export const wsSSHhostConnect = (id: number): WsConnectorAPI => {
  return new WsConnectorAPI(base, "connect", id.toString())
};