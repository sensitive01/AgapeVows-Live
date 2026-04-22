// import React, { useEffect, useState } from "react";
// import LayoutComponent from "../components/layouts/LayoutComponent";
// import Footer from "../components/Footer";
// import { getUserProfile } from "../api/axiosService/userAuthService";

// const ReportIssue = () => {
//   const userId = localStorage.getItem("userId");

//   const [formData, setFormData] = useState({
//     userName: "",
//     userEmail: "",
//     userMobile: "",
//     agwid: "",
//     details: "",
//     attachment: null,
//   });

//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // ✅ Fetch user data if logged in
//   useEffect(() => {
//     if (userId) {
//       setIsLoggedIn(true);

//       const fetchUser = async () => {
//         try {
//           const res = await getUserProfile(userId);
//           if (res.status === 200) {
//             const data = res.data.data;

//             setFormData((prev) => ({
//               ...prev,
//               userName: data.userName || "",
//               userEmail: data.userEmail || "",
//               userMobile: data.userMobile || "",
//               agwid: data.agwid || "",
//             }));
//           }
//         } catch (err) {
//           console.error("Error fetching user:", err);
//         }
//       };

//       fetchUser();
//     }
//   }, [userId]);

//   // ✅ Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // ✅ Handle file upload
//   const handleFileChange = (e) => {
//     setFormData({ ...formData, attachment: e.target.files[0] });
//   };

//   // ✅ Submit
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!isLoggedIn) {
//       alert("Please login to report an issue");
//       return;
//     }

//     console.log("Form Data:", formData);

//     // 👉 Here you can send API (FormData for file upload)
//   };

//   return (
//     <div className="min-h-screen">
//       {/* Header */}
//       <div className="fixed top-0 left-0 right-0 z-50">
//         <LayoutComponent />
//       </div>

//       <div className="pt-16">
//         {/* Banner */}
//         <div className="str">
//           <div className="ban-inn ab-ban">
//             <div className="container">
//               <div className="row">
//                 <div className="hom-ban">
//                   <div className="ban-tit">
//                     <span>
//                       <i className="no1">#1</i> Support Center
//                     </span>
//                     <h1>Report & Issue</h1>
//                     <p>
//                       Facing a problem? Let us know and we’ll fix it quickly.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//          {/* Form */}
//         <section className="py-10 px-4">
//           {!isLoggedIn ? (
//             <div className="text-center text-red-600 font-semibold">
//               Please login to report and issue.
//             </div>
//           ) : (
//             <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-8">
//               <h2 className="text-xl font-semibold mb-6 text-gray-800">
//                 Submit Your Issue
//               </h2>

//               <form onSubmit={handleSubmit} className="space-y-5">
//                 {/* Grid */}
//                 <div className="grid md:grid-cols-2 gap-4">
//                   {/* Username */}
//                   <div>
//                     <label className="text-sm font-medium text-gray-600">
//                       Username
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.userName}
//                       disabled
//                       className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-100 border text-gray-700"
//                     />
//                   </div>

//                   {/* User ID */}
//                   <div>
//                     <label className="text-sm font-medium text-gray-600">
//                       User ID
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.agwid}
//                       disabled
//                       className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-100 border text-gray-700"
//                     />
//                   </div>

//                   {/* Email */}
//                   <div>
//                     <label className="text-sm font-medium text-gray-600">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       value={formData.userEmail}
//                       disabled
//                       className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-100 border text-gray-700"
//                     />
//                   </div>

//                   {/* Phone */}
//                   <div>
//                     <label className="text-sm font-medium text-gray-600">
//                       Phone Number
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.userMobile}
//                       disabled
//                       className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-100 border text-gray-700"
//                     />
//                   </div>
//                 </div>

//                 {/* Issue Details */}
//                 <div>
//                   <label className="text-sm font-medium text-gray-600">
//                     Issue Details
//                   </label>
//                   <textarea
//                     name="details"
//                     value={formData.details}
//                     onChange={handleChange}
//                     rows="4"
//                     required
//                     placeholder="Explain your issue clearly..."
//                     className="w-full mt-1 px-3 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none"
//                   />
//                 </div>

//                 {/* File Upload */}
//                 <div>
//                   <label className="text-sm font-medium text-gray-600">
//                     Attachment
//                   </label>

//                   <div className="mt-2 flex items-center gap-3">
//                     <label className="cursor-pointer bg-gray-100 px-4 py-2 rounded-lg border hover:bg-gray-200 text-sm">
//                       Choose File
//                       <input
//                         type="file"
//                         onChange={handleFileChange}
//                         className="hidden"
//                       />
//                     </label>

//                     <span className="text-sm text-gray-500">
//                       {formData.attachment
//                         ? formData.attachment.name
//                         : "No file selected"}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Submit */}
//                 <button
//                   type="submit"
//                   className="w-full md:w-auto bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
//                 >
//                   Submit Issue 🚀
//                 </button>
//               </form>
//             </div>
//           )}
//         </section>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default ReportIssue;


// import React, { useEffect, useState } from "react";
// import LayoutComponent from "../components/layouts/LayoutComponent";
// import Footer from "../components/Footer";
// import { getUserProfile,reportIssue  } from "../api/axiosService/userAuthService";

// const ReportIssue = () => {
//   const userId = localStorage.getItem("userId");

//   const [formData, setFormData] = useState({
//     userName: "",
//     userEmail: "",
//     userMobile: "",
//     agwid: "",
//     details: "",
//     attachment: null,
//   });

//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     if (userId) {
//       setIsLoggedIn(true);

//       const fetchUser = async () => {
//         try {
//           const res = await getUserProfile(userId);
//           if (res.status === 200) {
//             const data = res.data.data;
//             setFormData((prev) => ({
//               ...prev,
//               userName: data.userName || "",
//               userEmail: data.userEmail || "",
//               userMobile: data.userMobile || "",
//               agwid: data.agwid || "",
//             }));
//           }
//         } catch (err) {
//           console.error("Error fetching user:", err);
//         }
//       };

//       fetchUser();
//     }
//   }, [userId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, attachment: e.target.files[0] });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!isLoggedIn) {
//       alert("Please login to report an issue");
//       return;
//     }

//     console.log("Form Data:", formData);
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="fixed top-0 left-0 right-0 z-50">
//         <LayoutComponent />
//       </div>

//       <div className="pt-28">

//         {/* ===================== */}
//         {/* 1️⃣ BANNER BLOCK */}
//         {/* ===================== */}
//        <section className="bg-gray-600 text-white py-20">
//           <div className="max-w-6xl mx-auto px-4 text-center">
//             <span className="bg-white text-purple-600 px-4 py-1 rounded-full text-sm font-semibold">
//               #1 Support Center
//             </span>

//           <h1 className="text-5xl md:text-6xl font-extrabold mt-6 text-purple-500">
//   Report & Issue
// </h1>

//             <p className="mt-4 text-lg text-purple-100 max-w-2xl mx-auto">
//               Facing a problem? Let us know and we’ll fix it quickly and efficiently.
//             </p>
//           </div>
//         </section>

       


//         {/* ===================== */}
//         {/* 2️⃣ FORM BLOCK */}
//         {/* ===================== */}
//         <section className="py-20 px-4">
//           {!isLoggedIn ? (
//             <div className="text-center text-red-600 font-semibold text-lg">
//               Please login to report an issue.
//             </div>
//           ) : (
//             <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-10 border border-gray-100">

//               <h2 className="text-2xl font-semibold mb-10 text-gray-800 text-center">
//                 Submit Your Issue
//               </h2>

//               <form onSubmit={handleSubmit} className="space-y-8">

//                 {/* User Info Section */}
//                 <div className="grid md:grid-cols-2 gap-6">

//                   <div>
//                     <label className="text-sm font-medium text-gray-600">
//                       Username
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.userName}
//                       disabled
//                       className="w-full mt-2 px-4 py-3 rounded-xl bg-gray-100 border"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-gray-600">
//                       User ID
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.agwid}
//                       disabled
//                       className="w-full mt-2 px-4 py-3 rounded-xl bg-gray-100 border"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-gray-600">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       value={formData.userEmail}
//                       disabled
//                       className="w-full mt-2 px-4 py-3 rounded-xl bg-gray-100 border"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-gray-600">
//                       Phone Number
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.userMobile}
//                       disabled
//                       className="w-full mt-2 px-4 py-3 rounded-xl bg-gray-100 border"
//                     />
//                   </div>
//                 </div>

//                 {/* Issue Details */}
//                 <div>
//                   <label className="text-sm font-medium text-gray-600">
//                     Issue Details
//                   </label>
//                   <textarea
//                     name="details"
//                     value={formData.details}
//                     onChange={handleChange}
//                     rows="5"
//                     required
//                     placeholder="Explain your issue clearly..."
//                     className="w-full mt-2 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-purple-500 outline-none"
//                   />
//                 </div>

//                 {/* File Upload */}
//                 <div>
//                   <label className="text-sm font-medium text-gray-600">
//                     Attachment
//                   </label>

//                   <div className="mt-3 flex items-center gap-4">
//                     <label className="cursor-pointer bg-gray-100 px-6 py-3 rounded-xl border hover:bg-gray-200 text-sm transition">
//                       Choose File
//                       <input
//                         type="file"
//                         onChange={handleFileChange}
//                         className="hidden"
//                       />
//                     </label>

//                     <span className="text-sm text-gray-500">
//                       {formData.attachment
//                         ? formData.attachment.name
//                         : "No file selected"}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="flex justify-end pt-6">
//                   <button
//                     type="submit"
//                     className="bg-purple-600 text-white px-10 py-3 rounded-xl font-medium hover:bg-purple-700 transition shadow-md"
//                   >
//                     Submit Issue 🚀
//                   </button>
//                 </div>

//               </form>
//             </div>
//           )}
//         </section>

//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default ReportIssue;
import React, { useEffect, useState } from "react";
import LayoutComponent from "../components/layouts/LayoutComponent";
import Footer from "../components/Footer";
import { getUserProfile, reportIssue } from "../api/axiosService/userAuthService";

const ReportIssue = () => {
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userMobile: "",
    agwid: "",
    details: "",
    attachment: null,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (userId) {
      setIsLoggedIn(true);

      const fetchUser = async () => {
        try {
          const res = await getUserProfile(userId);
          if (res.status === 200) {
            const data = res.data.data;

            setFormData((prev) => ({
              ...prev,
              userName: data.userName || "",
              userEmail: data.userEmail || "",
              userMobile: data.userMobile || "",
              agwid: data.agwid || "",
            }));
          }
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      };

      fetchUser();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachment: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation (for both guest & logged-in users)
    if (!formData.userName || !formData.userEmail || !formData.details) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const data = new FormData();

      // ✅ Append only if logged in
      if (userId) {
        data.append("userId", userId);
      }

      data.append("userName", formData.userName);
      data.append("userEmail", formData.userEmail);
      data.append("userMobile", formData.userMobile);
      data.append("agwid", formData.agwid);
      data.append("details", formData.details);

      if (formData.attachment) {
        data.append("attachment", formData.attachment);
      }

      const res = await reportIssue(data);

      if (res.status === 200 || res.status === 201) {
        alert("Issue submitted successfully ✅");

        setFormData({
          userName: isLoggedIn ? formData.userName : "",
          userEmail: isLoggedIn ? formData.userEmail : "",
          userMobile: isLoggedIn ? formData.userMobile : "",
          agwid: isLoggedIn ? formData.agwid : "",
          details: "",
          attachment: null,
        });
      }
    } catch (error) {
      console.error("Error submitting issue:", error);

      if (error.response) {
        console.log("Server Error:", error.response.data);
      }

      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div className="pt-16">
        <div className="str">
          <div className="ban-inn ab-ban">
            <div className="container">
              <div className="row">
                <div className="hom-ban">
                  <div className="ban-tit">
                    <span>
                      <i className="no1">#1</i> Support Center
                    </span>
                    <h1>Report Your Issue</h1>
                    <p>
                      Facing a problem? Let us know and we’ll fix it quickly and efficiently.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-10 border border-gray-100">

            <h2 className="text-2xl font-semibold mb-10 text-gray-800 text-center">
              Submit Your Issue
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">

              <div className="grid md:grid-cols-2 gap-6">

                {/* Username */}
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Username *
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    disabled={isLoggedIn}
                    className="w-full mt-2 px-4 py-3 rounded-xl border bg-gray-100 disabled:bg-gray-100"
                  />
                </div>

                {/* User ID */}
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    User ID
                  </label>
                  <input
                    type="text"
                    name="agwid"
                    value={formData.agwid}
                    onChange={handleChange}
                    disabled={isLoggedIn}
                    className="w-full mt-2 px-4 py-3 rounded-xl border bg-gray-100 disabled:bg-gray-100"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="userEmail"
                    value={formData.userEmail}
                    onChange={handleChange}
                    disabled={isLoggedIn}
                    className="w-full mt-2 px-4 py-3 rounded-xl border bg-gray-100 disabled:bg-gray-100"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="userMobile"
                    value={formData.userMobile}
                    onChange={handleChange}
                    disabled={isLoggedIn}
                    className="w-full mt-2 px-4 py-3 rounded-xl border bg-gray-100 disabled:bg-gray-100"
                  />
                </div>
              </div>

              {/* Issue Details */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Issue Details *
                </label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  rows="5"
                  required
                  placeholder="Explain your issue clearly..."
                  className="w-full mt-2 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              {/* Attachment */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Attachment
                </label>

                <div className="mt-3 flex items-center gap-4">
                  <label className="cursor-pointer bg-gray-100 px-6 py-3 rounded-xl border hover:bg-gray-200 text-sm transition">
                    Choose File
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>

                  <span className="text-sm text-gray-500">
                    {formData.attachment
                      ? formData.attachment.name
                      : "No file selected"}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-10 py-3 rounded-xl font-medium hover:bg-purple-700 transition shadow-md"
                >
                  Submit Issue 🚀
                </button>
              </div>

            </form>
          </div>
        </section>



      <Footer />
    </div>
  );
};

export default ReportIssue;