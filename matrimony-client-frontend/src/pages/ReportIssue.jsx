import React, { useEffect, useState } from "react";
import LayoutComponent from "../components/layouts/LayoutComponent";
import Footer from "../components/Footer";
import CommonBanner from "../components/CommonBanner";
import { getUserProfile, reportIssue } from "../api/axiosService/userAuthService";
import { showAlert } from "../utils/alertService";

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
      showAlert({
        title: "Validation Error",
        text: "Please fill all required fields",
        icon: "warning",
      });
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
        showAlert({
          title: "Success",
          text: "Issue submitted successfully ✅",
          icon: "success",
        });

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

      showAlert({
        title: "Error",
        text: "Something went wrong ❌",
        icon: "error",
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div className="pt-20">

        <CommonBanner 
          title="Report an Issue" 
          subtitle="Facing a problem? Let us know and we’ll fix it quickly and efficiently."
        />
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