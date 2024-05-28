import * as React from "react";
import * as styles from "../styles/MainPage.module.css";
import { Banner } from "../components/Banner";
import paths from "../paths";
import { Link } from "gatsby";

const IndexPage = () => {
  return (
    <main>
      <Banner />
      <div className={styles.mainBody}>
        <h1>Hello n00bs</h1>
        <div>
          <p>
            Let's build some train tracks{" "}
            <Link to={paths.TrackBuilder}>here</Link>!
          </p>
          <p>
            Let's stop some watches <Link to={paths.Stopwatch}>here</Link>!
          </p>
        </div>
      </div>
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>React Projects</title>;
