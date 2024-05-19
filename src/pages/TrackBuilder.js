import React, { useState } from "react";
import "../styles/MainPage.module.css";
import paths from "../paths";
import { Link } from "gatsby";

const numRows = 4;
const numCols = 5;
const cellEdge = "50px"; // 50px by 50pxs
const cellKeyChars = {
  prefix: "cell",
  delimiter: "-",
};

const neighbours = [
  ["n", -1, 0],
  ["s", 0, 1],
  ["e", 0, 1],
  ["w", 0, -1],
];

const TrackBuilderPage = () => {
  const [cellStates, setCellStates] = useState({});

  function handleCellClick(e) {
    const connections = getConnectedNodes(e.target.id);
    setCellStates({
      ...cellStates,
      [e.target.id]: {
        ...cellStates[e.target.id],
        isTrack: !cellStates[e.target.id]?.isTrack,
        connections: connections,
      },
    });
    console.log("e.target.id ", e.target.id);
    console.log("isTrack ", cellStates[e.target.id]?.isTrack);
    console.log("connections ", connections);
  }

  function createCellKey(rowIndex, colIndex) {
    return cellKeyChars.prefix.concat(
      cellKeyChars.delimiter,
      rowIndex,
      cellKeyChars.delimiter,
      colIndex
    );
  }

  function getConnectedNodes(cellKey) {
    const splitKey = cellKey.split(cellKeyChars.delimiter);
    const rowIndex = parseInt(splitKey[1]);
    const colIndex = parseInt(splitKey[2]);

    const connectedNodes = [];

    neighbours.forEach((neighbor) => {
      const [direction, rowDiff, colDiff] = neighbor;

      console.log(rowDiff);
      console.log(rowIndex);

      const neighbourKey = createCellKey(
        rowIndex + rowDiff,
        colIndex + colDiff
      );
      console.log(neighbourKey);
      if (cellStates[neighbourKey]?.isTrack) {
        connectedNodes.push(direction);
      }
    });

    return connectedNodes;
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
    const cellKey = createCellKey(rowIndex, colIndex);
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
        {cellStates[cellKey]?.connections ?? ""}
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
