import React, { useState } from "react";
import "../styles/MainPage.module.css";
import paths from "../paths";
import { Link } from "gatsby";

const TrackBuilderPage = () => {
  const numRows = 4;
  const numCols = 5;
  const cellEdge = "50px"; // 50px by 50pxs

  const [cellStates, setCellStates] = useState({});

  function handleCellClick(e) {
    setCellStates({
      ...cellStates,
      [e.target.id]: {
        ...cellStates[e.target.id],
        isTrack: !cellStates[e.target.id]?.isTrack,
      },
    });
  }

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
    const cellFill = cellStates[cellKey]?.isTrack ? "red" : "white";
    return (
      <div
        className={cellKey}
        onClick={handleCellClick}
        id={cellKey}
        key={cellKey}
        style={{
          height: cellEdge,
          width: cellEdge,
          border: "solid 2px black",
          backgroundColor: cellFill,
          margin: -2,
          display: "flex",
          alignItems: "center",
        }}
      >
        {cellKey}
      </div>
    );
  };

  return (
    <main>
      <h1>Track Builder</h1>
      <div className="container">
        <p>Let's build some train tracks!</p>
        <p>This is sandbox for building things.</p>
        <br />
        {CreateGrid()}
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
