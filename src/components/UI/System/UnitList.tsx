import { FC } from "react";
import { SystemdUnitList } from "../../../libs/systemdService";
import { API, resolveApi } from "../../../libs/apiResolve";
import { SystemdService } from "../../../libs/systemdService";
import { ErrorMsg } from "../Functional";
import LoadingContainer from "../Functional/LoadingContainer";
import useFetchService from "../../../hooks/useFetchService";
import { fetchSystemdUnits } from "../../../lib/api/systemService";

const UnitList: FC = () => {

    const { loading, error, data } = useFetchService(fetchSystemdUnits);
    const api = new SystemdService()

    if (error) { return <ErrorMsg text={error} type="notice" /> }
    if (loading) { return <LoadingContainer/> }

    return (
        <div>
            
        </div>
    );
};

export default UnitList;