import showToast from '../libs/showToats';
import { setItemLocalStorage } from '../libs/localStorage';

interface LoginCredentials {
    password: string
    username: string
}

export default class loginService {
    protected isDebug:        boolean
    protected apiUrl:         string;

    constructor (api: string, debug: boolean = false) {
            this.apiUrl = api;
            this.isDebug = debug;
    }

    async postLogin(data: LoginCredentials) {
            this.isDebug && console.log("fetched URL: " + this.apiUrl)

            fetch(this.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then(response => {
                    if (response.status === 202) {
                        return response.json();
                    }
                    return Promise.reject(new Error(`Login error! Status: ${response.status} Info: ${response.statusText}`));
                })
                .then(data => {
                    setItemLocalStorage('token', data.DeskyJWT)
                    setTimeout(window.location.reload.bind(window.location), 1000)
                })
                .catch(e => {
                    showToast(e.message || e)
                });
    }

    logOut() {
        setItemLocalStorage('token', "");
        showToast('Logging out. Bye.')
        setTimeout(window.location.reload.bind(window.location), 1000);
    } 
}