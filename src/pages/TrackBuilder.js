import * as React from "react";
import "../styles/MainPage.module.css";
import paths from "../paths";
import { Link } from "gatsby";

const TrackSandbox = () => {
  return <div>a cell</div>;
};

const TrackBuilderPage = () => {
  return (
    <main>
      <h1>Track Builder</h1>
      <div class="container">
        <p>Let's build some train tracks!</p>
        <p>This is sandbox for building things.</p>
        <br />
        {TrackSandbox}
      </div>
      <div>
        <br />
        <Link to={paths.Home}>Go home</Link>.
      </div>
    </main>
  );
};

export default TrackBuilderPage;

export const Head = () => <title>Track Builder</title>;
