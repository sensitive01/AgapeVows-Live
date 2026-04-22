import React from "react";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import Footer from "../../components/Footer";

const BridalMakeup = () => {
  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div style={{ paddingTop: "115px" }}>
        <section>
          <div className="container py-5">
            <div className="row">
              <div className="col-12">
                <h1 className="text-center mb-4 text-purple-600 font-bold text-3xl">
                  Bridal Make-up Services
                </h1>
                <p className="lead text-center text-gray-600 mb-5">
                  Look essential and elegant on your special day with our
                  premium bridal make-up services.
                </p>

                <div className="row mt-5">
                  <div className="col-md-6 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                      alt="Bridal Makeup"
                      className="img-fluid rounded shadow-lg w-100"
                      style={{ objectFit: "cover", height: "400px" }}
                    />
                  </div>
                  <div className="col-md-6 d-flex flex-column justify-center">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                      Our Services Include:
                    </h3>
                    <ul className="list-group list-group-flush mb-4">
                      <li className="list-group-item border-0 ps-0 flex items-center">
                        <span className="mr-2 text-purple-600">✓</span> Complete
                        Bridal Makeover
                      </li>
                      <li className="list-group-item border-0 ps-0 flex items-center">
                        <span className="mr-2 text-purple-600">✓</span> Hair
                        Styling and Draping
                      </li>
                      <li className="list-group-item border-0 ps-0 flex items-center">
                        <span className="mr-2 text-purple-600">✓</span>{" "}
                        Pre-wedding Skin Care Treatments
                      </li>
                      <li className="list-group-item border-0 ps-0 flex items-center">
                        <span className="mr-2 text-purple-600">✓</span> Party
                        Makeup for Friends and Family
                      </li>
                    </ul>
                    <p className="text-gray-600 leading-relaxed">
                      Contact us today to book a trial session or schedule your
                      appointment. We ensure you look your absolute best making
                      your day unforgettable!
                    </p>
                    <div className="mt-4">
                      <button
                        className="btn text-white px-4 py-2 rounded"
                        style={{
                          backgroundColor: "#9333ea",
                          borderColor: "#9333ea",
                        }}
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default BridalMakeup;
