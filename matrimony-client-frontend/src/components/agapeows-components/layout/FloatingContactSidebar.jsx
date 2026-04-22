import React, { useState } from "react";
import { Mail, Phone, ChevronRight, ChevronLeft, X } from "lucide-react";
import { toast } from "react-toastify";
import { submitEnquiry } from "../../../api/axiosService/userAuthService";

const FloatingContactSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const res = await submitEnquiry(formData);
      if (res?.data?.success) {
        toast.success(res.data.message || "Enquiry submitted successfully");
        setFormData({ name: "", phone: "", email: "", message: "" });
        setShowForm(false);
      } else {
        toast.error(res?.data?.message || "Failed to submit enquiry");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed right-0 top-[62%] md:top-[60%] -translate-y-1/2 z-[9999] flex items-center gap-0">
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) rotate(180deg); }
            50% { transform: translateY(-10px) rotate(180deg); }
            100% { transform: translateY(0px) rotate(180deg); }
          }
          .animate-float-vertical {
            animation: float 3s ease-in-out infinite;
          }
          
          @keyframes shine {
            0% { left: -100%; }
            50% { left: 100%; }
            100% { left: 100%; }
          }
          .shine-effect {
            position: relative;
            overflow: hidden;
          }
          .shine-effect::after {
            content: "";
            position: absolute;
            top: -50%;
            left: -100%;
            width: 50%;
            height: 200%;
            background: rgba(255, 255, 255, 0.2);
            transform: rotate(30deg);
            animation: shine 4s infinite;
          }
        `}
      </style>

      {/* Enquiry Form Popup */}
      <div
        className={`absolute right-[55px] md:right-[60px] top-1/2 -translate-y-1/2 w-[260px] md:w-[350px] bg-white rounded-2xl shadow-2xl p-4 md:p-6 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${showForm
            ? "opacity-100 translate-x-0 scale-100 rotate-0"
            : "opacity-0 translate-x-10 scale-90 -rotate-2 pointer-events-none"
          }`}
        onMouseEnter={() => setShowForm(true)}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[#0071bc] text-xl font-bold font-sans">Write us!, Let's Talk!</h2>
          <button
            onClick={() => setShowForm(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name*"
              required
              className="w-full px-4 py-3 rounded-full border border-gray-200 focus:border-[#0071bc] focus:ring-1 focus:ring-[#0071bc] outline-none transition-all placeholder:text-gray-400 hover:border-[#0071bc]/50"
            />
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone*"
              required
              className="w-full px-4 py-3 rounded-full border border-gray-200 focus:border-[#0071bc] focus:ring-1 focus:ring-[#0071bc] outline-none transition-all placeholder:text-gray-400 hover:border-[#0071bc]/50"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-full border border-gray-200 focus:border-[#0071bc] focus:ring-1 focus:ring-[#0071bc] outline-none transition-all placeholder:text-gray-400 hover:border-[#0071bc]/50"
            />
          </div>
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Message*"
              required
              rows="3"
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#0071bc] focus:ring-1 focus:ring-[#0071bc] outline-none transition-all placeholder:text-gray-400 resize-none hover:border-[#0071bc]/50"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#0071bc] text-white font-bold py-3 px-6 rounded-full hover:bg-[#005a96] transition-all shadow-md active:scale-[0.98] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'shine-effect'}`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      {/* Sidebar Buttons Stack */}
      <div className="flex flex-col items-end">
        {/* Toggle Arrow - Always visible at the top */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`bg-[#d4af37] text-white p-2 shadow-lg hover:bg-[#d81b60] transition-all w-[50px] h-[45px] flex justify-center items-center border-b border-white/10 z-[10000] ${isOpen ? "rounded-tl-xl" : "rounded-l-xl animate-pulse"
            }`}
          title={isOpen ? "Collapse" : "Expand"}
        >
          {isOpen ? (
            <ChevronRight size={22} className="animate-pulse" />
          ) : (
            <ChevronLeft size={22} className="animate-pulse" />
          )}
        </button>

        {/* Sliding Buttons Container */}
        <div
          className={`transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col items-end ${isOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-[60px] opacity-0 pointer-events-none h-0"
            }`}
        >
          {/* Enquire Now Panel */}
          <div
            className="bg-[#0071bc] text-white flex flex-col items-center justify-center py-6 px-1 hover:bg-[#005a96] transition-all w-[50px] min-h-[180px] border-b border-white/10 cursor-pointer group shine-effect"
            onMouseEnter={() => setShowForm(true)}
          >
            <Mail size={22} className="mb-4 group-hover:scale-110 transition-transform" />
            <span
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(180deg)'
              }}
              className="uppercase tracking-widest text-[11px] font-bold whitespace-nowrap select-none group-hover:tracking-[0.2em] transition-all"
            >
              Enquire Now
            </span>
          </div>

          {/* WhatsApp Section */}
          <a
            href="https://wa.me/9153125312"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredBtn('whatsapp')}
            onMouseLeave={() => setHoveredBtn(null)}
            className={`bg-[#25d366] text-white flex items-center justify-end p-3 transition-all duration-300 h-[50px] border-b border-white/10 overflow-hidden ${hoveredBtn === 'whatsapp' ? 'w-[160px]' : 'w-[50px]'}`}
          >
            <span className={`transition-opacity duration-300 whitespace-nowrap font-bold text-lg pr-3 ${hoveredBtn === 'whatsapp' ? 'opacity-100' : 'opacity-0'}`}>
              WhatsApp
            </span>
            <svg
              viewBox="0 0 448 512"
              width="26"
              height="26"
              fill="currentColor"
              className="shrink-0"
            >
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.7 17.8 69.4 27.2 106.2 27.2 122.4 0 222-99.6 222-222 0-59.3-23-115.1-65-157.1zM223.9 446.3c-33.1 0-65.6-8.9-93.9-25.7l-6.7-4-69.8 18.3 18.7-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.5-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-82.7 184.6-184.5 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.5-11.3 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.6-9.3 1.9-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.3 5.7 23.7 9.2 31.8 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
            </svg>
          </a>

          {/* Phone Section */}
          <a
            href="tel:+9153125312"
            onMouseEnter={() => setHoveredBtn('phone')}
            onMouseLeave={() => setHoveredBtn(null)}
            className={`bg-[#e91e63] text-white flex items-center justify-end p-3 transition-all duration-300 h-[60px] rounded-bl-xl overflow-hidden ${hoveredBtn === 'phone' ? 'w-[180px]' : 'w-[50px]'}`}
          >
            <span className={`transition-opacity duration-300 whitespace-nowrap font-bold text-lg pr-3 ${hoveredBtn === 'phone' ? 'opacity-100' : 'opacity-0'}`}>
              Call Us Now
            </span>
            <Phone size={24} className="shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
};


export default FloatingContactSidebar;
