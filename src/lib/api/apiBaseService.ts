import { buffer } from "stream/consumers"

export interface APIStatusOK {
    code:       number
    message:    string
}

export interface APIResponse<DataType> {
    Data: DataType
    Code: number
}

export type PromiseResponse<T> = Promise<APIResponse<T>>

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

// ===========================================================================

type SockEvent =
  | 'connect'
  | 'disconnect'
  | 'message'
  | 'data'
  | 'error'
  | 'reconnect'
  | 'reconnect_attempt'
  | 'reconnect_error'
  | 'reconnect_failed'
  | 'ping'
  | 'pong'
  | 'connect_error';

export class WsConnectorAPI {

    private webSocket: WebSocket | null = null
    private targetLink: string = ""
  
    constructor(base: string, ...paths: string[]) {
        this.targetLink = joinApiRoute(base, ...paths)
        this.webSocket = new WebSocket(this.targetLink)
    }

    public TargetURL(): string {
        return this.targetLink
    }

    public State(): number {
        return this.webSocket.readyState
    }

    public CloseWS(): void {
        if (this.webSocket) {
            this.webSocket.close()
            this.webSocket = null
        }
    }

    public AddReaction(event: SockEvent, callback: (data: MessageEvent<any>) => void): void {
        if (this.webSocket) {this.webSocket.addEventListener(event, callback)}
    }
        
    public PushMessageJSON(o: Object): void {
        if (this.webSocket) {this.webSocket.send(JSON.stringify(o))}
    }

    public PushMessageBytes(str: string): void {
        let buf = new Buffer(str, "utf-8")
        if (this.webSocket) {this.webSocket.send(buf)}
    }

    public PushMessageBase64(str: string): void {
        if (this.webSocket) {this.webSocket.send(btoa(str))}
    }
  }