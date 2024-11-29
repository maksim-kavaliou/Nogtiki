import { useEffect, useState } from 'react';
import './App.css';

interface Administrator {
    id: number;
    name: string;
    email: string;
    phone: string;
}

function AdministratorsTableWithAdd() {
    const [administrators, setAdministrators] = useState<Administrator[]>();
    const [newAdmin, setNewAdmin] = useState<Partial<Administrator>>({
        name: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        populateAdministrators();
    }, []);

    const contents =
        administrators === undefined ? (
            <p>
                <em>
                    Loading... Please refresh once the ASP.NET backend has started. See{' '}
                    <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.
                </em>
            </p>
        ) : (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone number</th>
                    </tr>
                </thead>
                <tbody>
                    {administrators.map((administrator) => (
                        <tr key={administrator.id}>
                            <td>{administrator.id}</td>
                            <td>{administrator.name}</td>
                            <td>{administrator.email}</td>
                            <td>{administrator.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewAdmin((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newAdmin.name || !newAdmin.email || !newAdmin.phone) {
            alert('Please fill in all fields.');
            return;
        }

        const response = await fetch('api/Administrators', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAdmin),
        });

        if (response.ok) {
            setNewAdmin({ name: '', email: '', phone: '' }); // Clear the form
            populateAdministrators();
        } else {
            console.error('Failed to add administrator');
        }
    };

    return (
        <div>
            <h1 id="tableLabel">Administrators</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <h2>Add Administrator</h2>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={newAdmin.name || ''}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={newAdmin.email || ''}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Phone:
                        <input
                            type="text"
                            name="phone"
                            value={newAdmin.phone || ''}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button type="submit">Add Administrator</button>
            </form>
            <br />
            {contents}
        </div>
    );

    async function populateAdministrators() {
        const response = await fetch('api/Administrators', {
            method: 'GET',
        });
        const data = await response.json();
        setAdministrators(data);
    }
}

export default AdministratorsTableWithAdd;
