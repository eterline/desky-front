import { FC } from "react";
import { Temperature } from "../../../../lib/api/systemService";
import TableLoad from "./TableLoad";

const TempStats: FC<Temperature[]> = (data) => {

    const parameters = new Map<string, string>();

    Object.entries(data).forEach(([_, value]) => {
        parameters.set(
            value.key,
            `${value.current}°C`
        );
    });


    return (
        <>
        <TableLoad
            titleName="temperature"
            titleUpper={true}
            params={parameters}
            icon="temperature"
            disableBar
            centText
        />
        </>
    );
};

export default TempStats;