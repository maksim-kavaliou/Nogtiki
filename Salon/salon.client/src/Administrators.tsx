import { useEffect, useState } from 'react';
import './App.css';

interface Administator {
    id: number;
    name: string;
    email: string;
    phone: string;
}

function AdministratorsTable() {
    const [administrators, setAdministrators] = useState<Administator[]>();

    useEffect(() => {
        populateAdministrators();
    }, []);

    const contents = administrators === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone number</th>
                </tr>
            </thead>
            <tbody>
                {administrators.map(administrator =>
                    <tr key={administrator.id}>
                        <td>{administrator.id}</td>
                        <td>{administrator.name}</td>
                        <td>{administrator.email}</td>
                        <td>{administrator.phone}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Administrators</h1>
            <br/>
            {contents}
        </div>
    );

    async function populateAdministrators() {
        const response = await fetch('api/Administrators',
            {
                method: 'GET'
            });
        console.log(response)
        const data = await response.json();
        setAdministrators(data);
    }
}

export default AdministratorsTable;