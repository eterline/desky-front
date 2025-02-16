import { FC } from 'react';
import { CircleBar } from '../../Functional';
import { UiIcon } from '../../Icons';
import './LoadStats.css';
import { Load } from '../../../../lib/api/systemService';

interface LoadStatsProps {
    data: Load
    cores: number
}

const LoadStats: FC<LoadStatsProps> = ({data, cores}) => {

    const { load1, load5, load15 } = data

    return (
        <div className='LoadStats'>
            <div className='LoadStats-graphic'>
                <CircleBar 
                    value={load15}
                    max={cores}

                    size={100}
                    strokeWidth={10}
                    centerText=''

                    fillColor='var(--LoadStats-load1)'
                />
                <CircleBar 
                    value={load5}
                    max={cores}

                    size={80}
                    strokeWidth={10}
                    centerText=''

                    fillColor='var(--LoadStats-load5)'
                />
                <CircleBar 
                    value={load1}
                    max={cores}

                    size={60}
                    strokeWidth={10}
                    centerText=''

                    fillColor='var(--LoadStats-load15)'
                />
            </div>

            <div className='LoadStats-main'>
                <div className='LoadStats-main-param'>
                    <div className='LoadStats-p-1'></div>
                    <UiIcon name='load-1' invert={true} />
                    <span>{load1}</span>
                </div>
                <div className='LoadStats-main-param'>
                    <div className='LoadStats-p-5'></div>
                    <UiIcon name='load-5' invert={true} />
                    <span>{load5}</span>
                </div> 
                <div className='LoadStats-main-param'>
                    <div className='LoadStats-p-15'></div>
                    <UiIcon name='load-15' invert={true} />
                    <span>{load15}</span>
                </div> 
            </div>
        </div>
    );
};

export default LoadStats;