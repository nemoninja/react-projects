import React, { useState } from "react";
import { MainBody } from "../components/MainBody";
import {
  cellKeyChars,
  createCellKey,
  GridBuilder,
} from "../components/GridBuilder";

const numRows = 10;
const numCols = 20;

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

  return (
    <main>
      <MainBody>
        <h1>Track Builder</h1>
        <p>This is sandbox for building tracks.</p>
        <div>
          <br />
          <GridBuilder
            numRows={numRows}
            numCols={numCols}
            cellStates={cellStates}
            onClickFunction={handleCellClick}
          ></GridBuilder>
        </div>
      </MainBody>
    </main>
  );
};

export default TrackBuilderPage;

export const Head = () => <title>Track Builder</title>;
