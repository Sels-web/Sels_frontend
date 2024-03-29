import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";

import { AppSidebarNav } from "./AppSidebarNav";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Logo from "../assets/images/logo.jpg";

// sidebar nav config
import navigation from "../_nav";
import sidebarStore, {setSidebarState} from "../store/sidebarStore";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector(state => state.sidebarStore.sidebarUnfoldable);
  const sidebarShow = useSelector(state => state.sidebarStore.sidebarShow);

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(setSidebarState({ type: "set", sidebarShow: visible }));
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <img
          className={"logo"}
          src={Logo}
          width={100}
          styles={"display:block;padding: 20px"}
          alt="Sels"
        />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() =>
          dispatch(setSidebarState({ type: "set", sidebarUnfoldable: !unfoldable }))
        }
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
