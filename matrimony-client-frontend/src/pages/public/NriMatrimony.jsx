import React from "react";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import Footer from "../../components/Footer";

const NriMatrimony = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      {/* Coming Soon Content */}
      <div
        className="flex flex-col justify-center items-center text-center"
        style={{ paddingTop: "115px", minHeight: "80vh" }}
      >
        <h1 className="text-4xl font-bold text-purple-600 mb-3">
          Coming Soon 🚀
        </h1>
        <p className="text-gray-500 text-lg">
          NRI Matrimony page is under development.
        </p>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NriMatrimony;