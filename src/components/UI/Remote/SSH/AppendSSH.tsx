import { FC, useState } from "react";
import { createSSHhost, SSHhostForm } from "../../../../lib/api/sshService";
import './AppendSSH.css'

export interface AppendSSHProps {
    onClose: () => void
}

const AppendSSH: FC<AppendSSHProps> = ({onClose}) => {

    const [keyType, setKeyType] = useState<string>("none");
    const [formedData, setFormedData] = useState<SSHhostForm>({
        os:                 "linux",
        port:               22,
        host:               "",
        user:               "root",
        "private-key-use":  false,
        password:           "",
        "private-key":      "",
    });

    const handleKeyType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;

        setFormedData((prev) => ({
            ...prev,
            ["private-key-use"]: selectedValue !== "none",
        }))
        setFormedData(((prev) => ({...prev, ["private-key"]: ""})))
        setKeyType(selectedValue)
    }

    const handleKeyFile = (file: Blob) => {
        const rd = new FileReader()
        
        rd.onload = () => {
            const result = rd.result as string;
            setFormedData((prev) => ({ ...prev, ["private-key"]: result }));
            console.log(result);
        };
    
        rd.readAsText(file);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormedData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormedData((prev) => ({
            ...prev,
            [name]:  value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createSSHhost(formedData);
        onClose();
    };

    const renderKeyInput = () => {
        switch (keyType) {
            case "none":
                return null;
            case "text":
                return (
                    <div className="FormGroup-key">
                        <label>Private Key</label>
                        <textarea
                            rows={4}
                            name="private-key"
                            id="private-key-text"
                            onChange={handleChange}
                            value={formedData["private-key"]}
                        />
                    </div>
                );
            case "file":
                return (
                    <div className="FormGroup-key">
                        <label>Private Key</label>
                        <input type="file" onChange={(e) => handleKeyFile(e.target.files[0])} />
                    </div>
                );
        }
    };

    return (
        <form onSubmit={handleSubmit} className="SSHForm AppendSSH_content">
            <h2>Add SSH host</h2>

            <div className="FormGroup">
                <label>Host</label>
                <input
                    type="text"
                    name="host"
                    value={formedData.host}
                    onChange={handleChange}
                    required
                    placeholder="Enter host address"
                />
            </div>

            <div className="FormGroup">
                <label>OS</label>
                <select
                    name="os"
                    value={formedData.os}
                    onChange={handleSelect}
                >
                    <option value="linux">Linux</option>
                    <option value="windows">Windows</option>
                    <option value="mac">Mac</option>
                </select>
            </div>

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
                <select
                    name="private-key-use"
                    value={keyType}
                    onChange={handleKeyType}
                >
                    <option value="none">none</option>
                    <option value="text">text</option>
                    <option value="file">key file</option>
                </select>
            </div>
            {renderKeyInput()}
            <div className="ButtonGroup">
                <button type="submit">Accept</button>
            </div>
        </form>
    );
};

export default AppendSSH;