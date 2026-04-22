import React from "react";
import PreLoader from "../../components/PreLoader";
import PopUpSearch from "../../components/PopUpSearch";
import TopMenu from "../../components/TopMenu";
import MenuPopUp1 from "../../components/MenuPopUp1";
import MenuPopUp2 from "../../components/MenuPopUp2";
import MainMenuBar from "../../components/MainMenuBar";
import ExploreMenuPopUp from "../../components/ExploreMenuPopUp";
import MobileUserProfileMenu from "../../components/MobileUserProfileMenu";
import MainLayout from "../agapeows-components/layout/MainLayout";
const LayoutComponent = () => {
  return (
    <>
      {/* <PreLoader /> */}
      <MainLayout />
      {/* <PopUpSearch />
      <TopMenu />
      <MenuPopUp1 />
      <MenuPopUp2 />
      <MainMenuBar />
      <ExploreMenuPopUp />
      <MobileUserProfileMenu /> */}
    </>
  );
};

export default LayoutComponent;
