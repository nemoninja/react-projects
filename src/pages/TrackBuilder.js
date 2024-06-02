import React, { useState } from "react";
import { MainBody } from "../components/MainBody";
import {
  getCellIndex,
  createCellKey,
  GridBuilder,
} from "../components/GridBuilder";

const numRows = 10;
const numCols = 20;

/*
[0] : direction of nb relative to target cell 
[1] : direction or target cell relative to nb cell 
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
    const cellKey = e.target.id;
    const [rowIndex, colIndex] = getCellIndex(cellKey);

    const cellIsActive = cellStates[cellKey]?.isActive ?? false;
    const cellConnections = {};

    neighbours.forEach((nb) => {
      const [direction, nbDirection, rowDiff, colDiff] = nb;
      const nbKey = createCellKey(rowIndex + rowDiff, colIndex + colDiff);
      const nbConnections = cellStates[nbKey]?.connections ?? {};
      const nbIsActive = cellStates[nbKey]?.isActive ?? false;

      if (cellIsActive) {
        // if currently true, we are removing the track, i.e. unset connections
        // target cell's connections remain empty
        nbConnections[nbDirection] = false;
      } else {
        // if currently false, we are adding a track, i.e. set connections
        if (nbIsActive) {
          cellConnections[direction] = true;
          nbConnections[nbDirection] = true;
        }
      }

      setCellStates({
        ...cellStates,
        [nbKey]: {
          ...cellStates[nbKey],
          connections: nbConnections,
        },
      });
    });

    setCellStates({
      ...cellStates,
      [cellKey]: {
        ...cellStates[cellKey],
        isActive: !cellIsActive,
        connections: cellConnections,
      },
    });
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
