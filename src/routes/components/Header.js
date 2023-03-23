import styles from "../components/css/home.module.css";
import Menu from "./elements/Menu";
import { useMediaQuery } from "react-responsive";
import Sidebar from "./elements/Sidebar";
import Sidemenu from "./elements/Sidemenu";
import React, { useEffect, useState } from "react";

export const Small = ({ children }) => {
  const isSmall = useMediaQuery({
    query: "(max-width:981px)",
  });
  return <>{isSmall && children}</>;
};

export const Big = ({ children }) => {
  const isBig = useMediaQuery({
    query: "(min-width:980px)",
  });
  return <>{isBig && children}</>;
};

function Header() {
  return (
    <>
      <Small>
        <div className={styles.Header}>
          <img
            className={styles.Logo}
            src="assets/img/sels_logo.jpeg"
            alt="logo"
            style={{
              width: 150,
              height: 100,
              margin: 0,
              padding: 0,
            }}
          />
          {/* <span className={styles.Logo}>Logo</span> */}
          {/* <LoginModal /> */}
          {/* <DiscordLoginModal /> */}
          <Sidebar width={360}>
            <Sidemenu />
          </Sidebar>
        </div>
      </Small>
      <Big>
        <div className={styles.Header}>
          <img
            className={styles.Logo}
            src="assets/img/sels_logo.jpeg"
            alt="logo"
            style={{
              width: 150,
              height: 100,
              margin: 0,
              padding: 0,
            }}
          />
          {/* <span className={styles.Logo}>Logo</span> */}
          <Menu />
          {/* <LoginModal /> */}
          {/* <DiscordLoginModal /> */}
        </div>
      </Big>
    </>
  );
}

export default Header;
