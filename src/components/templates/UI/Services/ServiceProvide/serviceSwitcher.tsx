import "./serviceSwitcher.css"
import { AppIcon }  from "../Apps/appIcon";

type ServiceName = string;

interface ServiceSwitcherProps {
    appList:    ServiceName[];
    switchFunc: React.Dispatch<any>;
    switched:   ServiceName;
}

export const ServiceSwitcher = (props: ServiceSwitcherProps) => {

    const switchTo = (app: ServiceName) => {
        props.switchFunc(app);
    }

    return (
        <div className="ServiceSwitcher">
                {
                    props.appList.map((app) => (
                        <div className="ServiceSwitcher-case" onClick={() => { switchTo(app) }}>
                            <AppIcon name={app}/>
                        </div>
                    ))
                }
        </div>
    );
};