

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
import { getAllPublishedBlogs } from "../../api/axiosService/userSignUpService";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import Footer from "../../components/Footer";

const bgColors = [
  "bg-white",
  "bg-purple-50",
  "bg-indigo-50",
  "bg-pink-50",
  "bg-blue-50",
];

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
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* HEADER */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <LayoutComponent />
      </div>

      <div className="pt-16">
        {/* SECTION 1: HEADER BANNER */}
        <section className="str">
          <div className="ban-inn ab-ban mb-0">
            <div className="container">
              <div className="row">
                <div className="hom-ban">
                  <div className="ban-tit">
                    <span>
                      <i className="no1">#1</i> Wedding Website
                    </span>
                    <h1>Our Blogs</h1>
                    <p>
                      Inspiration, tips, and stories to help you on your journey to a beautiful wedding.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: BLOG CONTENT */}
        <section className="bg-gray-50 flex-grow pt-20 pb-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-14 text-center">
              All Blog Posts
            </h1>

            {loading && (
              <p className="text-center text-gray-500">Loading blogs...</p>
            )}

            {!loading && blogs.length === 0 && (
              <p className="text-center text-gray-500">No blogs available.</p>
            )}

            <div className="grid md:grid-cols-2 gap-10">
              {!loading &&
                blogs.map((blog, index) => (
                  <div
                    key={blog._id}
                    className={`${bgColors[index % bgColors.length]} 
                    rounded-3xl p-8 shadow-sm hover:shadow-xl 
                    transition duration-300`}
                  >
                    <div className="w-full max-h-[400px] flex items-center justify-center bg-gray-100 rounded-2xl mb-6 overflow-hidden">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mb-3">
                      <span className="font-semibold text-gray-700">
                        {blog.category}
                      </span>{" "}
                      -{" "}
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">
                      {blog.content}
                    </p>
                    <div className="flex items-center gap-4">
                      <img
                        src={blog.authorPhoto}
                        alt="author"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {blog.authorName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {blog.authorRole}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;