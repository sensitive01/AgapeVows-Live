import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { submitFeedback } from '../api/axiosService/userAuthService';
import logoBImg from '../assets/new-template/images/logo-b.png';
import social1 from '../assets/new-template/images/social/1.png';
import social2 from '../assets/new-template/images/social/2.png';
import social3 from '../assets/new-template/images/social/3.png';
import social5 from '../assets/new-template/images/social/5.png';
import gal1 from '../assets/new-template/images/gallery/1.jpg';
import gal2 from '../assets/new-template/images/gallery/2.jpg';
import gal3 from '../assets/new-template/images/gallery/3.jpg';
import gal4 from '../assets/new-template/images/gallery/4.jpg';
import gal5 from '../assets/new-template/images/gallery/5.jpg';
import gal6 from '../assets/new-template/images/gallery/6.jpg';

const Footer = ({ paddingTop = '80px' }) => {
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await submitFeedback(feedbackData);
      if (response.status === 201 || response.data.success) {
        toast.success('Thank you for your feedback!');
        setFeedbackData({ name: '', email: '', message: '' });
      } else {
        toast.error('Failed to submit feedback. Please try again.');
      }
    } catch (error) {
      console.error('Feedback Error:', error);
      toast.error('An error occurred while submitting feedback.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <footer className="agape-vows-footer mt-auto" style={{
        background: 'linear-gradient(135deg, #7b2ff7, #9333ea, #6a11cb)',
        color: '#fff',
        paddingTop: paddingTop,
        paddingBottom: '8px',
        fontFamily: "'Poppins', sans-serif",
        position: 'relative',
        zIndex: 10
      }}>

        <style>{`
          .agape-vows-footer a {
            color: #fff !important;
            text-decoration: none;
            transition: 0.3s;
            display: block;
            padding: 10px 0;
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }

          .agape-vows-footer a:hover {
            padding-left: 10px;
            color: #d4af37 !important;
          }

          .agape-vows-footer ul { list-style: none; padding: 0; }

          .footer-section-title {
            font-size: 22px;
            font-weight: 700;
            color: #d4af37;
            margin-bottom: 25px;
            text-shadow: 0 0 10px rgba(255,213,79,0.6);
          }

          .footer-input {
            width: 100%;
            padding: 12px 15px;
            margin-bottom: 15px;
            border-radius: 10px;
            border: 1px solid rgba(255,255,255,0.3);
            background: rgba(255,255,255,0.1);
            color: #fff;
          }

          .footer-input:focus {
            border: 1px solid #d4af37;
            box-shadow: 0 0 10px rgba(255,213,79,0.5);
            outline: none;
          }

          .footer-submit {
            background: linear-gradient(45deg, #d4af37, #d4af37);
            color: #000;
            border: none;
            padding: 12px;
            border-radius: 50px;
            font-weight: 700;
            cursor: pointer;
            width: 100%;
          }

          .footer-submit:hover {
            transform: scale(1.05);
          }

          .soc-icon-wrap {
            width: 55px;
            height: 55px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 0 !important;
            border-bottom: none !important;
            transition: transform 0.25s ease, background 0.25s ease;
          }

          .soc-icon-wrap img {
            width: 22px;
            transition: transform 0.25s ease;
          }

          .soc-icon-wrap:hover {
            transform: scale(1.1);   
            background: rgba(255,255,255,0.35);  
          }

          .soc-icon-wrap:hover img {
            transform: scale(1.1);  
          }

          .gal-grid-item {
            width: 100%;
            aspect-ratio: 1;
            object-fit: cover;
            border-radius: 12px;
            transition: 0.3s;
          }

          .gal-grid-item:hover {
            transform: scale(1.1);
          }
        `}</style>

        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: '15px',
          paddingRight: '15px'
        }}>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '50px',
            justifyContent: 'space-between'
          }}>

            {/* Branding */}
            <div style={{
              flex: '1 1 220px',
              minWidth: '200px',
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(15px)",
              padding: "25px",
              borderRadius: "20px",
              textAlign: "center",
              border: "1px solid rgba(255,255,255,0.2)"
            }}>
              <h2 style={{ fontSize: '32px', fontWeight: 800 }}>AgapeVows</h2>

              <p>India's No.1 Christian Matrimony</p>

              <img
                src={logoBImg}
                alt="Logo"
                style={{
                  maxWidth: '200px',
                  margin: '20px 0',
                  filter: 'brightness(0) invert(1) contrast(200%)'
                }}
              />

              <p style={{ fontSize: '14px' }}>
                Helping you find your perfect life partner with trust & faith.
              </p>

              <p style={{ marginTop: '15px' }}>info@agapevows.com</p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '15px' }}>
                <a href="#" className="soc-icon-wrap"><img src={social1} /></a>
                <a href="#" className="soc-icon-wrap"><img src={social2} /></a>
                <a href="#" className="soc-icon-wrap"><img src={social3} /></a>
                <a href="#" className="soc-icon-wrap"><img src={social5} /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div style={{ flex: '1 1 220px', minWidth: '200px' }}>
              <h4 className="footer-section-title">Quick Links</h4>
              <ul>
                <li><Link to="/about-us">About Us</Link></li>
                <li><Link to="/faq">FAQs</Link></li>
                <li><Link to="/user/events-page">Events</Link></li>
                <li><Link to="/church-partner">Churches</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms</Link></li>
                <li><Link to="/refund">Refund</Link></li>
              </ul>
            </div>

            {/* Gallery */}
            <div style={{ flex: '1 1 220px', minWidth: '200px' }}>
              <h4 className="footer-section-title">Gallery</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
                {[gal1, gal2, gal3, gal4, gal5, gal6].map((img, i) => (
                  <img key={i} src={img} className="gal-grid-item" alt="" />
                ))}
              </div>
            </div>

            {/* Feedback */}
            <div style={{ flex: '1 1 220px', minWidth: '200px' }}>
              <h4 className="footer-section-title">Feedback</h4>
              <form onSubmit={handleFeedbackSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="footer-input"
                  value={feedbackData.name}
                  onChange={handleFeedbackChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="footer-input"
                  value={feedbackData.email}
                  onChange={handleFeedbackChange}
                  required
                />
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Message"
                  className="footer-input"
                  value={feedbackData.message}
                  onChange={handleFeedbackChange}
                  required
                ></textarea>
                <button
                  type="submit"
                  className="footer-submit"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>

          </div>

          {/* COPYRIGHT / CREDIT */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.3)",
              marginTop: "60px",
              paddingTop: "20px",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            <p style={{ color: "white", marginBottom: 0 }}>
              © {new Date().getFullYear()} AgapeVows Christian Matrimony. All rights reserved. | Designed and Developed by{" "}
              <a
                href="https://sensitive.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#9de2c7",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  transition: "0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.target.style.color = "#9de2c7")}
              >
                Sensitive Technologies
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;