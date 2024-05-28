import React, { useState } from "react";
import { MainBody } from "../components/MainBody";

const numRows = 4;
const numCols = 5;
const cellEdge = "50px"; // 50px by 50pxs
const cellKeyChars = {
  prefix: "cell",
  delimiter: "-",
};

/*
[0] : direction of neighbour relative to target cell 
[1] : direction or target cell relative to neighbour cell 
[2] : row index from target cell
[3] : col index from target cell
 */
const neighbours = [
  ["n", "s", -1, 0],
  ["s", "n", 1, 0],
  ["e", "w", 0, 1],
  ["w", "e", 0, -1],
];

function createCellKey(rowIndex, colIndex) {
  return cellKeyChars.prefix.concat(
    cellKeyChars.delimiter,
    rowIndex,
    cellKeyChars.delimiter,
    colIndex
  );
}

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

  function getConnectedNodes(cellKey) {
    const splitKey = cellKey.split(cellKeyChars.delimiter);
    const rowIndex = parseInt(splitKey[1]);
    const colIndex = parseInt(splitKey[2]);

    const cellIsTrack = cellStates[cellKey]?.isTrack ?? false;
    const cellConnections = {};

    neighbours.forEach((neighbour) => {
      const [direction, neighboursDirection, rowDiff, colDiff] = neighbour;
      const neighbourKey = createCellKey(
        rowIndex + rowDiff,
        colIndex + colDiff
      );
      const neighboursConnections = cellStates[neighbourKey]?.connections ?? {};
      const neighbourIsTrack = cellStates[neighbourKey]?.isTrack ?? false;

      if (cellIsTrack) {
        // if currently true, we are removing the track, i.e. unset connections
        neighboursConnections[neighboursDirection] = false;
      } else {
        // if currently false, we are adding a track, i.e. set connections
        if (neighbourIsTrack) {
          cellConnections[direction] = true;
          neighboursConnections[neighboursDirection] = true;
        }
      }

      // set neighbour connections
      setCellStates({
        ...cellStates,
        [neighbourKey]: {
          ...cellStates[neighbourKey],
          connections: neighboursConnections,
        },
      });
    });

    return cellConnections;
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
        style={{
          display: "grid",
          gridGap: 1,
          gridTemplateColumns: `repeat(${numCols}, 1fr)`,
          gridTemplateRows: `repeat(${numRows}, 1fr)`,
          width: cellEdge,
          border: "solid 2px black",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        {Cells}
      </div>
    );
  };

  const CreateCell = (rowIndex, colIndex) => {
    const cellKey = createCellKey(rowIndex, colIndex);
    const cellFill = cellStates[cellKey]?.isTrack ? "red" : "white";

    let connectionsAsString = "";
    const connections = cellStates[cellKey]?.connections ?? {};
    Object.keys(connections).forEach((key) => {
      if (connections[key]) {
        connectionsAsString += key;
      }
    });

    return (
      <div
        onClick={handleCellClick}
        id={cellKey}
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
        {connectionsAsString}
      </div>
    );
  };

  return (
    <main>
      <MainBody>
        <h1>Track Builder</h1>
        <p>This is sandbox for building tracks.</p>
        <div>
          <br />
          {CreateGrid()}
        </div>
      </MainBody>
    </main>
  );
};

export default TrackBuilderPage;

export const Head = () => <title>Track Builder</title>;
