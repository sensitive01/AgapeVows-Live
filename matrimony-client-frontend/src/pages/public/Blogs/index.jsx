// index.jsx - BlogsPage with Role-Based Access Control
// Place this file in: src/pages/public/Blogs/index.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectServices } from '../../../api/axios/axiosInstance';

const BlogsPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await projectServices.get("/user-auth/get-blogs");
      if (response.data && response.data.success) {
        setBlogPosts(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const refreshBlogs = () => {
    fetchBlogs();
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

            {/* Blog Posts Grid - VISIBLE TO ALL USERS */}
            <div className="row">
              {currentBlogs.map((post) => (
                <div key={post._id} className="col-12 col-md-6 col-lg-4 mb-35 mb-md-55">
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
const BlogPostCard = ({ _id, coverImage, title, category, createdAt, authorPhoto, authorName, sections, content }) => {
  let excerpt = '';
  if (sections && sections.length > 0 && sections[0].content) {
    excerpt = sections[0].content.substring(0, 100) + '...';
  } else if (content) {
    excerpt = content.substring(0, 100) + '...';
  }
  const date = new Date(createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <div className="news-post bg-white shadow border border-dark" style={{ borderRadius: "30px", height: '100%' }}>
      <Link to={`/blog-details/${_id}`}>
        <div className="image-holder">
          <img src={coverImage || "/images/image-news03.jpg"} alt={title} style={{ width: '100%', height: '250px', objectFit: 'cover', borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }} />
        </div>
        <div className="textbox p-10" style={{ padding: '20px' }}>
          <strong className="subtitle text-secondary">{category}</strong>
          <h3 style={{ fontSize: '1.25rem', marginTop: '10px' }}>{title}</h3>
          <p className="excerpt" style={{ fontSize: '14px', color: '#666', margin: '10px 0' }}>
            {excerpt}
          </p>
          <ul className="post-meta" style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '15px', fontSize: '13px', color: '#888' }}>
            <li><i className="icon-clock me-1"></i>{date}</li>
          </ul>
          <div className="post-author mt-3 d-flex align-items-center">
            <span className="author-image me-2">
              <img src={authorPhoto || "/images/avatar-03.jpg"} width="40" height="40" alt={authorName} style={{ borderRadius: '50%', objectFit: 'cover' }} />
            </span>
            <span className="post-by" style={{ fontSize: '14px' }}>By <strong className="text-dark">{authorName}</strong></span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogsPage;