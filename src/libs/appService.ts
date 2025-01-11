import { API, resolveApi } from "./apiResolve";
import FetchingService from "./fetchingService";
import showToast from "./showToats";

export interface AppInfo {
    name:           string
    description:    string
    link:           string
    icon:           string
}

export default class AppService {

    private api: FetchingService | null = null;

    constructor() {}

    public add(topic:  string, app: AppInfo) {
        this.api = new FetchingService(resolveApi(API.apps.addApp(topic)))
        
        this.api.postInfo(app)
            .then(() => {
                showToast(`App: '${app.name}'\nAdded to topic: '${topic}'`)
            })
            .catch((e) => showToast(e))
    }

    public delete(topic:  string, query: number) {
        this.api = new FetchingService(resolveApi(API.apps.deleteApp(topic, query)))
        
        this.api.postInfo({}, {}, "DELETE")
            .then(() => {
                showToast(`App deleted`)
            })
            .catch((e) => showToast(e))
    }
}