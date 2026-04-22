// index.jsx - BlogsPage with Role-Based Access Control
// Place this file in: src/pages/public/Blogs/index.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBlogs, saveBlog } from '../../../../public/blogData';

const BlogsPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const blogsPerPage = 6;

  // ===== ROLE-BASED ACCESS CONTROL =====
  // Get user role - MODIFY THIS BASED ON YOUR AUTH SYSTEM
  const getUserRole = () => {
    // OPTION 1: From localStorage
    const userRole = localStorage.getItem('userRole'); // e.g., 'admin', 'employer', 'employer_admin', 'candidate'
    
    // OPTION 2: From sessionStorage
    // const userRole = sessionStorage.getItem('userRole');
    
    // OPTION 3: From localStorage user object
    // const user = JSON.parse(localStorage.getItem('user'));
    // const userRole = user?.role;
    
    // OPTION 4: From Context/Redux (if you're using it)
    // const { userRole } = useContext(AuthContext);
    
    return userRole;
  };

  // Check if user can add blogs
  const canAddBlog = () => {
    const role = getUserRole();
    
    // Allow these roles to add blogs
    const allowedRoles = ['admin', 'employer', 'employer_admin', 'employerAdmin'];
    
    // Check if user's role is in allowed roles (case-insensitive)
    return allowedRoles.some(allowedRole => 
      role?.toLowerCase() === allowedRole.toLowerCase()
    );
  };

  useEffect(() => {
    setBlogPosts(getAllBlogs());
  }, []);

  const refreshBlogs = () => {
    setBlogPosts(getAllBlogs());
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogPosts.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogPosts.length / blogsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Sub Visual Block */}
      <div className="subvisual-block subvisual-theme-1 bg-dark-blue d-flex pt-60 pt-md-90 pt-lg-150 pb-30 text-white">
        <div className="pattern-image">
          <img src="/images/bg-pattern-overlay.jpg" width="1920" height="570" alt="Pattern" />
        </div>
        <div className="container position-relative text-center">
          <div className="row">
            <div className="col-12">
              <div className="subvisual-textbox">
                <h1 className="text-primary mb-0">EdProfio Blogs</h1>
                <p>Feel free to get in touch with us. Need Help?</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="main">
        {/* Blogs Section */}
        <section className="section latest-news-block section-theme-1 pt-35 pt-md-50 pt-lg-75 pt-xl-100 pt-xxl-120 pb-35 bg-light">
          <div className="container">
            {/* Add Blog Button - ONLY FOR ADMIN, EMPLOYER, EMPLOYER_ADMIN */}
            {canAddBlog() && (
              <div className="row mb-4">
                <div className="col-12 text-end">
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => setShowAddForm(!showAddForm)}
                  >
                    <i className="icon-plus me-2"></i>
                    <span className="btn-text">{showAddForm ? 'Close Form' : 'Add New Blog'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Add Blog Form - ONLY SHOWS IF USER HAS PERMISSION */}
            {showAddForm && canAddBlog() && (
              <AddBlogForm 
                onClose={() => setShowAddForm(false)} 
                onBlogAdded={refreshBlogs}
              />
            )}

            {/* Blog Posts Grid - VISIBLE TO ALL USERS */}
            <div className="row">
              {currentBlogs.map((post, index) => (
                <div key={post.id} className="col-12 col-md-6 col-lg-4 mb-35 mb-md-55">
                  <BlogPostCard {...post} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pagination Block */}
        {totalPages > 1 && (
          <div className="pagination-block section-theme-1 pb-50 pb-md-50 bg-light">
            <div className="container d-flex align-items-center justify-content-center">
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <i className="icon-arrow-left1"></i>
                  </button>
                </li>
                
                {[...Array(totalPages)].map((_, index) => (
                  <li 
                    key={index + 1} 
                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                  >
                    <button 
                      className="page-link" 
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <i className="icon-arrow-right"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Apps Block */}
        <section className="section section-theme-4 apps-block pt-0 pt-md-30 pt-lg-65 pb-35 pb-md-50 pb-lg-65">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-md-6">
                <div className="text">
                  <h2 className="text-secondary">Download the App</h2>
                  <p>Aliquam lorem ante, dapibus in, viverra quis, feu Aliquam lorem ante, dapibus orem ante, dapibus in, viverra.</p>
                  <ul className="list-unstyled list">
                    <li>Duis aute irure dolor in reprehenderit</li>
                    <li>Voluptate velit esse cillum dolore</li>
                    <li>Fugiat nulla pariatur. Excepteur sint occaecat</li>
                  </ul>
                  <div className="download-btns">
                    <a className="btn-app btn-play-store" href="#">
                      <div className="store-icon">
                        <img src="/images/icon-play-store.png" width="28" height="30" alt="Google Play" />
                      </div>
                      <div className="btn-text">
                        Download From <span>Google Play</span>
                      </div>
                    </a>
                    <a className="btn-app btn-app-store" href="#">
                      <div className="store-icon">
                        <img src="/images/icon-app-store.png" width="32" height="38" alt="App Store" />
                      </div>
                      <div className="btn-text">
                        Download From <span>App Store</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="image-holder">
                  <img src="/images/apps-image1.png" alt="App Screenshot" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

// Blog Post Card Component
const BlogPostCard = ({ slug, image, title, subtitle, date, comments, authorImage, authorName, excerpt }) => {
  return (
    <div className="news-post bg-white shadow border border-dark" style={{ borderRadius: "30px" }}>
      <Link to={`/blog-details/${slug}`}>
        <div className="image-holder">
          <img src={`/images/${image}`} alt={title} />
        </div>
        <div className="textbox p-10">
          <strong className="subtitle text-secondary">{subtitle}</strong>
          <h3>{title}</h3>
          <p className="excerpt" style={{ fontSize: '14px', color: '#666', margin: '10px 0' }}>
            {excerpt}
          </p>
          <ul className="post-meta">
            <li>{date}</li>
            <li>{comments} Comments</li>
          </ul>
          <div className="post-author">
            <span className="author-image">
              <img src={`/images/${authorImage}`} width="52" height="52" alt={authorName} />
            </span>
            <span className="post-by">By <strong>{authorName}</strong></span>
          </div>
        </div>
      </Link>
    </div>
  );
};

// Add Blog Form Component
const AddBlogForm = ({ onClose, onBlogAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    excerpt: '',
    content: '',
    image: 'image-news03.jpg',
    tags: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.subtitle || !formData.excerpt || !formData.content) {
      alert('Please fill all required fields');
      return;
    }

    const newBlog = {
      id: Date.now(),
      slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: formData.title,
      subtitle: formData.subtitle,
      excerpt: formData.excerpt,
      image: formData.image || 'image-news03.jpg',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      comments: 0,
      authorImage: 'avatar-03.jpg',
      authorName: 'EdProfio Team',
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      content: formData.content
    };

    if (saveBlog(newBlog)) {
      alert('Blog added successfully!');
      setFormData({ title: '', subtitle: '', excerpt: '', content: '', image: 'image-news03.jpg', tags: '' });
      onBlogAdded();
      onClose();
    } else {
      alert('Error saving blog');
    }
  };

  return (
    <div className="row mb-5">
      <div className="col-12">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h3 className="mb-4">Add New Blog Post</h3>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Title *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Category *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
                    placeholder="e.g., Education, Career"
                    required 
                  />
                </div>
                <div className="col-12 mb-3">
                  <label className="form-label">Excerpt *</label>
                  <textarea 
                    className="form-control" 
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    rows="2"
                    placeholder="Short description..."
                    required
                  ></textarea>
                </div>
                <div className="col-12 mb-3">
                  <label className="form-label">Content * (HTML supported)</label>
                  <textarea 
                    className="form-control" 
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows="8"
                    placeholder="Write your blog content here. You can use HTML tags like <h3>, <p>, <ul>, <li>, etc."
                    required
                  ></textarea>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Image Filename</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="image-news03.jpg"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Tags (comma-separated)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="education, teaching, careers"
                  />
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary me-2">Add Blog</button>
                  <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;