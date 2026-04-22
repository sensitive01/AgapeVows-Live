import React, { useEffect, useState } from "react";
import NewLayout from "./layout/NewLayout";
import { getDeletedUsers, restoreUserById, permanentDeleteUserById } from "../../api/service/adminServices";
import { useNavigate } from "react-router-dom";

const AdminDeletedUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDeletedUsers();
        if (response.status === 200) {
          setUsers(response.data.data);
          setFilteredUsers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching deleted users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userMobile?.includes(searchTerm)
    );

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users]);

  const handleRestore = async (id) => {
    const confirmRestore = window.confirm("Restore this user?");
    if (!confirmRestore) return;

    try {
      const response = await restoreUserById(id);
      if (response.status === 200) {
        alert("User restored successfully");

        setUsers((prev) => prev.filter((u) => u._id !== id));
        setFilteredUsers((prev) => prev.filter((u) => u._id !== id));
      }
    } catch (error) {
      alert("Restore failed");
    }
  };

  const handlePermanentDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to PERMANENTLY delete this user? This action cannot be undone and all user data will be removed from the database."
    );
    if (!confirmDelete) return;

    try {
      const response = await permanentDeleteUserById(id);
      if (response.status === 200) {
        alert("User permanently deleted from backend");

        setUsers((prev) => prev.filter((u) => u._id !== id));
        setFilteredUsers((prev) => prev.filter((u) => u._id !== id));
      }
    } catch (error) {
      console.error("Permanent delete failed:", error);
      alert("Permanent delete failed");
    }
  };

  const getInitials = (name) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase();

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <NewLayout>
      <div className="row">
        <div className="col-md-12">
          <div className="box-com box-qui box-lig box-tab">
            <div className="tit">
              <h3>Deleted Users</h3>
              <p>Total deleted profiles ({filteredUsers.length} users)</p>
            </div>

            {/* Search */}
            <div className="row mb-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search deleted users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-secondary w-100"
                  onClick={() => setSearchTerm("")}
                >
                  Clear
                </button>
              </div>
            </div>

            {loading ? (
              <div className="text-center p-4">
                <div className="spinner-border" role="status"></div>
              </div>
            ) : (
              <div className="table-responsive" style={{ height: "70vh", overflowY: "auto" }}>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>S.NO</th>
                      <th>PROFILE</th>
                      <th className="d-none d-md-table-cell">PHONE</th>
                      <th className="d-none d-lg-table-cell">CITY</th>
                      <th className="text-center">MORE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((user, index) => {
                        const serialNumber = indexOfFirstItem + index + 1;
                        return (
                          <tr key={user._id}>
                            <td>{serialNumber}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                {user.profileImage ? (
                                  <img
                                    src={user.profileImage}
                                    alt={user.userName}
                                    className="rounded-circle me-3"
                                    style={{ width: 40, height: 40, objectFit: "cover" }}
                                  />
                                ) : (
                                  <div
                                    className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center me-3"
                                    style={{ width: 40, height: 40 }}
                                  >
                                    {getInitials(user.userName)}
                                  </div>
                                )}
                                <div>
                                  <h6 className="mb-0 fw-bold">
                                    {user.userName}
                                  </h6>
                                  <small className="text-muted">
                                    {user.userEmail}
                                  </small>
                                </div>
                              </div>
                            </td>
                            <td className="d-none d-md-table-cell">
                              {user.userMobile}
                            </td>
                            <td className="d-none d-lg-table-cell">
                              {user.city}
                            </td>
                            <td className="text-center">
                              <div className="d-flex gap-2 justify-content-center">
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={() => handleRestore(user._id)}
                                >
                                  <i className="fa fa-undo me-1"></i>
                                  Restore
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handlePermanentDelete(user._id)}
                                >
                                  <i className="fa fa-trash me-1"></i>
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-5">
                          No deleted users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </NewLayout>
  );
};

export default AdminDeletedUsers;
