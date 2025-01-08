import { useServiceContext } from '../../../hooks';
import { SelectService } from '../../../libs/serviceMap';
import { ErrorMsg } from '../Functional';
import { useEffect } from 'react';

import './ServiceView.css';

const ServiceView = () => {

    const { selectedService } = useServiceContext();
    const ServiceComponent = SelectService(selectedService);

    useEffect(() => {
        document.title = `Desky [${selectedService}]`;
    }, [selectedService]);

    return (
        <div className='ServiceView'>
            <div className='ServiceView-top'>[{selectedService}]</div>

            <div className='ServiceView-main'>
                {   
                    ServiceComponent ? <ServiceComponent/> 
                    :
                    <ErrorMsg text='Selected service not found' type='notice'/>
                }
            </div>
        </div>
    );
};

export default ServiceView;