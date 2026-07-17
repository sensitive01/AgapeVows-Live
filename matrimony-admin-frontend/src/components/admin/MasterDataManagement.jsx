import React, { useState, useEffect } from "react";
import NewLayout from "./layout/NewLayout";
import { getAllMasterData, addMasterData, updateMasterData } from "../../api/service/adminServices";

const MasterDataManagement = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("caste");
  const [newItems, setNewItems] = useState([""]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [message, setMessage] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getAllMasterData();
      if (res.data?.success) {
        setDataList(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching master data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const validItems = newItems.filter(item => item.trim() !== "");
    if (validItems.length === 0) return;

    try {
      await Promise.all(
        validItems.map(item => addMasterData({ name: item.trim(), type: activeTab }))
      );
      setMessage(`${validItems.length} ${activeTab}(s) added successfully!`);
      setNewItems([""]);
      setIsAdding(false);
      fetchData();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || `Failed to add ${activeTab}`);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleUpdate = async (id, newStatus, currentName) => {
    try {
      let payload = {};
      if (newStatus !== undefined) payload.isActive = newStatus;
      if (currentName !== undefined) payload.name = currentName;

      const res = await updateMasterData(id, payload);
      if (res.data?.success) {
        setEditingId(null);
        fetchData();
      }
    } catch (err) {
      console.error("Error updating", err);
      alert("Failed to update");
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when tab or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm]);

  const filteredData = dataList
    .filter((item) => item.type === activeTab)
    .filter((item) => {
      if (statusFilter === "active") return item.isActive;
      if (statusFilter === "inactive") return !item.isActive;
      return true;
    })
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <NewLayout>
      <div className="pan-rhs">
        <div className="row main-head">
          <div className="col-md-4">
            <div className="tit">
              <h1>Master Data</h1>
            </div>
          </div>
          <div className="col-md-8">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Master Data
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="box-com box-qui box-lig box-form">
              {message && <div className="alert alert-info">{message}</div>}

              <ul className="nav nav-tabs" style={{ marginBottom: "20px" }}>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 'caste' ? 'active' : ''}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setActiveTab('caste')}
                  >
                    Castes
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 'denomination' ? 'active' : ''}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setActiveTab('denomination')}
                  >
                    Denominations
                  </a>
                </li>
              </ul>

              <div className="form-inp">
                {/* Header row with Add button and Filters aligned */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "15px" }}>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => {
                      setIsAdding(!isAdding);
                      if (!isAdding) setNewItems([""]);
                    }}
                  >
                    {isAdding ? "Cancel Addition" : `Add New ${activeTab === "caste" ? "Caste" : "Denomination"}`}
                  </button>
                  
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", flex: "1", justifyContent: "flex-end" }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={`Search ${activeTab}s...`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ maxWidth: "250px" }}
                    />
                    <select 
                      className="form-control" 
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      style={{ maxWidth: "150px" }}
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                {/* Expansion panel for Adding Items */}
                {isAdding && (
                  <div className="card p-4 mb-4 shadow-sm" style={{ backgroundColor: "#f8f9fa", border: "1px solid #ddd" }}>
                    <h5 className="mb-3">Add {activeTab === "caste" ? "Caste(s)" : "Denomination(s)"}</h5>
                    <form onSubmit={handleAdd} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                      {newItems.map((item, index) => (
                        <div key={index} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={`Enter ${activeTab} name`}
                            value={item}
                            onChange={(e) => {
                              const updatedItems = [...newItems];
                              updatedItems[index] = e.target.value;
                              setNewItems(updatedItems);
                            }}
                            required
                            style={{ maxWidth: "400px" }}
                          />
                          {index === newItems.length - 1 && (
                            <button 
                              type="button" 
                              className="btn btn-success" 
                              style={{ width: "35px", height: "35px", display: "flex", justifyContent: "center", alignItems: "center", padding: "0" }}
                              onClick={() => setNewItems([...newItems, ""])}
                              title="Add another row"
                            >
                              +
                            </button>
                          )}
                          {newItems.length > 1 && (
                            <button 
                              type="button" 
                              className="btn btn-danger" 
                              style={{ width: "35px", height: "35px", display: "flex", justifyContent: "center", alignItems: "center", padding: "0" }}
                              onClick={() => {
                                const updatedItems = [...newItems];
                                updatedItems.splice(index, 1);
                                setNewItems(updatedItems);
                              }}
                              title="Remove row"
                            >
                              -
                            </button>
                          )}
                        </div>
                      ))}
                      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                        <button type="submit" className="btn btn-primary px-4">
                          Save
                        </button>
                        <button type="button" className="btn btn-secondary px-4" onClick={() => { setIsAdding(false); setNewItems([""]); }}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th className="text-center" style={{ width: "80px" }}>S.No</th>
                          <th>Name</th>
                          <th className="text-center" style={{ width: "120px" }}>Status</th>
                          <th className="text-center" style={{ width: "200px" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="text-center">No data found</td>
                          </tr>
                        ) : (
                          paginatedData.map((item, index) => (
                            <tr key={item._id}>
                              <td className="text-center font-weight-bold">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                              <td>
                                {editingId === item._id ? (
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                  />
                                ) : (
                                  item.name
                                )}
                              </td>
                              <td className="text-center align-middle">
                                <span className={`badge ${item.isActive ? "bg-success" : "bg-danger"}`}>
                                  {item.isActive ? "Active" : "Inactive"}
                                </span>
                              </td>
                              <td className="text-center align-middle">
                                {editingId === item._id ? (
                                  <>
                                    <button
                                      className="btn btn-sm btn-success mr-2"
                                      onClick={() => handleUpdate(item._id, undefined, editName)}
                                    >
                                      Save
                                    </button>
                                    <button
                                      className="btn btn-sm btn-secondary"
                                      onClick={() => setEditingId(null)}
                                    >
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      className="btn btn-sm btn-info mr-2"
                                      onClick={() => {
                                        setEditingId(item._id);
                                        setEditName(item.name);
                                      }}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className={`btn btn-sm ${item.isActive ? 'btn-warning' : 'btn-success'}`}
                                      onClick={() => handleUpdate(item._id, !item.isActive)}
                                    >
                                      {item.isActive ? "Deactivate" : "Activate"}
                                    </button>
                                  </>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>

                    {totalPages > 1 && (
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
                        <button 
                          className="btn btn-secondary" 
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage(prev => prev - 1)}
                        >
                          Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button 
                          className="btn btn-secondary" 
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage(prev => prev + 1)}
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </NewLayout>
  );
};

export default MasterDataManagement;
