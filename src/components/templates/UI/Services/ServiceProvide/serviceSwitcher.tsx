import "./serviceSwitcher.css"

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
            <nav>
                {
                    props.appList.map((app) => (
                        <div onClick={() => { switchTo(app) }}>
                            {app}
                        </div>
                    ))
                }
            </nav>
        </div>
    );
};