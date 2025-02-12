import axios from "axios";
import { joinApiRoute } from "./apiBaseService";

// ===========================================================================

const base = "apps"
// ===========================================================================


export type DeskyAppTable = Map<string, DeskyAppCard[]>;

export interface DeskyAppCard {
    id:             number | undefined
    icon:           string
    name:           string
    link:           string
    description:    string
}

export interface APIStatusOK {
    code:       number
    message:    string
}


export interface APIResponse<DataType> {
    Data: DataType
    Code: number
}

// ===========================================================================

export const fetchTable = (): Promise<APIResponse<DeskyAppTable>> => {
    return axios
      .get<DeskyAppTable>(joinApiRoute(base, "table"))
      .then((response) => ({ Data: response.data, Code: response.status }))
      .catch((err) => {
        throw new Error("Fetch app table error: " + err.message);
      });
};


export const deleteAppByID = async (id: number): Promise<APIResponse<APIStatusOK>> => {
    try {
        const response = await axios.delete<APIStatusOK>(joinApiRoute(base, "table", id.toString(0)));
        return {Data: response.data, Code: response.status}
    } catch(err) {
        throw new Error('Delete app error: ' + err.message);
    } 
}

export const  deleteApp = async (topic: string, query: number): Promise<APIResponse<APIStatusOK>> => {
    try {
        const response = await axios.delete<APIStatusOK>(joinApiRoute(base, "table", topic, query.toString(0)));
        return {Data: response.data, Code: response.status}
    } catch(err) {
        throw new Error('Delete app error: ' + err.message);
    } 
}

export const addApp = async (topic: string, app: DeskyAppCard): Promise<APIResponse<APIStatusOK>> => {
    try {
        const response = await axios.post<APIStatusOK>(joinApiRoute(base, "table", topic), app);
        return {Data: response.data, Code: response.status}
    } catch(err) {
        throw new Error('Add app error: ' + err.message);
    } 
}

export const editApp = async (id: number, app: DeskyAppCard): Promise<APIResponse<APIStatusOK>> => {
    try {
        const response = await axios.patch<APIStatusOK>(joinApiRoute(base, "table", id.toString(0)), app);
        return {Data: response.data, Code: response.status}
    } catch(err) {
        throw new Error('Edit app error: ' + err.message);
    } 
}
