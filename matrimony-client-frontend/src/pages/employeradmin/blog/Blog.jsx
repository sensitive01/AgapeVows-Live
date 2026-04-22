import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmployerAdminHeader from '../Layout/EmployerAdminHeader';
import EmployerAdminFooter from '../Layout/EmployerAdminFooter';
import { getAllBlogs, saveBlog, defaultBlogPosts } from '../../../../public/blogData';

const Blog = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);

  // Form data for adding/editing blogs
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    tags: '',
    content: '',
    status: 'Active',
    image: 'image-news03.jpg'
  });

  // Load blogs on component mount
  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    const allBlogs = getAllBlogs();
    setBlogs(allBlogs);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddBlog = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.content) {
      alert('Please fill all required fields');
      return;
    }

    const newBlog = {
      id: Date.now(),
      slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: formData.title,
      subtitle: formData.category,
      excerpt: formData.content.substring(0, 150) + '...',
      image: formData.image || 'image-news03.jpg',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      comments: 0,
      likes: '0',
      shares: '0',
      reviews: '0',
      authorImage: 'avatar-03.jpg',
      authorName: 'EdProfio Team',
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      content: formData.content,
      status: formData.status,
      category: formData.category
    };

    if (saveBlog(newBlog)) {
      alert('Blog added successfully!');
      setFormData({
        title: '',
        category: '',
        tags: '',
        content: '',
        status: 'Active',
        image: 'image-news03.jpg'
      });
      setShowAddModal(false);
      loadBlogs();
    } else {
      alert('Error saving blog');
    }
  };

  const handleEditBlog = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      category: blog.category || blog.subtitle,
      tags: blog.tags?.join(', ') || '',
      content: blog.content,
      status: blog.status || 'Active',
      image: blog.image
    });
    setShowEditModal(true);
  };

  const handleUpdateBlog = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.content) {
      alert('Please fill all required fields');
      return;
    }

    // Get all blogs
    const allBlogs = getAllBlogs();
    
    // Update the blog
    const updatedBlogs = allBlogs.map(blog => {
      if (blog.id === selectedBlog.id) {
        return {
          ...blog,
          title: formData.title,
          subtitle: formData.category,
          category: formData.category,
          excerpt: formData.content.substring(0, 150) + '...',
          tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
          content: formData.content,
          status: formData.status,
          image: formData.image,
          slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        };
      }
      return blog;
    });

    // Save updated blogs to localStorage
    const customBlogs = updatedBlogs.filter(blog => 
      !defaultBlogPosts.some(defaultBlog => defaultBlog.id === blog.id)
    );
    localStorage.setItem('customBlogs', JSON.stringify(customBlogs));

    alert('Blog updated successfully!');
    setShowEditModal(false);
    setSelectedBlog(null);
    loadBlogs();
  };

  const handleDeleteBlog = () => {
    if (!selectedBlog) return;

    // Get all blogs
    const allBlogs = getAllBlogs();
    
    // Filter out the blog to delete
    const remainingBlogs = allBlogs.filter(blog => blog.id !== selectedBlog.id);
    
    // Save remaining custom blogs to localStorage
    const customBlogs = remainingBlogs.filter(blog => 
      !defaultBlogPosts.some(defaultBlog => defaultBlog.id === blog.id)
    );
    localStorage.setItem('customBlogs', JSON.stringify(customBlogs));

    alert('Blog deleted successfully!');
    setShowDeleteModal(false);
    setSelectedBlog(null);
    loadBlogs();
  };

  const openDeleteModal = (blog) => {
    setSelectedBlog(blog);
    setShowDeleteModal(true);
  };

  return (
    <>
      <EmployerAdminHeader />
      <div className="content">
        {/* Breadcrumb */}
        <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
          <div className="my-auto mb-2">
            <h2 className="mb-1">Blogs ({blogs.length})</h2>
          </div>
          <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
            {/* <div className="me-3">
              <div className="input-icon-end position-relative">
                <input type="text" className="form-control date-range bookingrange" placeholder="dd/mm/yyyy - dd/mm/yyyy" />
                <span className="input-icon-addon">
                  <i className="ti ti-chevron-down"></i>
                </span>
              </div>
            </div> */}
            <div className="dropdown me-3">
              <button className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                Sort By : Last 7 Days
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <Link to="#" className="dropdown-item rounded-1">Recently Added</Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-item rounded-1">Ascending</Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-item rounded-1">Descending</Link>
                </li>
              </ul>
            </div>
            <div>
              <button onClick={() => {
                setFormData({
                  title: '',
                  category: '',
                  tags: '',
                  content: '',
                  status: 'Active',
                  image: 'image-news03.jpg'
                });
                setShowAddModal(true);
              }} className="btn btn-primary d-flex align-items-center">
                <i className="ti ti-circle-plus me-2"></i>Add Blog
              </button>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}

        <div className="row justify-content-center">
          {blogs.length === 0 ? (
            <div className="col-12 text-center py-5">
              <p className="text-muted">No blogs found. Add your first blog!</p>
            </div>
          ) : (
            blogs.map((blog) => (
              <div key={blog.id} className="col-xxl-4 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <div className="img-sec w-100 position-relative mb-3">
                      <Link to={`/blog-details/${blog.slug}`}>
                        <img src={`/images/${blog.image}`} className="img-fluid rounded w-100" alt="img" style={{ height: '200px', objectFit: 'cover' }} />
                      </Link>
                      <div className="">
                        <Link to="#" className="trend-tag badge bg-info-transparent fs-10 fw-medium">{blog.category || blog.subtitle}</Link>
                        <span className={`badge ${blog.status === 'Active' ? 'badge-success' : 'badge-secondary'} dot-icon`}>
                          <i className="ti ti-point-filled"></i> {blog.status || 'Active'}
                        </span>
                      </div>
                    </div>   
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="d-flex align-items-center">
                        <span className="me-2 d-flex align-items-center">
                          <i className="ti ti-calendar me-1"></i> {blog.date}
                        </span>
                        <Link to="#" className="border-start link-default fs-14 fw-normal ps-2 me-2 text-truncate">
                          <img src={`/images/${blog.authorImage}`} className="avatar avatar-xs rounded-circle me-2 flex-shrink-0" alt="Img" />
                          {blog.authorName || blog.author}
                        </Link>
                      </div>
                      <div className="d-flex align-items-center">
                        <Link to="#" className="link-default me-2" onClick={() => handleEditBlog(blog)}>
                          <i className="ti ti-edit"></i>
                        </Link>
                        <Link to="#" className="link-default" onClick={() => openDeleteModal(blog)}>
                          <i className="ti ti-trash text-danger"></i>
                        </Link>
                      </div>
                    </div>
                    <div className="border-bottom mb-3">
                      <h5 className="mb-3">
                        <Link to={`/blog-details/${blog.slug}`} className="fs-16 fw-medium text-truncate">{blog.title}</Link>
                      </h5>                                   
                    </div>   
                    <div className="d-flex align-items-center justify-content-between text-center">
                      <div className="me-3">
                        <h6 className="fs-14 fw-medium">{blog.likes || '0'}</h6>
                        <span className="fs-12 fw-normal">Likes</span>
                      </div>
                      <div className="border-start text-gray ps-3 me-3">
                        <h6 className="fs-14 fw-medium">{blog.comments || '0'}</h6>
                        <span className="fs-12 fw-normal">Comments</span>
                      </div>
                      <div className="border-start text-gray ps-3 me-3">
                        <h6 className="fs-14 fw-medium">{blog.shares || '0'}</h6>
                        <span className="fs-12 fw-normal">Share</span>
                      </div>
                      <div className="border-start text-gray ps-3">
                        <h6 className="fs-14 fw-medium">{blog.reviews || '0'}</h6>
                        <span className="fs-12 fw-normal">Reviews</span>
                      </div>
                    </div>                          
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Blog Modal */}
        {showAddModal && (
          <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} id="add_blog">
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Add Blog</h4>
                  <button type="button" className="btn-close custom-btn-close" onClick={() => setShowAddModal(false)}>
                    <i className="ti ti-x"></i>
                  </button>
                </div>
                <form onSubmit={handleAddBlog}>
                  <div className="modal-body pb-0">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Blog Title <span className="text-danger"> *</span></label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                          />
                        </div>                                  
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Category <span className="text-danger"> *</span></label>
                          <select 
                            className="form-control"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select</option>
                            <option value="Education">Education</option>
                            <option value="Career">Career</option>
                            <option value="Hiring">Hiring</option>
                            <option value="Platform">Platform</option>
                            <option value="Guide">Guide</option>
                            <option value="Security">Security</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Tags (comma-separated) <span className="text-danger"> *</span></label>
                          <input 
                            className="form-control" 
                            placeholder="education, teaching, careers" 
                            type="text" 
                            name="tags"
                            value={formData.tags}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Image Filename</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            placeholder="image-news03.jpg"
                          />
                          <small className="text-muted">Place images in /public/images/</small>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Status</label>
                          <select 
                            className="form-control"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label className="form-label">Content (HTML supported) <span className="text-danger"> *</span></label>
                          <textarea 
                            className="form-control" 
                            rows="10"
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            placeholder="Write your blog content here. You can use HTML tags like <h3>, <p>, <ul>, <li>, etc."
                            required
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-light me-2" onClick={() => setShowAddModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Add Blog</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {/* /Add Blog Modal */}
        
        {/* Edit Blog Modal */}
        {showEditModal && (
          <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} id="edit_blog">
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Edit Blog</h4>
                  <button type="button" className="btn-close custom-btn-close" onClick={() => setShowEditModal(false)}>
                    <i className="ti ti-x"></i>
                  </button>
                </div>
                <form onSubmit={handleUpdateBlog}>
                  <div className="modal-body pb-0">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Blog Title <span className="text-danger"> *</span></label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                          />
                        </div>                                  
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Category <span className="text-danger"> *</span></label>
                          <select 
                            className="form-control"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select</option>
                            <option value="Education">Education</option>
                            <option value="Career">Career</option>
                            <option value="Hiring">Hiring</option>
                            <option value="Platform">Platform</option>
                            <option value="Guide">Guide</option>
                            <option value="Security">Security</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Tags (comma-separated)</label>
                          <input 
                            className="form-control" 
                            placeholder="education, teaching, careers" 
                            type="text" 
                            name="tags"
                            value={formData.tags}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Image Filename</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            placeholder="image-news03.jpg"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Status</label>
                          <select 
                            className="form-control"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label className="form-label">Content (HTML supported)</label>
                          <textarea 
                            className="form-control" 
                            rows="10"
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            placeholder="Write your blog content here. You can use HTML tags like <h3>, <p>, <ul>, <li>, etc."
                            required
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-light me-2" onClick={() => setShowEditModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {/* /Edit Blog Modal */}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} id="delete_modal">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <span className="avatar avatar-xl bg-transparent-danger text-danger mb-3">
                    <i className="ti ti-trash-x fs-36"></i>
                  </span>
                  <h4 className="mb-1">Confirm Deletion</h4>
                  <p className="mb-3">Are you sure you want to delete "{selectedBlog?.title}"? This action cannot be undone.</p>
                  <div className="d-flex justify-content-center">
                    <button onClick={() => {
                      setShowDeleteModal(false);
                      setSelectedBlog(null);
                    }} className="btn btn-light me-3">Cancel</button>
                    <button onClick={handleDeleteBlog} className="btn btn-danger">Yes, Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* /Delete Modal */}
      </div>
      <EmployerAdminFooter />
    </>
  );
};

export default Blog;