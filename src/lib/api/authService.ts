// ===========================================================================

import axios from "axios"
import { APIResponse, APIStatusOK, joinApiRoute } from "./apiBaseService"

const base = "auth"

// ===========================================================================

export interface DeskyUserForm {
    id?:         number | undefined
    login:      string
    password:   string | undefined
}


// ===========================================================================

export const fetchUserList = (): Promise<APIResponse<DeskyUserForm[]>> => {
    return axios
      .get<DeskyUserForm[]>(joinApiRoute(base, "users"))
      .then((response) => ({ Data: response.data, Code: response.status }))
      .catch((err) => {
        throw new Error("Fetch user list error: " + err.message);
      });
};

// export const fetchLoginUser = (login: string, password: string): Promise<APIResponse<APIStatusOK>> => {
//     return axios
//       .get<APIStatusOK>(joinApiRoute(base, "register"))
//       .then((response) => ({ Data: response.data, Code: response.status }))
//       .catch((err) => {
//         throw new Error("Fetch systemd units error: " + err.message);
//       });
// };

export const fetchRegisterUser = (login: string, password: string): Promise<APIResponse<APIStatusOK>> => {

    const user: DeskyUserForm = {login, password}

    return axios
      .post<APIStatusOK>(joinApiRoute(base, "register"), user)
      .then((response) => ({ Data: response.data, Code: response.status }))
      .catch((err) => {
        throw new Error("Register user error: " + err.message);
      });
};