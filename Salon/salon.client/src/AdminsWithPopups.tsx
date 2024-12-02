import { useEffect, useState } from 'react';
import { Administrator } from './models/administratorModel'; // Adjust the path if needed
import './App.css';
import AdminPopup from './AdminPopup'; // Adjust the path if needed

const AdministratorsTableV2 = () => {
    const [administrators, setAdministrators] = useState<Administrator[]>();
    const [searchFilter, setSearchFilter] = useState<string>('');
    const [showPopup, setShowPopup] = useState(false);
    const [popupMode, setPopupMode] = useState<'add' | 'edit' | null>(null);
    const [selectedAdmin, setSelectedAdmin] = useState<Partial<Administrator> | null>(null);

    useEffect(() => {
        fetchAdministrators(); // Fetch all administrators on component mount
    }, []);

    const fetchAdministrators = async (filter: string = '') => {
        const response = await fetch(`api/Administrators?filter=${encodeURIComponent(filter)}`, {
            method: 'GET',
        });
        if (response.ok) {
            const data = await response.json();
            setAdministrators(data);
        } else {
            console.error('Failed to fetch administrators');
        }
    };

    const handleSearch = () => {
        fetchAdministrators(searchFilter); // Fetch administrators with the search filter
    };

    const handleDelete = async (id: number) => {
        const response = await fetch(`api/Administrators/${id}`, { method: 'DELETE' });
        if (response.ok) {
            fetchAdministrators(searchFilter); // Refresh the table after deletion
        } else {
            console.error('Failed to delete administrator');
        }
    };

    const handleEdit = (admin: Administrator) => {
        setPopupMode('edit');
        setSelectedAdmin(admin);
        setShowPopup(true);
    };

    const handleAdd = () => {
        setPopupMode('add');
        setSelectedAdmin({ name: '', email: '', phone: '' });
        setShowPopup(true);
    };

    const handleSubmit = async (admin: Partial<Administrator>) => {
        const method = popupMode === 'edit' ? 'PUT' : 'POST';
        const url = popupMode === 'edit' ? `api/Administrators/${admin.id}` : 'api/Administrators';

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(admin),
        });

        if (response.ok) {
            setShowPopup(false);
            fetchAdministrators(searchFilter); // Refresh the table after submitting
        } else {
            console.error('Failed to submit administrator');
        }
    };

    return (
        <div>
            <h1 id="tableLabel">Administrators</h1>
            <div style={{ marginBottom: '15px' }}>
                <input
                    type="text"
                    placeholder="Search administrators..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                <button onClick={handleAdd}>Add Administrator</button>
            </div>
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {administrators?.map((administrator) => (
                        <tr key={administrator.id}>
                            <td>{administrator.id}</td>
                            <td>{administrator.name}</td>
                            <td>{administrator.email}</td>
                            <td>{administrator.phone}</td>
                            <td>
                                <button onClick={() => handleEdit(administrator)}>Edit</button>
                                <button onClick={() => handleDelete(administrator.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showPopup && (
                <AdminPopup
                    mode={popupMode}
                    admin={selectedAdmin}
                    onClose={() => setShowPopup(false)}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
};

export default AdministratorsTableV2;
