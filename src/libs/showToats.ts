import { toast } from 'react-toastify';

const showToast = (message: string) => {
    toast(message, {
        ariaLabel: 'Email received',
    })

};

export default showToast;