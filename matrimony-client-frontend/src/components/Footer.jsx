import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Phone, MessageSquare, MessageCircle } from 'lucide-react';

const Footer = ({ paddingTop = '40px' }) => {
  return (
    <>
      <footer className="agape-vows-footer mt-auto" style={{
        backgroundColor: '#4a2580',
        backgroundImage: 'none',
        opacity: 1,
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
            display: inline-block;
            padding: 8px 0;
          }

          .agape-vows-footer a:hover {
            color: #d4af37 !important;
            transform: translateX(5px);
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
            margin-bottom: 15px;
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
            paddingBottom: '20px',
            marginBottom: '25px',
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
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>+91 96637 96699</div>
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
            <div style={{ flex: '1 1 250px', minWidth: '250px', textAlign: 'center' }}>
              <h4 className="footer-section-title">Quick Links</h4>
              <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '20px', textAlign: 'center' }}>
                <li><Link to="/about-us" style={{ display: 'inline-block' }}>About Us</Link></li>
                <li><Link to="/faq" style={{ display: 'inline-block' }}>FAQs</Link></li>
                <li><Link to="/user/events-page" style={{ display: 'inline-flex', alignItems: 'center' }}>Events </Link></li>
                <li><Link to="/church-partner" style={{ display: 'inline-block' }}>Churches</Link></li>
                <li><Link to="/privacy-policy" style={{ display: 'inline-block' }}>Privacy Policy</Link></li>
                <li><Link to="/terms-of-use" style={{ display: 'inline-block' }}>Terms of use</Link></li>
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
                <a href="https://www.facebook.com/AgapeVows/" target="_blank" rel="noopener noreferrer" className="soc-icon-wrap"><Facebook /></a>
                <a href="https://www.instagram.com/agapevows_matrimony" target="_blank" rel="noopener noreferrer" className="soc-icon-wrap"><Instagram /></a>
                <a href="https://www.youtube.com/@AgapeVowsMatrimony" target="_blank" rel="noopener noreferrer" className="soc-icon-wrap"><Youtube /></a>
              </div>
            </div>

          </div>

          {/* COPYRIGHT / CREDIT */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.3)",
              marginTop: "30px",
              paddingTop: "15px",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            <p style={{ color: "white", marginBottom: "5px" }}>
              © {new Date().getFullYear()} AgapeVows Christian Matrimony. All rights reserved.
            </p>
            <p style={{ color: "rgba(255, 255, 255, 0.7)", marginBottom: 0, fontSize: "13px", maxWidth: "800px", margin: "0 auto" }}>
              This platform is strictly for matrimonial purposes only and is not a dating or causal relationship platform.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;