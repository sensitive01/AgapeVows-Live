import React, { useEffect } from "react";

const UserLayout = ({ children }) => {
  useEffect(() => {
    document.body.classList.add("user-ui");
    return () => {
      document.body.classList.remove("user-ui");
    };
  }, []);

  return <>{children}</>;
};

export default UserLayout;
