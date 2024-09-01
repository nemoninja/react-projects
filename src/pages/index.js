import * as React from "react";
import { MainBody } from "../components/MainBody";
import paths from "../paths";
import { Link } from "gatsby";

const IndexPage = () => {
  return (
    <main>
      <MainBody>
        <h1>Hello n00bs</h1>
        <div>
          <p>
            Let's find a path <Link to={paths.Pathfinder}>here</Link>!
          </p>
          <p>
            Let's build some train tracks{" "}
            <Link to={paths.TrackBuilder}>here</Link>!
          </p>
          <p>
            Let's stop some watches <Link to={paths.Stopwatch}>here</Link>!
          </p>
          <p>
            Let's find some critters <Link to={paths.Critterpedia}>here</Link>!
          </p>
        </div>
      </MainBody>
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>React Projects</title>;
