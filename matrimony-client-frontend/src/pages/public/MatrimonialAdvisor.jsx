import React from "react";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import Footer from "../../components/Footer";

const MatrimonialAdvisor = () => {
  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div style={{ paddingTop: "115px" }}>
        <div className="container py-5">
          <h1 className="text-center text-3xl font-bold text-purple-600 mb-4">
            Become a Matrimonial Advisor
          </h1>
          <p className="text-center text-gray-600">
            Join our network and earn by helping others find their life partner.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MatrimonialAdvisor;