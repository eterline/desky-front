import { FC } from "react";
import { SystemdUnitList } from "../../../libs/systemdService";
import { useFetchAPI } from "../../../hooks";
import { API, resolveApi } from "../../../libs/apiResolve";
import { SystemdService } from "../../../libs/systemdService";
import { ErrorMsg } from "../Functional";
import LoadingContainer from "../Functional/LoadingContainer";

const UnitList: FC = () => {

    const { loading, error, data } = useFetchAPI<SystemdUnitList>(resolveApi(API.system.status));
    const api = new SystemdService()

    if (error) { return <ErrorMsg text={error} type="notice" /> }
    if (loading) { return <LoadingContainer/> }

    return (
        <div>
            
        </div>
    );
};

export default UnitList;