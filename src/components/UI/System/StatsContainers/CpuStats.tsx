import { FC } from "react";
import { cpuData } from "../../../../libs/systemService";
import TableLoad from "./TableLoad";

const CpuStats: FC<cpuData> = ({load, name, model, coreCount, threadCount}) => {

    const parameters = new Map<string, string>([
        ["Name", name],
        ["Model", model],
        ["Cores", `${coreCount} | ${threadCount}`]
    ])

    return (
        <>
            <TableLoad
                loadPercent={load}
                titleName="cpu info"
                titleUpper={true}
                params={parameters}
                icon="cpu-64"
            />
        </>
    );
};

export default CpuStats;