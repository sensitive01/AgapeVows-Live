// import React, { useEffect, useState } from "react";
// import NewLayout from "./layout/NewLayout";
// import {
//   addNewBlog,
//   getAllBlogs,
//   editBlog,
//   deleteBlog,
// } from "../../api/service/adminServices";

// const AdminBlogs = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [activeTab, setActiveTab] = useState("Published");
//   const [loading, setLoading] = useState(false);
//   const [modalMode, setModalMode] = useState("add");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const initialState = {
//     id: null,
//     title: "",
//     category: "",
//     content: "",
//     authorName: "",
//     authorRole: "",
//     coverImage: "",
//     authorPhoto: "",
//     coverImageFile: null,
//     authorPhotoFile: null,
//     status: "Published",
//   };

//   const [currentBlog, setCurrentBlog] = useState(initialState);

//   // ================= FETCH =================
//   const fetchBlogs = async () => {
//     const res = await getAllBlogs();
//     if (res?.data?.success) {
//       setBlogs(res.data.data);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const filteredBlogs = blogs.filter(
//     (blog) => blog.status === activeTab
//   );

//   // ================= ADD =================
//   const handleAddNew = () => {
//     setModalMode("add");
//     setCurrentBlog(initialState);
//     setError("");
//   };

//   // ================= EDIT =================
//   const handleEdit = (blog) => {
//     setModalMode("edit");
//     setCurrentBlog({
//       ...blog,
//       id: blog._id,
//     });
//     setError("");
//   };

//   // ================= DELETE =================
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure to delete this blog?")) {
//       await deleteBlog(id);
//       fetchBlogs();
//       setSuccess("Blog deleted successfully!");
//       setTimeout(() => setSuccess(""), 3000);
//     }
//   };

//   // ================= VALIDATION =================
//   const validateForm = () => {
//     if (
//       !currentBlog.title.trim() ||
//       !currentBlog.category.trim() ||
//       !currentBlog.content.trim() ||
//       !currentBlog.authorName.trim() ||
//       !currentBlog.authorRole.trim()
//     ) {
//       return "Please fill all fields.";
//     }

//     if (modalMode === "add") {
//       if (!currentBlog.coverImageFile || !currentBlog.authorPhotoFile) {
//         return "Please upload both Cover Image and Author Photo.";
//       }
//     }

//     return null;
//   };

//   // ================= SUBMIT =================
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     setLoading(true);

//     const formData = new FormData();
//     formData.append("title", currentBlog.title);
//     formData.append("category", currentBlog.category);
//     formData.append("content", currentBlog.content);
//     formData.append("authorName", currentBlog.authorName);
//     formData.append("authorRole", currentBlog.authorRole);
//     formData.append("status", currentBlog.status);

//     if (currentBlog.coverImageFile) {
//       formData.append("coverImage", currentBlog.coverImageFile);
//     }

//     if (currentBlog.authorPhotoFile) {
//       formData.append("authorPhoto", currentBlog.authorPhotoFile);
//     }

//     if (modalMode === "add") {
//       await addNewBlog(formData);
//       setSuccess("Blog published successfully!");
//     } else {
//       await editBlog(currentBlog.id, formData);
//       setSuccess("Blog updated successfully!");
//     }

//     fetchBlogs();
//     setCurrentBlog(initialState);
//     window.$("#blogsModal").modal("hide");
//     setLoading(false);

//     setTimeout(() => setSuccess(""), 3000);
//   };

//   return (
//     <NewLayout>
//       {/* 🔥 MAIN WRAPPER WITH SIDEBAR GAP */}
//       <div
//         style={{
//           marginLeft: "260px",   // sidebar width gap
//           padding: "40px 40px",
//           minHeight: "100vh",
//           background: "#f8f9fa",
//         }}
//       >
//         {/* HEADER */}
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h2 className="fw-bold">Blog Management</h2>
//           <button
//             className="btn btn-primary rounded-pill px-4 shadow-sm"
//             data-bs-toggle="modal"
//             data-bs-target="#blogsModal"
//             onClick={handleAddNew}
//           >
//             + Add Blog
//           </button>
//         </div>

//         {/* SUCCESS MESSAGE */}
//         {success && (
//           <div className="alert alert-success shadow-sm">
//             {success}
//           </div>
//         )}

//         {/* TABLE CARD */}
//         <div className="card shadow-sm border-0 rounded-4">
//           <div className="table-responsive">
//             <table className="table align-middle mb-0">
//               <thead className="table-light">
//                 <tr>
//                   <th>S.No</th>
//                   <th>Cover</th>
//                   <th>Title</th>
//                   <th>Category</th>
//                   <th>Author Photo</th>
//                   <th>Author</th>
//                   <th>Role</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filteredBlogs.length > 0 ? (
//                   filteredBlogs.map((blog, index) => (
//                     <tr key={blog._id}>
//                       <td>{index + 1}</td>

//                       <td>
//                         <img
//                           src={blog.coverImage}
//                           alt=""
//                           width="75"
//                           height="55"
//                           style={{ objectFit: "cover", borderRadius: 10 }}
//                         />
//                       </td>

//                       <td className="fw-semibold">{blog.title}</td>
//                       <td>{blog.category}</td>

//                       <td>
//                         <img
//                           src={blog.authorPhoto}
//                           alt=""
//                           width="45"
//                           height="45"
//                           style={{
//                             borderRadius: "50%",
//                             objectFit: "cover",
//                           }}
//                         />
//                       </td>

//                       <td>{blog.authorName}</td>
//                       <td>{blog.authorRole}</td>

//                       <td>
//                         <span
//                           className={`badge px-3 py-2 ${
//                             blog.status === "Published"
//                               ? "bg-success"
//                               : "bg-secondary"
//                           }`}
//                         >
//                           {blog.status}
//                         </span>
//                       </td>

//                       <td>
//                         <button
//                           className="btn btn-sm btn-warning me-2"
//                           data-bs-toggle="modal"
//                           data-bs-target="#blogsModal"
//                           onClick={() => handleEdit(blog)}
//                         >
//                           Edit
//                         </button>

//                         <button
//                           className="btn btn-sm btn-danger"
//                           onClick={() => handleDelete(blog._id)}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="9" className="text-center py-4 text-muted">
//                       No blogs found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* ================= MODAL ================= */}
//         <div className="modal fade" id="blogsModal">
//           <div className="modal-dialog modal-lg modal-dialog-centered">
//             <div className="modal-content p-4 rounded-4">

//               <h4 className="fw-bold mb-3 text-primary">
//                 {modalMode === "add" ? "Create New Blog" : "Edit Blog"}
//               </h4>

//               {error && (
//                 <div className="alert alert-danger">
//                   {error}
//                 </div>
//               )}

//               <form onSubmit={handleSubmit}>

//                 <input
//                   type="text"
//                   placeholder="Blog Title"
//                   className="form-control mb-3"
//                   value={currentBlog.title}
//                   onChange={(e) =>
//                     setCurrentBlog({ ...currentBlog, title: e.target.value })
//                   }
//                 />

//                 <div className="row">
//                   <div className="col-md-6">
//                     <input
//                       type="text"
//                       placeholder="Category"
//                       className="form-control mb-3"
//                       value={currentBlog.category}
//                       onChange={(e) =>
//                         setCurrentBlog({
//                           ...currentBlog,
//                           category: e.target.value,
//                         })
//                       }
//                     />
//                   </div>

//                   <div className="col-md-6">
//                     <input
//                       type="text"
//                       placeholder="Author Name"
//                       className="form-control mb-3"
//                       value={currentBlog.authorName}
//                       onChange={(e) =>
//                         setCurrentBlog({
//                           ...currentBlog,
//                           authorName: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                 </div>

//                 <input
//                   type="text"
//                   placeholder="Author Role"
//                   className="form-control mb-3"
//                   value={currentBlog.authorRole}
//                   onChange={(e) =>
//                     setCurrentBlog({
//                       ...currentBlog,
//                       authorRole: e.target.value,
//                     })
//                   }
//                 />

//                 <textarea
//                   rows="5"
//                   placeholder="Blog Content"
//                   className="form-control mb-3"
//                   value={currentBlog.content}
//                   onChange={(e) =>
//                     setCurrentBlog({
//                       ...currentBlog,
//                       content: e.target.value,
//                     })
//                   }
//                 />

//                 <label className="fw-semibold">Blog Cover Image</label>
//                 <input
//                   type="file"
//                   className="form-control mb-3"
//                   accept="image/*"
//                   onChange={(e) =>
//                     setCurrentBlog({
//                       ...currentBlog,
//                       coverImageFile: e.target.files[0],
//                     })
//                   }
//                 />

//                 <label className="fw-semibold">Author Photo</label>
//                 <input
//                   type="file"
//                   className="form-control mb-4"
//                   accept="image/*"
//                   onChange={(e) =>
//                     setCurrentBlog({
//                       ...currentBlog,
//                       authorPhotoFile: e.target.files[0],
//                     })
//                   }
//                 />

//                 <button
//                   type="submit"
//                   className="btn btn-primary w-100 rounded-pill py-2 shadow-sm"
//                   disabled={loading}
//                 >
//                   {loading
//                     ? "Processing..."
//                     : modalMode === "add"
//                     ? "Publish Blog"
//                     : "Update Blog"}
//                 </button>

//               </form>
//             </div>
//           </div>
//         </div>

//       </div>
//     </NewLayout>
//   );
// };

// export default AdminBlogs;




import React, { useEffect, useState } from "react";
import NewLayout from "./layout/NewLayout";
import {
  addNewBlog,
  getAllBlogs,
  editBlog,
  deleteBlog,
} from "../../api/service/adminServices";

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
    content: "",
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
    });
    setError("");
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this blog?")) {
      await deleteBlog(id);
      fetchBlogs();
      setSuccess("Blog deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  // ================= VALIDATION =================
  const validateForm = () => {
    if (
      !currentBlog.title.trim() ||
      !currentBlog.category.trim() ||
      !currentBlog.content.trim() ||
      !currentBlog.authorName.trim() ||
      !currentBlog.authorRole.trim()
    ) {
      return "Please fill all fields.";
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
    formData.append("content", currentBlog.content);
    formData.append("authorName", currentBlog.authorName);
    formData.append("authorRole", currentBlog.authorRole);
    formData.append("status", currentBlog.status);

    if (currentBlog.coverImageFile) {
      formData.append("coverImage", currentBlog.coverImageFile);
    }

    if (currentBlog.authorPhotoFile) {
      formData.append("authorPhoto", currentBlog.authorPhotoFile);
    }

    if (modalMode === "add") {
      await addNewBlog(formData);
      setSuccess("Blog published successfully!");
    } else {
      await editBlog(currentBlog.id, formData);
      setSuccess("Blog updated successfully!");
    }

    fetchBlogs();
    setCurrentBlog(initialState);
    window.$("#blogsModal").modal("hide");
    setLoading(false);

    setTimeout(() => setSuccess(""), 3000);
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

    <div >
      <table className="table align-middle mb-0 text-center">

        {/* HEADER COLOR CHANGED */}
       <thead>
  <tr>
    {[
      "S.No",
      "Cover Image",
      "Title",
      "Category",
      "Content",
      "Author Photo",
      "Author",
      "Role",
      "Status",
      "Created",
      "Actions",
    ].map((head, index) => (
      <th
        key={index}
        style={{
          backgroundColor: "#e0e0e0",
          color: "#000",
          borderBottom: "2px solid #cfcfcf",
        }}
      >
        {head}
      </th>
    ))}
  </tr>
</thead>
        <tbody>
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, index) => (
              <tr key={blog._id}>

                <td>{index + 1}</td>

                <td>
                  <img
                    src={blog.coverImage}
                    alt=""
                    width="70"
                    height="50"
                    style={{
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                </td>

                <td className="fw-semibold">{blog.title}</td>

                <td>{blog.category}</td>

                {/* CLICKABLE CONTENT */}
                <td>
                  <span
                    style={{
                      cursor: "pointer",
                      color: "#4e73df",
                      fontWeight: 500,
                    }}
                    data-bs-toggle="modal"
                    data-bs-target={`#contentModal${blog._id}`}
                  >
                    View Content
                  </span>

                  {/* CONTENT MODAL */}
                  <div
                    className="modal fade"
                    id={`contentModal${blog._id}`}
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content p-4 rounded-4">

                        {/* CLOUD STYLE */}
                        <div
                          style={{
                            background: "#f1f5ff",
                            padding: "20px",
                            borderRadius: "20px",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              bottom: "-10px",
                              left: "30px",
                              width: "20px",
                              height: "20px",
                              background: "#f1f5ff",
                              transform: "rotate(45deg)",
                            }}
                          ></div>

                          <h5 className="fw-bold mb-3">
                            {blog.title}
                          </h5>

                          <p
                            style={{
                              whiteSpace: "pre-line",
                              lineHeight: "1.7",
                            }}
                          >
                            {blog.content}
                          </p>
                        </div>

                      </div>
                    </div>
                  </div>

                </td>

                <td>
                  <img
                    src={blog.authorPhoto}
                    alt=""
                    width="45"
                    height="45"
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </td>

                <td>{blog.authorName}</td>
                <td>{blog.authorRole}</td>

                <td>
                  <span
                    className={`badge px-3 py-2 ${
                      blog.status === "Published"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {blog.status}
                  </span>
                </td>

                <td>
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>

                {/* CIRCULAR 3 DOT ACTION */}
              <td>
  <div className="dropdown">
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
            handleEdit(blog);
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
            handleDelete(blog._id);
          }}
        >
          🗑 Delete
        </button>
      </li>
    </ul>
  </div>
</td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="py-4 text-muted text-center">
                No blogs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
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

                <textarea
                  rows="5"
                  placeholder="Blog Content"
                  className="form-control mb-3"
                  value={currentBlog.content}
                  onChange={(e) =>
                    setCurrentBlog({
                      ...currentBlog,
                      content: e.target.value,
                    })
                  }
                />

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