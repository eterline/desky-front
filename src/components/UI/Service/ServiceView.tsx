import { useServiceContext } from '../../../hooks';
import { SelectService } from '../../../hooks/useServiceContext';
import usePageName from '../../../hooks/usePageName';

import './ServiceView.css';
import { ErrorMsg } from '../Functional';

const ServiceView = () => {

    const { selectedService } = useServiceContext();
    const ServiceComponent = SelectService(selectedService).component;

    usePageName(selectedService);

    return (
        <div className='ServiceView'>
            <h1 className='ServiceView-top'>[{selectedService}]</h1>
            <div className='ServiceView-main'>
                {   
                    ServiceComponent ? <ServiceComponent/> 
                    :
                    <ErrorMsg text='Selected service not found' type='alert'/>
                }
            </div>
        </div>
    );
};

export default ServiceView;