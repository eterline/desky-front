import { FC } from "react";
import useTerminalSSH from "../../../../hooks/useTerminalSSH";
import { createPortal } from "react-dom";
import './TerminalShell.css'

export interface TerminalShellProps {
    id: number
    hostname: string
    onClose: () => void
}

const TerminalShell: FC<TerminalShellProps> = ({ id, hostname, onClose }) => {
    const { ref, disconnect } = useTerminalSSH(id);

    const handleClose = () => {
        disconnect();
        onClose();
    };

    return createPortal(
        <div className="Modal TerminalShell">
            <div className="Modal_content TerminalShell_main animated-scaleup">
                <h2>SSH: {hostname}</h2>
                <div className="TerminalShell_Shell" ref={ref}></div>
                <div className="TerminalShell_close" onClick={handleClose}>Disconnect</div>
            </div>
        </div>,
        document.getElementById("modal-root") as HTMLElement
    );
};

export default TerminalShell;
