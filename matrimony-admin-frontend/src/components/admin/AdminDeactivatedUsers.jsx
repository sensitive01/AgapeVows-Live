import React, { useEffect, useState } from "react";
import NewLayout from "./layout/NewLayout";
import { getDeactivatedUsers, restoreUserById } from "../../api/service/adminServices";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { confirmAction, showAlert } from "../../utils/alertService";

const AdminDeactivatedUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDeactivatedUsers();
        if (response.status === 200) {
          setUsers(response.data.data);
          setFilteredUsers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching deactivated users:", error);
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
    const confirmed = await confirmAction({
      title: "Reactivate User?",
      text: "Are you sure you want to reactivate this profile?",
      icon: "question",
      confirmButtonText: "Yes, Reactivate",
    });

    if (!confirmed) return;

    try {
      const response = await restoreUserById(id);
      if (response.status === 200) {
        showAlert({
          title: "Reactivated!",
          text: "User profile reactivated successfully.",
          icon: "success",
        });

        setUsers((prev) => prev.filter((u) => u._id !== id));
        setFilteredUsers((prev) => prev.filter((u) => u._id !== id));
      }
    } catch (error) {
      showAlert({
        title: "Error",
        text: "Reactivation failed.",
        icon: "error",
      });
    }
  };

  const handleExport = () => {
    if (!filteredUsers || filteredUsers.length === 0) {
      showAlert({
        title: "No Data",
        text: "No data available to export.",
        icon: "info",
      });
      return;
    }

    const exportData = filteredUsers.map((user) => ({
      Name: user.userName,
      Email: user.userEmail,
      Mobile: user.userMobile,
      City: user.city,
      DeactivatedAt: user.deactivatedAt ? new Date(user.deactivatedAt).toLocaleDateString() : "N/A",
      Reason: user.deactivationReason || "N/A",
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Deactivated Users");
    XLSX.writeFile(wb, `Deactivated_Users_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const getInitials = (name) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase();

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers?.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = Math.ceil((filteredUsers?.length || 0) / itemsPerPage);

  return (
    <NewLayout>
      <div className="row">
        <div className="col-md-12">
          <div className="box-com box-qui box-lig box-tab">
            <div className="tit d-flex justify-content-between align-items-center">
              <div>
                <h3>Deactivated Users</h3>
                <p>Profiles deactivated by users ({filteredUsers.length} users)</p>
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-success btn-sm rounded-pill px-3 shadow-sm"
                  onClick={handleExport}
                >
                  <i className="fa fa-file-excel-o me-1"></i> Export List
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="row mb-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search deactivated users..."
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
                      <th>DEACTIVATED ON</th>
                      <th>REASON</th>
                      <th className="text-center">ACTION</th>
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
                                    className="rounded-circle bg-warning text-white d-flex align-items-center justify-content-center me-3"
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
                            <td>
                              {user.deactivatedAt ? new Date(user.deactivatedAt).toLocaleDateString() : "N/A"}
                            </td>
                            <td>
                              <div style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={user.deactivationReason}>
                                {user.deactivationReason || "No reason provided"}
                              </div>
                            </td>
                            <td className="text-center">
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handleRestore(user._id)}
                              >
                                <i className="fa fa-undo me-1"></i>
                                Reactivate
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-5">
                          No deactivated users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-3">
                <nav>
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
                    </li>
                    {[...Array(totalPages)].map((_, i) => (
                      <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </NewLayout>
  );
};

export default AdminDeactivatedUsers;
