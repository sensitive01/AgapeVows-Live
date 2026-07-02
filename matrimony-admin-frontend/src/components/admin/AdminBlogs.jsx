import React, { useEffect, useState } from "react";
import NewLayout from "./layout/NewLayout";
import CustomTable from "./common/CustomTable";
import {
  addNewBlog,
  getAllBlogs,
  editBlog,
  deleteBlog,
} from "../../api/service/adminServices";
import { confirmAction, showAlert } from "../../utils/alertService";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState("Published");
  const [loading, setLoading] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const initialState = {
    id: null,
    title: "",
    category: "",
    sections: [{ heading: "", content: "", imageFile: null }],
    authorName: "",
    authorRole: "",
    coverImage: "",
    authorPhoto: "",
    coverImageFile: null,
    authorPhotoFile: null,
    status: "Published",
  };

  const [currentBlog, setCurrentBlog] = useState(initialState);

  // ================= FETCH =================
  const fetchBlogs = async () => {
    const res = await getAllBlogs();
    if (res?.data?.success) {
      setBlogs(res.data.data);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(
    (blog) => blog.status === activeTab
  );

  // ================= ADD =================
  const handleAddNew = () => {
    setModalMode("add");
    setCurrentBlog(initialState);
    setError("");
  };

  // ================= EDIT =================
  const handleEdit = (blog) => {
    setModalMode("edit");
    setCurrentBlog({
      ...blog,
      id: blog._id,
      sections: blog.sections && blog.sections.length > 0 
        ? blog.sections.map(s => ({ ...s, imageFile: null })) 
        : [{ heading: "", content: "", imageFile: null }]
    });
    setError("");
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const confirmed = await confirmAction({
      title: "Delete Blog?",
      text: "Are you sure you want to delete this blog?",
      icon: "warning",
      confirmButtonText: "Yes, Delete",
    });

    if (confirmed) {
      await deleteBlog(id);
      fetchBlogs();
      showAlert({
        title: "Deleted",
        text: "Blog deleted successfully!",
        icon: "success",
      });
    }
  };

  // ================= VALIDATION =================
  const validateForm = () => {
    if (
      !currentBlog.title.trim() ||
      !currentBlog.category.trim() ||
      !currentBlog.authorName.trim() ||
      !currentBlog.authorRole.trim()
    ) {
      return "Please fill all required fields.";
    }

    for (let i = 0; i < currentBlog.sections.length; i++) {
      if (!currentBlog.sections[i].heading.trim() || !currentBlog.sections[i].content.trim()) {
        return `Please fill heading and content for section ${i + 1}.`;
      }
    }

    if (modalMode === "add") {
      if (!currentBlog.coverImageFile || !currentBlog.authorPhotoFile) {
        return "Please upload both Cover Image and Author Photo.";
      }
    }

    return null;
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", currentBlog.title);
    formData.append("category", currentBlog.category);
    formData.append("authorName", currentBlog.authorName);
    formData.append("authorRole", currentBlog.authorRole);
    formData.append("status", currentBlog.status);

    const sectionsToSave = currentBlog.sections.map(s => ({
      heading: s.heading,
      content: s.content,
      image: s.image || ""
    }));
    formData.append("sections", JSON.stringify(sectionsToSave));

    currentBlog.sections.forEach((s, index) => {
      if (s.imageFile) {
        formData.append(`sectionImage_${index}`, s.imageFile);
      }
    });

    if (currentBlog.coverImageFile) {
      formData.append("coverImage", currentBlog.coverImageFile);
    }

    if (currentBlog.authorPhotoFile) {
      formData.append("authorPhoto", currentBlog.authorPhotoFile);
    }

    if (modalMode === "add") {
      await addNewBlog(formData);
      showAlert({
        title: "Published",
        text: "Blog published successfully!",
        icon: "success",
      });
    } else {
      await editBlog(currentBlog.id, formData);
      showAlert({
        title: "Updated",
        text: "Blog updated successfully!",
        icon: "success",
      });
    }

    fetchBlogs();
    setCurrentBlog(initialState);
    window.$("#blogsModal").modal("hide");
    setLoading(false);

    setTimeout(() => setSuccess(""), 3000);
  };

  const columns = [
    { name: "S.No", selector: (row, index) => index + 1, sortable: false, width: "60px", center: true },
    {
      name: "Cover Image",
      center: true,
      cell: row => (
        <img
          src={row.coverImage}
          alt=""
          width="70"
          height="50"
          style={{
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
      )
    },
    { 
      name: "Title", 
      selector: row => row.title, 
      sortable: true, 
      wrap: true,
      cell: row => <div style={{ fontWeight: "600", wordBreak: "normal" }}>{row.title}</div> 
    },
    { 
      name: "Category", 
      selector: row => row.category, 
      sortable: true,
      wrap: true,
      cell: row => <div style={{ wordBreak: "normal" }}>{row.category}</div>
    },
    {
      name: "Content",
      cell: row => (
        <>
          <span
            style={{
              cursor: "pointer",
              color: "#4e73df",
              fontWeight: 500,
            }}
            data-bs-toggle="modal"
            data-bs-target={`#contentModal${row._id}`}
          >
            View Content
          </span>

          <div
            className="modal fade"
            id={`contentModal${row._id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content p-4 rounded-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                <div
                  style={{
                    background: "#f1f5ff",
                    padding: "20px",
                    borderRadius: "20px",
                    position: "relative",
                  }}
                >
                  <h5 className="fw-bold mb-4 border-bottom pb-2">
                    {row.title}
                  </h5>
                  
                  {row.sections && row.sections.map((sec, idx) => (
                    <div key={idx} className="mb-4 pb-3 border-bottom">
                      <h6 className="fw-bold text-primary">{sec.heading}</h6>
                      <p style={{ whiteSpace: "pre-line", lineHeight: "1.7" }}>{sec.content}</p>
                      {sec.image && (
                        <img 
                          src={sec.image} 
                          alt="" 
                          style={{ maxWidth: '100%', borderRadius: 8, marginTop: 10, maxHeight: '300px', objectFit: 'cover' }} 
                        />
                      )}
                    </div>
                  ))}
                  
                  {(!row.sections || row.sections.length === 0) && (
                    <p style={{ whiteSpace: "pre-line", lineHeight: "1.7" }}>{row.content}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )
    },
    {
      name: "Author Photo",
      center: true,
      cell: row => (
        <img
          src={row.authorPhoto}
          alt=""
          width="45"
          height="45"
          style={{
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      )
    },
    { 
      name: "Author", 
      selector: row => row.authorName, 
      sortable: true,
      wrap: true,
      cell: row => <div style={{ wordBreak: "normal" }}>{row.authorName}</div>
    },
    { 
      name: "Role", 
      selector: row => row.authorRole, 
      sortable: true,
      wrap: true,
      cell: row => <div style={{ wordBreak: "normal" }}>{row.authorRole}</div>
    },
    {
      name: "Status",
      selector: row => row.status,
      sortable: true,
      cell: row => (
        <span
          className={`badge px-3 py-2 ${
            row.status === "Published"
              ? "bg-success"
              : "bg-secondary"
          }`}
        >
          {row.status}
        </span>
      )
    },
    {
      name: "Created",
      selector: row => row.createdAt,
      sortable: true,
      format: row => new Date(row.createdAt).toLocaleDateString()
    },
    {
      name: "Actions",
      center: true,
      cell: (row, index) => (
        <div className={`dropdown ${index >= 10 ? "dropup" : ""}`}>
          <button
            type="button"
            data-bs-toggle="dropdown"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: "#eef1f7",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            &#8230;
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <li>
              <button
                type="button"
                className="dropdown-item"
                data-bs-toggle="modal"
                data-bs-target="#blogsModal"
                onClick={(e) => {
                  e.preventDefault();
                  handleEdit(row);
                }}
              >
                ✏️ Edit
              </button>
            </li>
            <li>
              <button
                type="button"
                className="dropdown-item text-danger"
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(row._id);
                }}
              >
                🗑 Delete
              </button>
            </li>
          </ul>
        </div>
      )
    }
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#e0e0e0",
        color: "#000",
        borderBottom: "2px solid #cfcfcf",
        fontWeight: "600",
        fontSize: "13px",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        verticalAlign: "middle",
        padding: "10px",
      },
    },
  };

return (
  <NewLayout>
    <div
      style={{
        marginLeft: "260px",
        padding: "40px",
        minHeight: "100vh",
        background: "#f4f6f9",
      }}
    >
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Blog Management</h2>
          <p className="text-muted mb-0">
            Manage all blog posts and content here
          </p>
        </div>

        <button
          className="btn btn-primary rounded-pill px-4 shadow-sm"
          data-bs-toggle="modal"
          data-bs-target="#blogsModal"
          onClick={handleAddNew}
        >
          + Add Blog
        </button>
      </div>

      {success && (
        <div className="alert alert-success shadow-sm">{success}</div>
      )}
{/* TABLE CARD */}
<div className="card border-0 shadow-sm rounded-4">
  <div className="card-body p-0">

    <div className="table-responsive">
      <CustomTable itemsPerPage={10}
        columns={columns}
        data={filteredBlogs}
        pagination
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
        paginationPerPage={5}
        highlightOnHover
        customStyles={customStyles}
        noDataComponent={<div className="py-4 text-muted text-center">No blogs found.</div>}
      />
    </div>
  </div>
</div>
      {/* MODAL (UNCHANGED LOGIC BELOW) */}

        {/* ================= MODAL ================= */}
        <div className="modal fade" id="blogsModal">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content p-4 rounded-4">

              <h4 className="fw-bold mb-3 text-primary">
                {modalMode === "add" ? "Create New Blog" : "Edit Blog"}
              </h4>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                <input
                  type="text"
                  placeholder="Blog Title"
                  className="form-control mb-3"
                  value={currentBlog.title}
                  onChange={(e) =>
                    setCurrentBlog({ ...currentBlog, title: e.target.value })
                  }
                />

                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder="Category"
                      className="form-control mb-3"
                      value={currentBlog.category}
                      onChange={(e) =>
                        setCurrentBlog({
                          ...currentBlog,
                          category: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder="Author Name"
                      className="form-control mb-3"
                      value={currentBlog.authorName}
                      onChange={(e) =>
                        setCurrentBlog({
                          ...currentBlog,
                          authorName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Author Role"
                  className="form-control mb-3"
                  value={currentBlog.authorRole}
                  onChange={(e) =>
                    setCurrentBlog({
                      ...currentBlog,
                      authorRole: e.target.value,
                    })
                  }
                />

                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="fw-bold fs-5">Blog Sections</label>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => setCurrentBlog({...currentBlog, sections: [...currentBlog.sections, { heading: "", content: "", imageFile: null }]})}
                    >
                      + Add Section
                    </button>
                  </div>
                  {currentBlog.sections.map((section, index) => (
                    <div key={index} className="p-3 border rounded mb-3 bg-light position-relative">
                      {currentBlog.sections.length > 1 && (
                        <button
                          type="button"
                          className="btn-close position-absolute top-0 end-0 m-2"
                          onClick={() => {
                            const newSections = [...currentBlog.sections];
                            newSections.splice(index, 1);
                            setCurrentBlog({...currentBlog, sections: newSections});
                          }}
                        ></button>
                      )}
                      <input
                        type="text"
                        placeholder="Section Heading"
                        className="form-control mb-3 fw-bold"
                        value={section.heading}
                        onChange={(e) => {
                          const newSections = [...currentBlog.sections];
                          newSections[index].heading = e.target.value;
                          setCurrentBlog({...currentBlog, sections: newSections});
                        }}
                      />
                      <textarea
                        rows="4"
                        placeholder="Section Content"
                        className="form-control mb-3"
                        value={section.content}
                        onChange={(e) => {
                          const newSections = [...currentBlog.sections];
                          newSections[index].content = e.target.value;
                          setCurrentBlog({...currentBlog, sections: newSections});
                        }}
                      />
                      <label className="fw-semibold small">Section Image (Optional)</label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => {
                          const newSections = [...currentBlog.sections];
                          newSections[index].imageFile = e.target.files[0];
                          setCurrentBlog({...currentBlog, sections: newSections});
                        }}
                      />
                      {section.image && !section.imageFile && (
                        <div className="mt-2 text-muted small">Current image uploaded. Upload new to replace.</div>
                      )}
                    </div>
                  ))}
                </div>

                <label className="fw-semibold">Blog Cover Image</label>
                <input
                  type="file"
                  className="form-control mb-3"
                  accept="image/*"
                  onChange={(e) =>
                    setCurrentBlog({
                      ...currentBlog,
                      coverImageFile: e.target.files[0],
                    })
                  }
                />

                <label className="fw-semibold">Author Photo</label>
                <input
                  type="file"
                  className="form-control mb-4"
                  accept="image/*"
                  onChange={(e) =>
                    setCurrentBlog({
                      ...currentBlog,
                      authorPhotoFile: e.target.files[0],
                    })
                  }
                />

                <button
                  type="submit"
                  className="btn btn-primary w-100 rounded-pill py-2 shadow-sm"
                  disabled={loading}
                >
                  {loading
                    ? "Processing..."
                    : modalMode === "add"
                    ? "Publish Blog"
                    : "Update Blog"}
                </button>

              </form>
            </div>
          </div>
        </div>

      </div>
    </NewLayout>
  );
};

export default AdminBlogs;
