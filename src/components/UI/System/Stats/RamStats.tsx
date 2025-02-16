import { FC } from "react";
import { Memory } from "../../../../lib/api/systemService";
import TableLoad from "./TableLoad";
import { bytesToGB } from "../../../../lib/utils";

const RamStats: FC<Memory> = ({total, used, available, use}) => {

    const parameters = new Map<string, string>([
        ["Total", bytesToGB(total, 2)],
        ["Used", bytesToGB(used, 2)]
    ])

    return (
        <>
            <TableLoad
                loadPercent={use}
                titleName="ram info"
                titleUpper={true}
                params={parameters}
                icon="ram"
                centText
            />
        </>
    );
};

export default RamStats;