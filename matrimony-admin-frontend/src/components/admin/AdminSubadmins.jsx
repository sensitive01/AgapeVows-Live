import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form, Badge, Card, Row, Col, Dropdown } from "react-bootstrap";
import {
  getAllSubadmins,
  createSubadmin,
  deleteSubadmin,
  updateSubadmin,
} from "../../api/service/adminServices";
import Swal from "sweetalert2";
import NewLayout from "./layout/NewLayout";

// Custom toggle to remove the default Bootstrap caret (down arrow)
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <button
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className="btn btn-sm btn-outline-secondary rounded-circle d-inline-flex align-items-center justify-content-center border-0 shadow-sm"
    style={{ width: "32px", height: "32px" }}
  >
    {children}
  </button>
));


const AVAILABLE_PERMISSIONS = [
  {
    key: "users",
    label: "Users Management",
    subPermissions: [
      { key: "users.new_requests", label: "New User Requests" },
      {
        key: "users.all",
        label: "All Users",
        subPermissions: [
          { key: "users.all.edit", label: "Edit / Update Users" },
          { key: "users.all.delete", label: "Delete Users" },
          { key: "users.all.deactivate", label: "Deactivate Users" },
        ],
      },
      { key: "users.paid", label: "Paid Users" },
      { key: "users.add_new", label: "Add New User" },
      { key: "users.deleted", label: "Deleted Users" },
      { key: "users.deactivated", label: "Deactivated Users" },
      { key: "users.id_verification", label: "ID Verification" },
      { key: "users.verified_id", label: "Verified Users" },
      { key: "users.contact_updates", label: "Contact Updates" },
    ],
  },
  { key: "pricing", label: "Pricing Plans" },
  { key: "events", label: "Events" },
  { key: "issues", label: "User Issues" },
  { key: "enquiries", label: "Enquiries" },
  { key: "reports", label: "User Reports" },
];

const AdminSubadmins = () => {
  const [subadmins, setSubadmins] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = subadmins.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(subadmins.length / recordsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    permissions: [],
  });

  const fetchSubadmins = async () => {
    try {
      setLoading(true);
      const response = await getAllSubadmins();
      if (response.data?.success) {
        setSubadmins(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching subadmins:", error);
      Swal.fire("Error", "Failed to load subadmins", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubadmins();
  }, []);

  const handleShowModal = (subadmin = null) => {
    if (subadmin) {
      setIsEditing(true);
      setCurrentId(subadmin._id);
      setFormData({
        email: subadmin.adminEmail || "",
        password: "", // empty for edit
        permissions: subadmin.permissions || [],
      });
    } else {
      setIsEditing(false);
      setCurrentId(null);
      setFormData({
        email: "",
        password: "",
        permissions: [],
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePermissionChange = (permKey) => {
    setFormData((prev) => {
      const isSelected = prev.permissions.includes(permKey);
      if (isSelected) {
        return {
          ...prev,
          permissions: prev.permissions.filter((k) => k !== permKey),
        };
      } else {
        return {
          ...prev,
          permissions: [...prev.permissions, permKey],
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      return Swal.fire("Error", "Email is required", "error");
    }
    if (!isEditing && !formData.password) {
      return Swal.fire("Error", "Password is required for new subadmin", "error");
    }

    try {
      if (isEditing) {
        const payload = { ...formData };
        if (!payload.password) delete payload.password;
        await updateSubadmin(currentId, payload);
        Swal.fire("Success", "Subadmin updated successfully", "success");
      } else {
        await createSubadmin(formData);
        Swal.fire("Success", "Subadmin created successfully", "success");
      }
      setShowModal(false);
      fetchSubadmins();
    } catch (error) {
      console.error("Error saving subadmin:", error);
      Swal.fire("Error", error.response?.data?.message || "Failed to save subadmin", "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await deleteSubadmin(id);
        Swal.fire("Deleted!", "Subadmin deleted successfully", "success");
        fetchSubadmins();
      } catch (error) {
        console.error("Error deleting subadmin:", error);
        Swal.fire("Error", "Failed to delete subadmin", "error");
      }
    }
  };

  return (
    <NewLayout>
      <div className="pan-rhs">
        <div className="container-fluid py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Subadmin Management</h2>
        <Button variant="primary" onClick={() => handleShowModal()}>
          + Add New Subadmin
        </Button>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <Table responsive hover className="mb-0">
            <thead className="bg-light">
              <tr>
                <th>S.No</th>
                <th>Email</th>
                <th>Role</th>
                <th>Permissions</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">Loading...</td>
                </tr>
              ) : currentRecords.length > 0 ? (
                currentRecords.map((admin,index) => (
                  <tr key={admin._id}>
                    <td>{firstIndex + index + 1}</td>
                    <td>{admin.adminEmail}</td>
                    <td>
                      <Badge bg="info">{admin.role}</Badge>
                    </td>
                    <td>
                      {admin.permissions?.length > 0 ? (
                        admin.permissions.map((p) => (
                          <Badge bg="secondary" className="me-1 mb-1" key={p}>
                            {p}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted">No permissions</span>
                      )}
                    </td>
                    <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle as={CustomToggle} id={`dropdown-custom-components-${admin._id}`}>
                          <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu popperConfig={{ strategy: "fixed" }}>
                          <Dropdown.Item onClick={() => handleShowModal(admin)}>
                            <i className="fa fa-edit me-2 text-primary"></i> Edit
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDelete(admin._id)} className="text-danger">
                            <i className="fa fa-trash me-2"></i> Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    No subadmins found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        
        {totalPages > 1 && (
          <div className="card-footer d-flex justify-content-between align-items-center bg-white border-top p-3">
            <span className="text-muted small">
              Showing {firstIndex + 1} to {Math.min(lastIndex, subadmins.length)} of {subadmins.length} entries
            </span>
            <div>
              <Button 
                variant="outline-secondary" 
                size="sm" 
                className="me-2" 
                onClick={handlePrevPage} 
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button 
                variant="outline-secondary" 
                size="sm" 
                onClick={handleNextPage} 
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Subadmin" : "Add Subadmin"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password {isEditing && "(Leave empty to keep current)"}</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required={!isEditing}
                placeholder="Enter password"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="d-block">Access Permissions</Form.Label>
              <div className="permissions-container" style={{ maxHeight: "400px", overflowY: "auto", overflowX: "hidden", paddingRight: "10px" }}>
                <Row>
                  {AVAILABLE_PERMISSIONS.map((perm) => (
                    <Col md={12} className="mb-3" key={perm.key}>
                      <Card className="border-0 shadow-sm">
                        <Card.Header className="bg-light border-0 d-flex justify-content-between align-items-center py-2">
                          <span className="fw-bold text-primary">{perm.label}</span>
                          <Form.Check
                            type="switch"
                            id={`perm-${perm.key}`}
                            checked={formData.permissions.includes(perm.key)}
                            onChange={() => handlePermissionChange(perm.key)}
                          />
                        </Card.Header>
                        {perm.subPermissions && formData.permissions.includes(perm.key) && (
                          <Card.Body className="pt-2 pb-1 bg-white">
                            <Row>
                              {perm.subPermissions.map((subPerm) => (
                                <Col md={6} className="mb-3" key={subPerm.key}>
                                  <div className="d-flex align-items-center justify-content-between bg-light rounded p-2 border-start border-3 border-info">
                                    <Form.Check
                                      type="checkbox"
                                      id={`perm-${subPerm.key}`}
                                      label={<span className="fw-semibold text-secondary">{subPerm.label}</span>}
                                      checked={formData.permissions.includes(subPerm.key)}
                                      onChange={() => handlePermissionChange(subPerm.key)}
                                      className="mb-0"
                                    />
                                  </div>
                                  
                                  {subPerm.subPermissions && formData.permissions.includes(subPerm.key) && (
                                    <div className="ms-4 mt-2 ps-2 border-start border-1">
                                      {subPerm.subPermissions.map((nestedPerm) => (
                                        <div key={nestedPerm.key} className="mb-1 d-flex align-items-center">
                                          <Form.Check
                                            type="checkbox"
                                            id={`perm-${nestedPerm.key}`}
                                            label={<span className="small text-muted">{nestedPerm.label}</span>}
                                            checked={formData.permissions.includes(nestedPerm.key)}
                                            onChange={() => handlePermissionChange(nestedPerm.key)}
                                            className="mb-0"
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </Col>
                              ))}
                            </Row>
                          </Card.Body>
                        )}
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? "Update" : "Save"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
      </div>
    </NewLayout>
  );
};

export default AdminSubadmins;
