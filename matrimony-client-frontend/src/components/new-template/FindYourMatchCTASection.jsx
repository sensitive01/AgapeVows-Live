export default function FindYourMatchCTASection() {
  return (
    <section
      style={{
        paddingTop: '10px',
        paddingBottom: '40px',

        // 🔥 ADD THIS
        position: "relative",
        zIndex: 20,
        marginBottom: "-120px",
        transform: "translateY(350px)",
        marginTop: "-410px"
      }}
    >
      <div className="str count">
        <div className="container" style={{ maxWidth: '1350px' }}>
          <div className="row">
            <div className="fot-ban-inn">
              <div className="lhs">

                {/* 🔥 Heading → VIOLET */}
                <h2 style={{
                  color: '#a855f7'
                }}>
                  Find your perfect Match now
                </h2>

                {/* 🔥 Content → VIOLET */}
                <p style={{
                  color: '#100d13ff'
                }}>
                  Join our verified community of thousands of eligible singles seeking meaningful relationships.
                  Start your journey today and find your soulmate with our advanced matching system.
                </p>

                <a
                  href="/user/user-sign-up"
                  className="cta-3"
                  style={{
                    display: "inline-block",
                    padding: "10px 20px",
                    border: "2px solid black",
                    background: "transparent",
                    color: "black",
                    textDecoration: "none",
                    borderRadius: "6px",
                    fontWeight: "600"
                  }}
                >
                  Register Now
                </a>

                <a
                  href="/user/user-sign-up"
                  className="cta-4"
                  style={{
                    display: "inline-block",
                    padding: "10px 20px",
                    border: "2px solid black",
                    background: "transparent",
                    color: "black",
                    textDecoration: "none",
                    borderRadius: "6px",
                    fontWeight: "600",
                    marginLeft: "10px"
                  }}
                >
                  Help & Support
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
