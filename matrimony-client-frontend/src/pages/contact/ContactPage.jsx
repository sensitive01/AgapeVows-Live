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
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div className="pt-16">
        <div className="str">
          <div className="ban-inn ab-ban pg-cont">
            <div className="container">
              <div className="row">
                <div className="hom-ban">
                  <div className="ban-tit">
                    <span>We are here to assist you.</span>
                    <h1>Contact us</h1>
                    <p>
                      Most Trusted and premium Matrimony Service in the World.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="ab-sec2 pg-cont">
          <div className="container">
            <div className="row">
              <ul>
                <li>
                  <div className="we-here">
                    <h3>Our office</h3>
                    <p>
                      Most Trusted and premium Matrimony Service in the World.
                    </p>
                    <span>
                      <i className="fa fa-phone" aria-hidden="true" /> +92
                      (8800) 68 - 8960
                    </span>
                    <span>
                      <i className="fa fa-envelope-o" aria-hidden="true" />
                      help@company.com
                    </span>
                    <span>
                      <i className="fa fa-map-marker" aria-hidden="true" />{" "}
                      28800 Orchard Lake Road, Suite 180 Farmington Hills,
                      U.S.A.
                    </span>
                  </div>
                </li>
                <li>
                  <div className="we-cont">
                    <img src="images/icon/trust.png" alt="" />
                    <h4>Enquire Now</h4>
                    <p>
                      Most Trusted and premium Matrimony Service in the World.
                    </p>
                    <a href="#enquire-form" className="cta-rou-line">
                      Enquire Now
                    </a>
                  </div>
                </li>
                <li>
                  <div className="we-cont">
                    <img src="images/icon/telephone.png" alt="" />
                    <h4>WhatsApp Support</h4>
                    <p>
                      Most Trusted and premium Matrimony Service in the World.
                    </p>
                    <a href="#!" className="cta-rou-line">
                      Talk to sales
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="enquire-form">
        <div className="login pg-cont pb-4">
          <div className="container">
            <div className="row">
              <div className="inn">
                <div className="lhs">
                  <div className="tit">
                    <h2>
                      Now <b>Contact to us</b> Easy and fast.
                    </h2>
                  </div>
                  <div className="im">
                    <img src="images/login-couple.png" alt="" />
                  </div>
                  <div className="log-bg">&nbsp;</div>
                </div>
                <div className="rhs">
                  <div>
                    <div className="form-tit">
                      <h4>Let's talk</h4>
                      <h1>Send your enquiry now</h1>
                    </div>
                    <div className="form-login">
                      <form className="cform fvali" onSubmit={handleSubmit}>
                        {statusMsg && (
                          <div
                            className={`alert ${isError ? "alert-danger" : "alert-success"} cmessage`}
                            role="alert"
                          >
                            {statusMsg}
                          </div>
                        )}
                        <div className="form-group">
                          <label className="lb">Name:</label>
                          <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Enter your full name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="lb">Email:</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="lb">Phone:</label>
                          <input
                            type="number"
                            className="form-control"
                            id="phone"
                            placeholder="Enter phone number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="lb">Message:</label>
                          <textarea
                            name="message"
                            className="form-control"
                            id="message"
                            placeholder="Enter message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                          {isSubmitting ? "Sending..." : "Send Enquiry"}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      < Footer />

    </div>
  );
};

export default ContactPage;
