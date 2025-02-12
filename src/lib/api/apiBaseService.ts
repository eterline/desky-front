
export interface APIStatusOK {
    code:       number
    message:    string
}

export interface APIResponse<DataType> {
    Data: DataType
    Code: number
}

// ==========================================================================================

const API_BASE_ROUTE = "api"
const routeRegExpFilter = /\*|%|#|&|\\|\/|\$/g;

// ==========================================================================================

export const joinApiRoute = (subrouteBase: string, ...paths: string[]): string => {

    const route = new Array<string>(API_BASE_ROUTE, subrouteBase, ...paths)
    .map((value) => value.replace(routeRegExpFilter, ''))
    .join("/");

    return route;
};

export const makeError = (prefix: string, msg: string) => {
    throw new Error(`${prefix}: ${msg}`);
};