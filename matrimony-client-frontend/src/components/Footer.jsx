import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Phone, MessageSquare, MessageCircle } from 'lucide-react';

const Footer = ({ paddingTop = '80px' }) => {
  return (
    <>
      <footer className="agape-vows-footer mt-auto" style={{
        background: '#2b124c',
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

          .agape-vows-footer a.contact-link-override {
            color: #fff !important;
            text-decoration: none;
            display: inline-block !important;
            padding: 0 !important;
            border-bottom: none !important;
          }

          .agape-vows-footer a.contact-link-override:hover {
            padding-left: 0 !important;
            color: #06b6d4 !important;
          }

          .agape-vows-footer ul { list-style: none; padding: 0; }

          .footer-section-title {
            font-size: 22px;
            font-weight: 700;
            color: #d4af37;
            margin-bottom: 25px;
            text-shadow: 0 0 10px rgba(255,213,79,0.6);
          }

          .soc-icon-wrap {
            width: 55px;
            height: 55px;
            background: rgba(255,255,255,0.1);
            border-radius: 50%;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 0 !important;
            border-bottom: none !important;
            transition: transform 0.25s ease, background 0.25s ease;
            color: white !important;
          }

          .soc-icon-wrap svg {
            width: 22px;
            height: 22px;
            transition: transform 0.25s ease;
          }

          .soc-icon-wrap:hover {
            transform: scale(1.1);   
            background: rgba(255,255,255,0.25);  
          }

          .soc-icon-wrap:hover svg {
            transform: scale(1.1);  
          }
        `}</style>

        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: '15px',
          paddingRight: '15px'
        }}>

          {/* Support and Contact Info Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '30px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
            paddingBottom: '30px',
            marginBottom: '40px',
            width: '100%'
          }}>
            {/* Call Us */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{
                color: '#06b6d4',
                background: 'rgba(6, 182, 212, 0.1)',
                padding: '12px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Phone size={24} style={{ color: '#06b6d4' }} />
              </div>
              <div>
                <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '2px' }}>Call Us</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>+91 484 4080333</div>
              </div>
            </div>

            {/* Toll Free */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{
                color: '#06b6d4',
                background: 'rgba(6, 182, 212, 0.1)',
                padding: '12px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Phone size={24} style={{ color: '#06b6d4' }} />
              </div>
              <div>
                <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '2px' }}>Toll Free - India</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>1800 - 103 - 4080</div>
              </div>
            </div>

            {/* Support Request */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{
                color: '#06b6d4',
                background: 'rgba(6, 182, 212, 0.1)',
                padding: '12px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MessageSquare size={24} style={{ color: '#06b6d4' }} />
              </div>
              <div>
                <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '2px' }}>Support Request</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>
                  <Link to="/contact-page" className="contact-link-override" style={{ color: '#fff', textDecoration: 'none', display: 'inline', padding: 0, borderBottom: 'none' }}>Write to Us</Link>
                </div>
              </div>
            </div>


          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '50px',
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}>

            {/* Quick Links */}
            <div style={{ flex: '2 1 400px', minWidth: '300px' }}>
              <h4 className="footer-section-title">Quick Links</h4>
              <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '40px' }}>
                <li><Link to="/about-us">About Us</Link></li>
                <li><Link to="/faq">FAQs</Link></li>
                <li><Link to="/user/events-page" style={{ display: 'flex', alignItems: 'center' }}>Events </Link></li>
                <li><Link to="/church-partner">Churches</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of use</Link></li>
              </ul>
            </div>

            {/* Social Icons */}
            <div style={{
              flex: '1 1 220px',
              minWidth: '200px',
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              <h4 className="footer-section-title">Connect With Us</h4>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '10px' }}>
                <a href="#" className="soc-icon-wrap"><Facebook /></a>
                <a href="#" className="soc-icon-wrap"><Instagram /></a>
                <a href="#" className="soc-icon-wrap"><Youtube /></a>
              </div>
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