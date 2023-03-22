import styles from "../components/css/home.module.css";
// import Calendar from "../components/Calender";

function Section({ cnt }) {
  return (
    <div style={{ border: "1px solid red" }} className={styles.section}>
      Section{cnt}
    </div>
  );
}

export default Section;
