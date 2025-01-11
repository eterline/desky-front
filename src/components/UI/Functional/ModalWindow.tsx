import { FC, ReactNode } from 'react';
import Modal from 'react-modal';
import './ModalWindow.css';

interface ModalWindowProps {
    opened: boolean

    eventClose: (event: React.MouseEvent | React.KeyboardEvent) => void
    closerFunc: () => void
    doFunc?: () => void

    innerContent: ReactNode

    blackTheme?: boolean
    title?: string
    buttonText?: string

    notCloseAfter?: boolean
    paddingHide?: boolean
}

const ModalWindow: FC<ModalWindowProps> = ({
    eventClose, closerFunc, doFunc,
    opened, blackTheme, title, buttonText, notCloseAfter,
    innerContent, paddingHide
}) => {

    const handleClick = () => {
        if (doFunc) doFunc();
        if (!notCloseAfter) closerFunc();
    }

    return (
        <>
            <Modal
                isOpen={opened}
                onRequestClose={eventClose ?? (() => {})}
                style={{
                    overlay: { backgroundColor:'rgba(0, 0, 0, 0.4)'},
                    content: { color: 'black', padding: '.5rem', width: 'fit-content', height: 'fit-content', margin: 'auto' },
                }}
            >
                <div className='ModalWindow-header'>
                    <h1 style={{color: (blackTheme ? 'white' : 'black')}}>
                        {title ?? 'Modal Window'}
                    </h1>
                    <div onClick={closerFunc} className="ModalWindow-btn_close">
                        Close
                    </div>
                </div>
                <hr />
                <div className='ModalWindow-content'>
                    {innerContent}
                </div>
                <hr style={{display: (paddingHide ? 'none' : undefined)}} />
                <div className='ModalWindow-padding' style={{display: (paddingHide ? 'none' : undefined)}}>
                    <div onClick={handleClick} className="ModalWindow-btn_ok">
                        {buttonText ?? 'OK'}
                    </div>
                </div>   
            </Modal>
        </>
    );
};

export default ModalWindow;