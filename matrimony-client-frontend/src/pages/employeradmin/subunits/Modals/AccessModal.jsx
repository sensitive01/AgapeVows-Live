import React, { useState } from 'react';

const AccessModal = ({ show, onClose, onConfirm }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);

    const users = [
        {
            id: 1,
            name: 'Darlee Robertson',
            role: 'Darlee Robertson',
            avatar: 'assets/img/profiles/avatar-19.jpg'
        },
        {
            id: 2,
            name: 'Sharon Roy',
            role: 'Installer',
            avatar: 'assets/img/profiles/avatar-20.jpg'
        },
        {
            id: 3,
            name: 'Vaughan Lewis',
            role: 'Senior Manager',
            avatar: 'assets/img/profiles/avatar-21.jpg'
        },
        {
            id: 4,
            name: 'Jessica Louise',
            role: 'Test Engineer',
            avatar: 'assets/img/users/user-33.jpg'
        },
        {
            id: 5,
            name: 'Test Engineer',
            role: 'UI /UX Designer',
            avatar: 'assets/img/users/user-34.jpg'
        }
    ];

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleUserSelect = (userId) => {
        setSelectedUsers(prev => 
            prev.includes(userId) 
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(selectedUsers);
        onClose();
    };

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!show) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-md">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Access Access</h4>
                        <button
                            type="button"
                            className="btn-close custom-btn-close"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            <i className="ti ti-x"></i>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body pb-0">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <div className="input-icon-end position-relative">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Search"
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                            />
                                            <span className="input-icon-addon">
                                                <i className="ti ti-search text-gray-7"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <div className="p-2 border br-5">
                                            <div className="pipeline-access-items">
                                                {filteredUsers.map(user => (
                                                    <div key={user.id} className="d-flex align-items-center p-2">
                                                        <div className="form-check form-check-md me-2">
                                                            <input 
                                                                className="form-check-input" 
                                                                type="checkbox" 
                                                                checked={selectedUsers.includes(user.id)}
                                                                onChange={() => handleUserSelect(user.id)}
                                                            />
                                                        </div>
                                                        <div className="d-flex align-items-center file-name-icon">
                                                            <a href="#" className="avatar avatar-md border avatar-rounded">
                                                                <img src={user.avatar} className="img-fluid" alt={user.name} />
                                                            </a>
                                                            <div className="ms-2">
                                                                <h6 className="fw-medium fs-12"><a href="#">{user.name}</a></h6>
                                                                <span className="fs-10 fw-normal">{user.role}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Confirm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AccessModal;