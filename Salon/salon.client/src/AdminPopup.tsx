import { useState } from 'react';
import { Administrator } from './models/administratorModel'

interface AdminPopupProps {
    mode: 'add' | 'edit' | null;
    admin: Partial<Administrator> | null;
    onClose: () => void;
    onSubmit: (admin: Partial<Administrator>) => void;
}

const AdminPopup: React.FC<AdminPopupProps> = ({ mode, admin, onClose, onSubmit }) => {
    const [formData, setFormData] = useState<Partial<Administrator>>(admin || {});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h2>{mode === 'edit' ? 'Edit Administrator' : 'Add Administrator'}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ''}
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
                                value={formData.email || ''}
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
                                value={formData.phone || ''}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <button type="submit">{mode === 'edit' ? 'Save Changes' : 'Add Administrator'}</button>
                    <button type="button" onClick={onClose}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminPopup;
