import { FC } from "react";
import { Cpu } from "../../../../lib/api/systemService";
import TableLoad from "./TableLoad";

const CpuStats: FC<Cpu> = ({load, name, model, coreCount, threadCount}) => {

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
                centText
            />
        </>
    );
};

export default CpuStats;