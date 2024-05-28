import React from "react";
import * as styles from "../styles/MainPage.module.css";
import { Banner } from "../components/Banner";

export function MainBody(props) {
  return (
    <div>
      <Banner />
      <div className={styles.mainBody}>{props.children}</div>
    </div>
  );
}
