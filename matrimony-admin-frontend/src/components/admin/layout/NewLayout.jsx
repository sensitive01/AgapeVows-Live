import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const NewLayout = ({children}) => {
  return (
    <div className="admin-layout">
      <Header />
      <section>
        <div className="main">
          <div className="incon row">
            <Sidebar />
            <div className="main-content">{children}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewLayout;
