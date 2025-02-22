import { FC, useState } from 'react';
import './AppAppend.css';
import { addApp } from '../../../lib/api/appsService';

export interface AppAppendForm {
    appTopic:       string
    name:           string
    description:    string
    link:           string
    icon:           string
}

export interface AppAppendProps {
    onClose?: () => void
}

const AppAppend: FC<AppAppendProps> = ({onClose}) => {

    const [form, setForm] = useState<AppAppendForm>({
        appTopic: "", name: "",
        description: "",
        link: "", icon: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addApp(form.appTopic, {
            name:           form.name,
            description:    form.description,
            link:           form.link,
            icon:           form.icon
        })
    };

    return (
            <form onSubmit={handleSubmit} className='AppAppend'>
                    <h2>Add application</h2>

                    <div className="FormGroup">
                        <label>Topic</label>
                        <input
                            type="text"
                            name="appTopic"
                            value={form.appTopic}
                            onChange={handleChange}
                            required
                            placeholder="Enter topic name"
                        />
                    </div>

                    <div className="FormGroup">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter app name"
                        />
                    </div>

                    <div className="FormGroup">
                        <label>Description</label>
                        <input
                            type="text"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                            placeholder="Enter app descriptions"
                        />
                    </div>

                    <div className="FormGroup">
                        <label>Link</label>
                        <input
                            type="text"
                            name="link"
                            value={form.link}
                            onChange={handleChange}
                            required
                            placeholder="Enter app link"
                        />
                    </div>

                    <div className="FormGroup">
                        <label>Icon</label>
                        <input
                            type="text"
                            name="link"
                            value={form.link}
                            onChange={handleChange}
                            required
                            placeholder="Enter app icon name or URL"
                        />
                    </div>


                <div className="ButtonGroup">
                    <button type="submit">Accept</button>
                </div>
            </form>
    );
};

export default AppAppend;