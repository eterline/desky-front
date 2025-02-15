import { FC, useEffect, useState } from 'react';
import { SystemdUnitList } from '../../../libs/systemdService';
import './SystemdTableHead.css'

interface UnitsStates {
    all:        number
    disabled:   number
    enabled:     number
    unknown:    number
}

const SystemdTableHead: FC<SystemdUnitList> = (units) => {

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
        <div className='SystemdTableHead'>

            <div className="SystemdTableHead-param">
                {states.all}
                <strong>All Units</strong>
            </div>

            <div className="SystemdTableHead-param">
                {states.enabled}
                <strong>Active</strong>
            </div>

            <div className="SystemdTableHead-param">
                {states.disabled}
                <strong>Disabled</strong>
            </div>

            <div className="SystemdTableHead-param">
                {states.unknown}
                <strong>Unknown</strong>
            </div>

        </div>
    );
};

export default SystemdTableHead;