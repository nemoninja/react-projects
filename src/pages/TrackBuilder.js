import * as React from "react";
import "../styles/MainPage.module.css";
import paths from "../paths";
import { Link } from "gatsby";

const numRows = 4;
const numCols = 5;
const cellEdge = "50px"; // 50px by 50pxs

const TrackSandbox = () => {
  return CreateGrid();
};

const CreateGrid = () => {
  const Cells = [];
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      Cells.push(CreateCell(i, j));
    }
  }

  return (
    <div
      className="container"
      style={{
        display: "grid",
        gridGap: 1,
        gridTemplateColumns: `repeat(${numCols}, 1fr)`,
        gridTemplateRows: `repeat(${numRows}, 1fr)`,
        width: cellEdge,
        border: "solid 2px black",
      }}
    >
      {Cells}
    </div>
  );
};

const CreateCell = (rowIndex, colIndex) => {
  const cellKey = `cell-${rowIndex}-${colIndex}`;
  return (
    <div
      className={cellKey}
      id={cellKey}
      style={{
        height: cellEdge,
        width: cellEdge,
        border: "solid 2px black",
        margin: -2,
        display: "flex",
        alignItems: "center",
      }}
    >
      {cellKey}
    </div>
  );
};

const TrackBuilderPage = () => {
  return (
    <main>
      <h1>Track Builder</h1>
      <div class="container">
        <p>Let's build some train tracks!</p>
        <p>This is sandbox for building things.</p>
        <br />
        {TrackSandbox()}
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
