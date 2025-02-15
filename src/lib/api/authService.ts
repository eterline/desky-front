import axios from "axios"
import { APIResponse, APIStatusOK, joinApiRoute, PromiseResponse } from "./apiBaseService"

// ===========================================================================

const base = "auth"

// ===========================================================================

export interface DeskyUserForm {
    id?:         number | undefined
    login:      string
    password:   string | undefined
}


// ===========================================================================

export const fetchUserList = (): PromiseResponse<DeskyUserForm[]> => {
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


// TODO: don't send body. rewrite later
export const deleteUser = async (id: number): PromiseResponse<APIStatusOK> => {

  return axios
    .delete<APIStatusOK>(joinApiRoute(base, "users", id.toString()))
    .then((response) => ({ Data: response.data, Code: response.status }))
    .catch((err) => {
      throw new Error("Register user error: " + err.message);
    });
};

export const registerUser = async (login: string, password: string): PromiseResponse<APIStatusOK> => {

    const user: DeskyUserForm = {login, password}

    return axios
      .post<APIStatusOK>(joinApiRoute(base, "register"), user)
      .then((response) => ({ Data: response.data, Code: response.status }))
      .catch((err) => {
        throw new Error("Register user error: " + err.message);
      });
};