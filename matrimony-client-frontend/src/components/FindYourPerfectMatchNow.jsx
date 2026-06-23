import React from "react";

const FindYourPerfectMatchNow = () => {
  return (
    <section className="py-2 my-2" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
      <style>{`
        .fot-ban-inn {
          margin: 10px 0 0 0 !important;
          background: #58219f !important;
          box-shadow: 0 10px 30px rgba(88, 33, 159, 0.25) !important;
          border-radius: 15px !important;
        }
        .fot-ban-inn .lhs {
          padding: 25px 30px !important;
        }
        .fot-ban-inn .lhs h2 {
          color: #ffffff !important;
          margin-bottom: 8px !important;
          font-weight: 700 !important;
        }
        .fot-ban-inn .lhs p {
          color: rgba(255, 255, 255, 0.9) !important;
          padding: 0 0 5px 0 !important;
          font-weight: 500 !important;
          margin-bottom: 0 !important;
        }
        .fot-ban-inn .lhs:before {
          display: none !important;
          animation: none !important;
        }
      `}</style>
      <div className="px-4 lg:px-12">
        <div className="str count rounded-3xl overflow-hidden shadow-sm">
          <div className="container">
            <div className="row">
              <div className="fot-ban-inn">
                <div className="lhs">
                  <h2>
                    Find your perfect Match now
                  </h2>
                  <p>
                    lacinia viverra lectus. Fusce imperdiet ullamcorper metus eu
                    fringilla.Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindYourPerfectMatchNow;
