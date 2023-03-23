import { useEffect, useState } from "react";
import styles from "./components/css/home.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Section from "./components/Section";
import TopButton from "./components/elements/TopButton";
import Calendar from "./components/Main";
import Main from "./components/Main";

function Home() {
  return (
    <div className={styles.all}>
      <Header />
      <div className={styles.grid}>
        <Main />
        <TopButton />
        <div className={styles.Footer}>Footer</div>
      </div>
    </div>
  );
}
export default Home;
