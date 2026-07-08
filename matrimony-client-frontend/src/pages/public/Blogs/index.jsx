import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../../api/axiosInstance/commonInstance';
import SEOHelmet from '../../../components/common/SEOHelmet';

const BlogsPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axiosInstance.get("/user-auth/get-blogs");
      if (response.data && response.data.success) {
        setBlogPosts(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogPosts.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogPosts.length / blogsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://agapevows.com"
    },{
      "@type": "ListItem",
      "position": 2,
      "name": "Blogs",
      "item": "https://agapevows.com/blogs"
    }]
  };

  return (
    <div className="bg-white min-h-screen">
      <SEOHelmet 
        title="Christian Matrimony Blogs & Relationship Advice | AgapeVows"
        description="Explore thoughtful insights, practical relationship advice, and inspiring stories for every step of your Christian marriage journey with AgapeVows."
        canonicalUrl="/blogs"
        schemaData={[breadcrumbSchema]}
      />
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] font-cormorant tracking-tight mb-4">
          Explore Our Blogs
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Thoughtful insights, practical relationship advice, and inspiring stories for every step of your marriage journey.
        </p>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-center">
          <div className="h-px bg-[#dfa52b] w-16 md:w-24"></div>
          <h2 className="text-2xl font-bold font-cormorant text-[#111827] mx-6">All Blog Posts</h2>
          <div className="h-px bg-[#dfa52b] w-16 md:w-24"></div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {currentBlogs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
            {currentBlogs.map((post) => (
              <BlogPostCard key={post._id} {...post} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-20">Loading blogs...</div>
        )}
      </div>

      {/* Pagination Block */}
      {totalPages > 1 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${
                currentPage === 1
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-700 hover:border-[#58219f] hover:text-[#58219f]'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${
                  currentPage === index + 1
                    ? 'bg-[#58219f] text-white'
                    : 'border border-gray-300 text-gray-700 hover:border-[#58219f] hover:text-[#58219f]'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${
                currentPage === totalPages
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-700 hover:border-[#58219f] hover:text-[#58219f]'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Blog Post Card Component
const BlogPostCard = ({ _id, coverImage, title, category, createdAt, sections, content }) => {
  let excerpt = '';
  if (sections && sections.length > 0 && sections[0].content) {
    excerpt = sections[0].content.substring(0, 120) + '...';
  } else if (content) {
    excerpt = content.substring(0, 120) + '...';
  }
  const date = new Date(createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <Link to={`/blog-details/${_id}`} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 flex flex-col h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="h-64 sm:h-[300px] overflow-hidden bg-gray-100 relative">
        <img src={coverImage || "/images/image-news03.jpg"} alt={title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3 text-sm font-bold text-[#58219f]">
          <span>{category}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-500 font-medium">{date}</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#58219f] transition-colors font-cormorant leading-tight">{title}</h3>
        <p className="text-gray-500 text-sm sm:text-base line-clamp-3 mb-6 leading-relaxed flex-grow">
          {excerpt}
        </p>
        <div className="mt-auto pt-2 flex items-center font-bold text-[#58219f]">
          Read More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogsPage;