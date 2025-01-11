import { FC, useEffect } from "react";
import { useFetchAPI } from "../../../hooks";
import { API, resolveApi } from "../../../libs/apiResolve";
import { ErrorMsg } from "../Functional";
import { useVESessionContext } from "../../../hooks/useVESessionContext";
import Select from 'react-select'
import './SessionSelect.css';

export type SessionStack = Session[]
export type Session = Node[]
export interface Node {
  cpu: number
  status: string
  maxcpu: number
  mem: number
  node: string
  disk: number
  id: string
  ssl_fingerprint: string
  uptime: number
  level: string
  maxmem: number
  maxdisk: number
  type: string
}


export type selectFunc = (session: number, node: string) => void;

export interface SelectOption {
    value: SessionValue;
    label: string;
}

export interface SessionValue {
    session: number;
    node: string;
    label: string;
}

export interface Sessions extends Array<Array<{ node: string }>> {}

const SessionSelect: FC = () => {

    const getOptions = (data: SessionStack): SessionValue[] =>
        data.flatMap((ss, idx) =>
            ss.map((node) => ({
                label: `Session(${idx}) - ${node.node}`,
                session: idx,
                node: node.node,
        }))
    );

    const setDefault = (data: SessionStack): SessionValue | undefined => {
        if (data && data[0]?.[0]?.node) {
            return {
                label: `Session(0) - ${data[0][0].node}`,
                session: 0,
                node: data[0][0].node,
            };
        }
        return undefined;
    };

    const handleChange = (selectedOption: SessionValue | null) => {
        if (selectedOption) {
            const { session, node } = selectedOption;
            setVESession(session, node);
        }
    };

    const { setVESession } = useVESessionContext();

    const { error, loading, data } = useFetchAPI<SessionStack>(resolveApi(API.pve.sessions));

    useEffect(() => {
        if (data) {
            const firstNode = data[0][0]?.node;
            if (firstNode) {
                setVESession(0, firstNode);
            }
        }
    }, [error, loading, data]);

    if (error) return (
        <div className="SessionSelect">
            <ErrorMsg text={error} type="warn" />
        </div>
    );

    if (loading || !data) return (
        <div className="SessionSelect">
            <h1>Loading...</h1>
        </div>
    );

    if (data) return (
        <div className="SessionSelect">
            <Select 
                options={getOptions(data)}
                defaultValue={setDefault(data)}
                onChange={handleChange}
            />
        </div>
    );
};

export default SessionSelect;