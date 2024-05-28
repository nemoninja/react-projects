import React from "react";
import * as styles from "../styles/Banner.module.css";
import paths from "../paths";

export function Banner() {
  return (
    <div className={styles.banner}>
      <a className={styles.bannerLink} href={paths.Home}>
        nemoninja's React Projects
      </a>
    </div>
  );
}
