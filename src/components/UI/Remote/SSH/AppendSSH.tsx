import { FC, useState } from "react";
import { createPortal } from "react-dom";
import { createSSHhost, SSHhostForm } from "../../../../lib/api/sshService";
import './AppendSSH.css'

export interface AppendSSHProps {
    onClose: () => void
}

const AppendSSH: FC<AppendSSHProps> = ({onClose}) => {

    const [hostValid, setHostValid] = useState<boolean>(false);
    const [userValid, setUserValid] = useState<boolean>(true);

    const [formedData, setFormedData] = useState<SSHhostForm>({
        os:                 "linux",
        port:               22,
        host:               "",
        user:               "root",
        "private-key-use":  false,
        password:           "",
        "private-key":      "",
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        setHostValid(hostReg.test(formedData.host) || ipAddrReg.test(formedData.host))
        setUserValid(hostReg.test(formedData.user))

        setFormedData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const hostReg = /^[a-z]+(-[a-z]+)*$/
    const ipAddrReg = /(?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d{1})\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d{1})/g

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createSSHhost(formedData);
        setTimeout(onClose, 150); // Закрытие модалки после отправки
    };

    return createPortal(
        <div className="Modal AppendSSH">
            <div className="Modal_content AppendSSH_content">
                <div className="AppendSSH-close" onClick={onClose}>
                    ✖ Закрыть
                </div>

                <form onSubmit={handleSubmit} className="SSHForm">
                    <h2>Добавить SSH хост</h2>

                    <div className="FormGroup">
                        <label>Host</label>
                        <input
                        style={{boxShadow: `2px 2px 2px ${hostValid ? "green" : "red"}`}}
                            type="text"
                            name="host"
                            value={formedData.host}
                            onChange={handleChange}
                            required
                            placeholder="Enter host address"
                        />
                    </div>

                    {/* <div className="FormGroup">
                        <label>OS</label>
                        <select
                            name="os"
                            value={formedData.os}
                            onChange={handleChange}
                        >
                            <option value="linux">Linux</option>
                            <option value="windows">Windows</option>
                            <option value="mac">Mac</option>
                        </select>
                    </div> */}

                    <div className="FormGroup">
                        <label>Port</label>
                        <input
                            type="number"
                            name="port"
                            value={formedData.port}
                            onChange={handleChange}
                            min="1"
                            max="65535"
                        />
                    </div>

                    <div className="FormGroup">
                        <label>User</label>
                        <input
                            style={{boxShadow: `2px 2px 2px ${userValid ? "green" : "red"}`}}
                            type="text"
                            name="user"
                            value={formedData.user}
                            onChange={handleChange}
                            required
                            placeholder="Enter username"
                        />
                    </div>

                    <div className="FormGroup">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formedData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            minLength={5}
                        />
                    </div>

                    <div className="FormGroup">
                        <label>Use Private Key</label>
                        <input
                            className="FormGroup_check"
                            type="checkbox"
                            name="private-key-use"
                            checked={formedData["private-key-use"]}
                            onChange={handleChange}
                        />
                    </div>

                    {formedData["private-key-use"] && (
                        <div className="FormGroup">
                            <label>Private Key</label>
                            <input
                                type="text"
                                name="private-key"
                                value={formedData["private-key"]}
                                onChange={handleChange}
                                placeholder="Enter private key"
                            />
                        </div>
                    )}

                    <div className="ButtonGroup">
                        <button type="submit">Принять</button>
                    </div>
                </form>
            </div>
        </div>,
        document.getElementById("modal-root") as HTMLElement
    );
};

export default AppendSSH;