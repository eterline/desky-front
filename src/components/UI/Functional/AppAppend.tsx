import { FC } from 'react';
import { UiIcon } from '../Icons';
import './AppAppend.css';

interface AppAppendProps {
    icon?: string
    size?: string
    text?: string
}

const AppAppend: FC<AppAppendProps> = ({icon, size, text}) => {
    return (
        <div className='AppAppend'>
            <div className='AppAppend_inner'>
                <UiIcon name= {icon ?? 'apps'} size= {size ?? '3rem'} />
            </div>
            <div className='AppAppend_text'>{text ?? 'Append App'}</div>
        </div>
    );
};

export default AppAppend;