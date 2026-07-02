export default function FindYourMatchCTASection() {
  return (
    <section
      style={{
        paddingTop: '0px',
        paddingBottom: '0px',
        position: "relative",
        zIndex: 20
      }}
    >
      <style>{`
        .fot-ban-inn {
          margin: 10px 0 0 0 !important;
          background: #e1b94d !important;
          box-shadow: 0 10px 30px rgba(225, 185, 77, 0.25) !important;
          border-radius: 15px !important;
        }
        .fot-ban-inn .lhs {
          padding: 25px 30px !important;
          text-align: center !important;
        }
        .fot-ban-inn .lhs h2 {
          color: #58219f !important;
          margin-bottom: 8px !important;
          font-weight: 700 !important;
        }
        .fot-ban-inn .lhs p {
          color: #58219f !important;
          padding: 0 0 15px 0 !important;
          font-weight: 500 !important;
        }
        .fot-ban-inn .lhs:before {
          display: none !important;
          animation: none !important;
        }
      `}</style>
      <div className="str count">
        <div className="container" style={{ maxWidth: '1350px' }}>
          <div className="row">
            <div className="fot-ban-inn">
              <div className="lhs">

                {/* Heading → VIOLET/DARK PURPLE */}
                <h2>
                  Find your perfect Match now
                </h2>

                {/* Content → DARK PURPLE */}
                <p>
                  Join our verified community of thousands of eligible singles seeking meaningful relationships.
                  Start your journey today and find your soulmate with our advanced matching system.
                </p>

                  <a
                    href="/user/user-sign-up"
                    className="cta-3"
                    style={{
                      display: "inline-block",
                      padding: "10px 24px",
                      border: "2px solid #58219f",
                      background: "#58219f",
                      color: "#ffffff",
                      textDecoration: "none",
                      borderRadius: "6px",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                      textTransform: "uppercase",
                      fontSize: "14px"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "transparent";
                      e.target.style.color = "#58219f";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "#58219f";
                      e.target.style.color = "#ffffff";
                    }}
                  >
                    REGISTER NOW
                  </a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
