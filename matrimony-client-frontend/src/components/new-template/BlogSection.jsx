import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../api/axiosInstance/commonInstance';
import { Link } from 'react-router-dom';

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get("/user-auth/get-blogs");
        if (response.data && response.data.success) {
          setBlogs(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="bg-gray-50 py-20 border-t border-gray-100 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">More Articles You Might Like</h2>
          <Link to="/blogs" className="hidden sm:inline-flex items-center font-semibold text-blue-600 hover:text-blue-800 transition-colors">
            View All <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </Link>
        </div>
        
        {blogs.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {blogs.slice(0, 3).map((blog) => (
              <Link to={`/blog-details/${blog._id}`} key={blog._id} className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full transform hover:-translate-y-1">
                <div className="h-64 overflow-hidden bg-gray-100 relative">
                  <img src={blog.coverImage || "/images/image-news03.jpg"} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 uppercase tracking-wider">
                    {blog.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-4 text-xs font-medium text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    {new Date(blog.createdAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">{blog.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6 leading-relaxed flex-grow">
                    {blog.sections && blog.sections.length > 0 
                      ? blog.sections[0].content?.substring(0, 120) + '...'
                      : blog.content?.substring(0, 120) + '...'
                    }
                  </p>
                  <div className="flex items-center gap-3 pt-5 border-t border-gray-100 mt-auto">
                    <img src={blog.authorPhoto || "/images/avatar-03.jpg"} alt={blog.authorName} className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-50" />
                    <div>
                      <span className="block text-base font-bold text-gray-900 font-cormorant">{blog.authorName}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">Loading blogs...</p>
        )}
        
        <div className="mt-10 text-center sm:hidden">
          <Link to="/blogs" className="inline-flex items-center justify-center w-full px-6 py-3 border border-gray-200 text-base font-semibold rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            View All Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}
