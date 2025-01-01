import { IUserData, IAuthenticatedUserData } from "../types/libs/authService";
import FetchingService from "../libs/fetchingService";
import { resolveApi } from "../libs/apiResolve";

class AuthService {

    protected fetcher: FetchingService;

    constructor() {
        this.fetcher = new FetchingService(resolveApi("login"));
    }

    async auth(user: IUserData): Promise<IAuthenticatedUserData> {
        this.fetcher.postInfo(user, undefined)
        return this.fetcher.getAllData();
    }
}