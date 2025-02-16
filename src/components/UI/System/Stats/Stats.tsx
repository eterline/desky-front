import { FC } from "react";
import LoadingContainer from "./../../Functional/LoadingContainer";
import InfoTable from "./InfoTable";
import CpuStats from "./CpuStats";
import RamStats from "./RamStats";
import TempStats from "./TempStats";
import useWsStats from "../../../../hooks/useWsStats";
import './Stats.css';
import { ErrorMsg } from "../../Functional";

const Stats: FC = () => {

    const {data, stats, loading, error} = useWsStats();

    if (loading) return <LoadingContainer/>
    if (error) return <ErrorMsg text={error} type="notice"/>

    const { memory, cpu, temperature, load } = stats

    return (
        <div className="Stats">
                <InfoTable/>
                <CpuStats {...cpu} />
                <RamStats {...memory} />
                {/* <LoadStats data={load} cores={cpu.threadCount}/> */}
                <TempStats {...temperature} />
        </div>
    );
};

export default Stats;