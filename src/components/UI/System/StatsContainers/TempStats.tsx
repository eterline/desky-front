import { FC } from "react";
import { tempData } from "../../../../libs/systemService";
import TableLoad from "./TableLoad";

const TempStats: FC<tempData> = (data) => {

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
        />
        </>
    );
};

export default TempStats;