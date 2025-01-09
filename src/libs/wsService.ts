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

interface QueryParams {
    [key: string]: string;
}

//   useEffect(() => {
//     const socket = new WebSocket(`/api/v1/system/stats?DeskyJWT=${getItemLocalStorage('token')}`);

//     socket.addEventListener('message', (event) => {
//         console.log(event);
//     });

// }, []);

export default class WSService {

    private WS: WebSocket| null = null;

    constructor(path: string, q?: QueryParams) {

        if (q) {
            path += '?'

            for (let key in q) {
                if (q.hasOwnProperty(key)) {
                    path += `${key}=${q[key]}&`
                }
            }
        }

        console.log(path)


        this.WS = new WebSocket(path);
    }


    public on(event: SockEvent, callback: (data: MessageEvent<any>) => void): void {
        if (this.WS) {
            this.WS.addEventListener(event, callback);
        }
    }

    public push(o: Object): void {
        if (this.WS) {
            this.WS.send(JSON.stringify(o))
        }
    }

    public leave(): void {
        if (this.WS) {
            this.WS.close();
            this.WS = null;
        }
    }
}