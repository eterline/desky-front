import { FC } from "react";
import { memoryData } from "../../../../libs/systemService";
import TableLoad from "./TableLoad";
import { bytesToGB } from "../../../../libs/Utils";

const RamStats: FC<memoryData> = ({total, used, available, use}) => {

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
            />
        </>
    );
};

export default RamStats;