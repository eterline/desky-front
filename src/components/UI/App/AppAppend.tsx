import { FC, useState } from 'react';
import { UiIcon } from '../Icons';
import './AppAppend.css';
import Modal from 'react-modal';
import AddApp from './AddApp';

interface AppAppendProps {
    icon?: string
    size?: string
    text?: string
    updateFunc: () => void
}

const AppAppend: FC<AppAppendProps> = ({icon, size, text, updateFunc}) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className='AppAppend' onClick={openModal}>
            <div className='AppAppend_inner'>
                <UiIcon name= {icon ?? 'apps'} size= {size ?? '3rem'} />
            </div>
            <div className='AppAppend_text'>{text ?? 'Append App'}</div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Add App"
                style={{
                    overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
                    content: { color: 'black', padding: '20px', width: 'fit-content', height: 'fit-content', margin: 'auto' },
                }}
            >
                <AddApp updateFunc={updateFunc} closeFunc={closeModal} />
            </Modal>
        </div>
    );
};

export default AppAppend;