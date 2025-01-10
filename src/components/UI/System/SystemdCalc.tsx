import { FC, useEffect, useState } from 'react';
import { SystemdUnitList } from '../../../libs/systemdService';
import './SystemdCalc.css'

interface UnitsStates {
    all:        number
    disabled:   number
    enabled:     number
    unknown:    number
}

const SystemdCalc: FC<SystemdUnitList> = (units) => {

    const [states, setStates] = useState<UnitsStates>({all: 0, disabled: 0, enabled: 0, unknown: 0});

    useEffect(() => {

        setStates({
            all: Object.entries(units).length,

            disabled: Object.entries(units).map(([_ , data]) => {
                return data.preset === 'disabled'
            })
            .filter(v => v).length,

            enabled: Object.entries(units).map(([_ , data]) => {
                return data.preset === 'enabled'
            })
            .filter(v => v).length,

            unknown: Object.entries(units).map(([_ , data]) => {
                return data.preset === ''
            })
            .filter(v => v).length
        })

    }, [units])

    return (
        <div className='SystemdCalc'>
            <h1 className="SystemdCalc-title">CPU Info</h1>
            <div className="SystemdCalc-param">
                <strong>All Units:</strong>{states.all}
            </div>
            <div className="SystemdCalc-param">
                <strong>Active:</strong>{states.enabled}
            </div>
            <div className="SystemdCalc-param">
                <strong>Disabled:</strong>{states.disabled}
            </div>
            <div className="SystemdCalc-param">
                <strong>Unknown:</strong>{states.unknown}
            </div>
        </div>
    );
};

export default SystemdCalc;