import { useEffect, useState } from "react";
import styles from "../components/css/home.module.css";
import Section from "../components/Section";
import TopButton from "./elements/TopButton";
import Calendar from "./elements/Calendar";

function Main() {
  return (
    <div className={styles.Main}>
      <div id="1">
        <div className={styles.section}>
          <Calendar />
        </div>
      </div>
      <div id="2">
        <Section cnt="2" />
      </div>
      <div id="3">
        <Section cnt="3" />
      </div>
      <div id="4">
        <Section cnt="4" />
      </div>
      <TopButton />
    </div>
  );
}

export default Main;
