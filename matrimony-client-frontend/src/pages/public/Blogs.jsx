

// import React, { useState, useEffect } from "react";
// import { getAllPublishedBlogs } from "../../api/axiosService/userSignUpService";
// import LayoutComponent from "../../components/layouts/LayoutComponent";
// import Footer from "../../components/Footer";
// const bgColors = [
//   "bg-white",
//   "bg-purple-50",
//   "bg-indigo-50",
//   "bg-pink-50",
//   "bg-blue-50",
// ];

// const Blogs = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const fetchBlogs = async () => {
//     try {
//       const res = await getAllPublishedBlogs();
//       setBlogs(res?.data?.data || []);
//     } catch (error) {
//       console.log("Error fetching blogs:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//    <div className="min-h-screen bg-gray-100 flex flex-col">

//       {/* FIXED HEADER */}
//       <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
//         <LayoutComponent />
//       </div>

//       {/* CONTENT WRAPPER (Header height fix added) */}
//      <div className="pt-40 pb-20 px-4 flex-grow">

//         <div className="max-w-5xl mx-auto">

//           {/* TITLE */}
//           <h1 className="text-4xl font-bold text-gray-800 mb-14 text-center">
//             All Blog Posts
//           </h1>

//           {/* LOADING */}
//           {loading && (
//             <p className="text-center text-gray-500">Loading blogs...</p>
//           )}

//           {/* EMPTY */}
//           {!loading && blogs.length === 0 && (
//             <p className="text-center text-gray-500">No blogs available.</p>
//           )}

//           {/* BLOG CARDS */}
//           <div className="space-y-12">
//             {!loading &&
//               blogs.map((blog, index) => (
//                 <div
//                   key={blog._id}
//                   className={`${bgColors[index % bgColors.length]} 
//                   rounded-3xl p-8 shadow-sm hover:shadow-xl 
//                   transition duration-300`}
//                 >
//                   <div className="grid md:grid-cols-3 gap-8 items-center">

//                     {/* SMALLER IMAGE */}
//                     <div className="md:col-span-1">
//                       <img
//                         src={blog.coverImage}
//                         alt={blog.title}
//                         className="w-full h-56 object-cover rounded-2xl"
//                       />
//                     </div>

//                     {/* CONTENT */}
//                     <div className="md:col-span-2">

//                       {/* CATEGORY + DATE */}
//                       <p className="text-sm text-gray-500 mb-3">
//                         <span className="font-semibold text-gray-700">
//                           {blog.category}
//                         </span>{" "}
//                         -{" "}
//                         {new Date(blog.createdAt).toLocaleDateString(
//                           "en-US",
//                           {
//                             year: "numeric",
//                             month: "short",
//                             day: "numeric",
//                           }
//                         )}
//                       </p>

//                       {/* TITLE */}
//                       <h2 className="text-2xl font-bold text-gray-900 mb-4">
//                         {blog.title}
//                       </h2>

//                       {/* DESCRIPTION */}
//                       <p className="text-gray-600 leading-relaxed mb-6">
//                         {blog.content?.substring(0, 160)}...
//                       </p>

//                       {/* AUTHOR */}
//                       <div className="flex items-center gap-4">
//                         <img
//                           src={blog.authorPhoto}
//                           alt="author"
//                           className="w-12 h-12 rounded-full object-cover"
//                         />
//                         <div>
//                           <p className="font-semibold text-gray-800">
//                             {blog.authorName}
//                           </p>
//                           <p className="text-sm text-gray-500">
//                             {blog.authorRole}
//                           </p>
//                         </div>
//                       </div>

//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>

//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Blogs;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllPublishedBlogs } from "../../api/axiosService/userSignUpService";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import Footer from "../../components/Footer";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await getAllPublishedBlogs();
      setBlogs(res?.data?.data || []);
    } catch (error) {
      console.log("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* HEADER */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <LayoutComponent />
      </div>

      {/* CONTENT WRAPPER */}
      <div className="pt-28 flex-grow">
        
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 text-center">
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
          {loading ? (
            <p className="text-center text-gray-500 py-10">Loading blogs...</p>
          ) : blogs.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
              {blogs.map((blog) => {
                let excerpt = '';
                if (blog.sections && blog.sections.length > 0 && blog.sections[0].content) {
                  excerpt = blog.sections[0].content.substring(0, 120) + '...';
                } else if (blog.content) {
                  excerpt = blog.content.substring(0, 120) + '...';
                }
                const date = new Date(blog.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

                return (
                  <Link key={blog._id} to={`/blog-details/${blog._id}`} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 flex flex-col h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="h-64 sm:h-[300px] overflow-hidden bg-gray-100 relative">
                      <img src={blog.coverImage || "/images/image-news03.jpg"} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-3 text-sm font-bold text-[#58219f]">
                        <span>{blog.category}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500 font-medium">{date}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#58219f] transition-colors font-cormorant leading-tight">{blog.title}</h3>
                      <p className="text-gray-500 text-sm sm:text-base line-clamp-3 mb-6 leading-relaxed flex-grow">
                        {excerpt}
                      </p>
                      <div className="mt-auto pt-2 flex items-center font-bold text-[#58219f]">
                        Read More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">No blogs available.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blogs;