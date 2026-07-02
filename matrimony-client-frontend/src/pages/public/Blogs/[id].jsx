import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAllPublishedBlogs } from '../../../api/axiosService/userSignUpService';
import LayoutComponent from '../../../components/layouts/LayoutComponent';
import Footer from '../../../components/Footer';

const BlogDetailsPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    // Scroll to top whenever ID changes (e.g. clicking a recent post)
    window.scrollTo(0, 0);
    const fetchBlog = async () => {
      try {
        const response = await getAllPublishedBlogs();
        if (response.data && response.data.data) {
          const blogs = response.data.data;
          setAllBlogs(blogs);
          const foundBlog = blogs.find(b => b._id === id || b._id.toString() === id);
          setBlog(foundBlog);
          if (!foundBlog) {
            setDebugInfo({ error: "Not found in array", targetId: id, blogIds: blogs.map(b => b._id) });
          }
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setDebugInfo({ error: error.message });
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
          <LayoutComponent />
        </div>
        <div className="flex-grow flex items-center justify-center pt-24">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-xl font-medium text-gray-500">Loading Blog...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
          <LayoutComponent />
        </div>
        <div className="flex-grow flex flex-col justify-center items-center pt-24 px-4 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Blog not found</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md">We couldn't find the blog post you're looking for. It might have been removed or the link is incorrect.</p>
          <div className="bg-white p-6 shadow-md rounded-xl text-left w-full max-w-2xl mb-8 overflow-auto border border-gray-100 hidden">
            <pre className="text-sm text-gray-500">{JSON.stringify(debugInfo, null, 2)}</pre>
          </div>
          <Link to="/blogs" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Browse All Blogs
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const recentBlogs = allBlogs.filter(b => b._id !== blog._id).slice(0, 3);
  const date = new Date(blog.createdAt || Date.now()).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="min-h-screen bg-white flex flex-col blog-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Source+Sans+3:ital,wght@0,300..900;1,300..900&display=swap');
        
        .blog-container {
          font-family: 'Source Sans 3', sans-serif !important;
        }
        .blog-container h1, 
        .blog-container h2, 
        .blog-container h3, 
        .blog-container h4, 
        .blog-container h5, 
        .blog-container h6,
        .font-cormorant {
          font-family: 'Cormorant Garamond', serif !important;
        }
      `}</style>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <LayoutComponent />
      </div>

      <div className="flex-grow pt-24 pb-16">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-blue-50 text-blue-700 border border-blue-100">
              {blog.category}
            </span>
            <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              {date}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-8">
            {blog.title}
          </h1>

          {/* Author Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-t border-gray-100 py-6 mb-12 gap-6">
            <div className="flex items-center gap-4">
              <img src={blog.authorPhoto || "/images/avatar-03.jpg"} alt={blog.authorName} className="w-16 h-16 rounded-full object-cover shadow-sm ring-4 ring-gray-50" />
              <div>
                <p className="font-bold text-gray-900 text-xl font-cormorant">{blog.authorName}</p>
                <p className="text-sm font-medium text-gray-500 font-cormorant">{blog.authorRole}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="w-full h-[500px] overflow-hidden rounded-2xl shadow-lg ring-1 ring-gray-900/5">
            <img src={blog.coverImage || "/images/image-news03.jpg"} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-blue max-w-none text-gray-700">
            {blog.sections && blog.sections.length > 0 ? (
              blog.sections.map((section, index) => (
                <div key={index} className="mb-14">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">{section.heading}</h2>
                  <p className="whitespace-pre-line text-lg leading-relaxed mb-8 text-gray-600">{section.content}</p>
                  {section.image && (
                    <div className="my-8 flex justify-center">
                      <div className="rounded-xl overflow-hidden shadow-md ring-1 ring-gray-900/5 max-w-lg w-full">
                        <img src={section.image} alt={section.heading} className="w-full h-auto object-cover max-h-[400px]" />
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="whitespace-pre-line text-lg leading-relaxed text-gray-600">{blog.content}</p>
            )}
          </div>
          
          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-100">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 rounded-xl bg-gray-50 text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer border border-gray-100">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Posts Section */}
      {recentBlogs.length > 0 && (
        <div className="bg-gray-50 py-24 border-t border-gray-100 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">More Articles You Might Like</h2>
              <Link to="/blogs" className="hidden sm:inline-flex items-center font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                View All <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {recentBlogs.map((recentBlog) => (
                <Link to={`/blog-details/${recentBlog._id}`} key={recentBlog._id} className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full transform hover:-translate-y-1">
                  <div className="aspect-w-16 aspect-h-10 overflow-hidden bg-gray-100 relative">
                    <img src={recentBlog.coverImage || "/images/image-news03.jpg"} alt={recentBlog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 uppercase tracking-wider">
                      {recentBlog.category}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-4 text-xs font-medium text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      {new Date(recentBlog.createdAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">{recentBlog.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-6 leading-relaxed flex-grow">
                      {recentBlog.sections && recentBlog.sections.length > 0 
                        ? recentBlog.sections[0].content?.substring(0, 120) + '...'
                        : recentBlog.content?.substring(0, 120) + '...'
                      }
                    </p>
                    <div className="flex items-center gap-3 pt-5 border-t border-gray-100 mt-auto">
                      <img src={recentBlog.authorPhoto || "/images/avatar-03.jpg"} alt={recentBlog.authorName} className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-50" />
                      <div>
                        <span className="block text-base font-bold text-gray-900 font-cormorant">{recentBlog.authorName}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-10 text-center sm:hidden">
              <Link to="/blogs" className="inline-flex items-center justify-center w-full px-6 py-3 border border-gray-200 text-base font-semibold rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                View All Blogs
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BlogDetailsPage;