import React, { useState } from "react";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import Footer from "../../components/Footer";
import { submitEnquiry } from "../../api/axiosService/userAuthService";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [statusMsg, setStatusMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMsg("");
    try {
      await submitEnquiry(formData);
      setStatusMsg("Your message was sent successfully.");
      setIsError(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setStatusMsg("Failed to send your message. Please try again.");
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div className="pt-20 flex-grow">
        {/* Modern Hero Banner */}
        <div className="relative bg-[#5c2a9d] pb-32 pt-20 px-6 sm:px-12">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium">
              We're here to help you find your perfect match. Reach out to our support team anytime.
            </p>
          </div>
        </div>

        {/* Main Content Overlapping Banner */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 mb-20">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
            
            {/* Left Side: Contact Info */}
            <div className="bg-[#f8f5fd] p-10 lg:p-14 lg:w-2/5 border-b lg:border-b-0 lg:border-r border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Info</h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-5 group">
                  <div className="flex-shrink-0 bg-white p-4 rounded-2xl shadow-sm group-hover:shadow-md transition-shadow duration-300">
                    <svg className="w-8 h-8 text-[#5c2a9d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#5c2a9d] uppercase tracking-wider mb-1">Call Us</p>
                    <a href="tel:+919663796699" className="text-lg font-medium text-gray-800 hover:text-[#4b2282] transition-colors">
                      +91 96637 96699
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-5 group">
                  <div className="flex-shrink-0 bg-white p-4 rounded-2xl shadow-sm group-hover:shadow-md transition-shadow duration-300">
                    <svg className="w-8 h-8 text-[#5c2a9d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#5c2a9d] uppercase tracking-wider mb-1">Email Us</p>
                    <a href="mailto:support@agapevows.com" className="text-lg font-medium text-gray-800 hover:text-[#4b2282] transition-colors break-words">
                      support@agapevows.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-14">
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  Our support team is available during standard business hours to assist you with any inquiries regarding memberships, technical issues, or matching services.
                </p>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="p-10 lg:p-14 lg:w-3/5 bg-white">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Send an Enquiry</h2>
              <p className="text-gray-500 mb-8 font-medium">Fill out the form below and we'll get back to you shortly.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {statusMsg && (
                  <div className={`p-4 rounded-xl flex items-center gap-3 ${isError ? "bg-red-50 text-red-700 border border-red-100" : "bg-green-50 text-green-700 border border-green-100"}`}>
                    {isError ? (
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    ) : (
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    )}
                    <span className="font-medium text-sm">{statusMsg}</span>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5c2a9d] focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5c2a9d] focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5c2a9d] focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    placeholder="Type your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5c2a9d] focus:border-transparent transition-all duration-200 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-4 bg-[#5c2a9d] hover:bg-[#4b2282] text-white font-bold rounded-xl shadow-lg shadow-[#5c2a9d]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {isSubmitting ? "Sending..." : "Send Enquiry"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
