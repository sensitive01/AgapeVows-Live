import React from "react";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import Footer from "../../components/Footer";

const InsuranceServices = () => {
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
                  Insurance Services
                </h1>
                <p className="lead text-center text-gray-600 mb-5">
                  Secure your future and your family with our comprehensive
                  insurance plans tailored for new couples.
                </p>

                <div className="row mt-5">
                  <div className="col-md-6 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                      alt="Insurance Services"
                      className="img-fluid rounded shadow-lg w-100"
                      style={{ objectFit: "cover", height: "400px" }}
                    />
                  </div>
                  <div className="col-md-6 d-flex flex-column justify-center">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                      Why Choose Our Insurance Plans?
                    </h3>
                    <ul className="list-group list-group-flush mb-4">
                      <li className="list-group-item border-0 ps-0 flex items-center">
                        <span className="mr-2 text-purple-600">🛡️</span>{" "}
                        Tailored Life Insurance Policies
                      </li>
                      <li className="list-group-item border-0 ps-0 flex items-center">
                        <span className="mr-2 text-purple-600">🏥</span> Health
                        and Medical Coverage
                      </li>
                      <li className="list-group-item border-0 ps-0 flex items-center">
                        <span className="mr-2 text-purple-600">🏠</span> Family
                        Protection & Home Plans
                      </li>
                      <li className="list-group-item border-0 ps-0 flex items-center">
                        <span className="mr-2 text-purple-600">💰</span>{" "}
                        Investment and Savings Options
                      </li>
                    </ul>
                    <p className="text-gray-600 leading-relaxed">
                      Starting a new life together comes with responsibilities.
                      Our experts are here to guide you through the best options
                      for your needs. Get in touch for a free consultation.
                    </p>
                    <div className="mt-4">
                      <button
                        className="btn text-white px-4 py-2 rounded"
                        style={{
                          backgroundColor: "#9333ea",
                          borderColor: "#9333ea",
                        }}
                      >
                        Get a Quote
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

export default InsuranceServices;
