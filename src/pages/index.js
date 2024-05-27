import * as React from "react";
import "../styles/MainPage.module.css";
import paths from "../paths";
import { Link } from "gatsby";

const IndexPage = () => {
  return (
    <main>
      <h1>
        Hello n00bs
        <br />
        <span>— smell ya later, gramps</span>
      </h1>
      <div>
        <p>
          Let's build some train tracks{" "}
          <Link to={paths.TrackBuilder}>here</Link>!
        </p>
        <p>
          Let's stop some watches <Link to={paths.Stopwatch}>here</Link>!
        </p>
      </div>
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
