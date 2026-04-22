import React from "react";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import Footer from "../../components/Footer";

const MaritalCounseling = () => {
  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div style={{ paddingTop: "115px" }}>
        <div className="container py-5">
          <h1 className="text-center text-3xl font-bold text-purple-600 mb-4">
            Pre-Marital & Marital Counseling
          </h1>
          <p className="text-center text-gray-600">
            Professional guidance to build strong and lasting relationships.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MaritalCounseling;