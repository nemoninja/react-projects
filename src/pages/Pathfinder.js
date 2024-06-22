import React, { useRef, useState } from "react";
import { MainBody } from "../components/MainBody";
import { getCellIndex, createCellKey } from "../components/GridBuilder";

import iconSrc from "../assets/espurr.webp";

const cellEdge = 50; // 50px by 50pxs
const iconEdge = 48; // 50px by 50pxs
const iconOffset = 0.8; // magic

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

const PathfinderPage = () => {
  const [cellStates, setCellStates] = useState({});
  const [iconCoords, setIconCoords] = useState(null);

  const cellRef = useRef(null);

  function setOrDeleteCellRef(node, cellKey) {
    if (!cellRef.current) {
      cellRef.current = new Map();
    }

    if (node) {
      cellRef.current.set(cellKey, node);
    } else {
      cellRef.current.delete(cellKey);
    }
  }

  function getPositionXYOnClick(cellKey) {
    const cellNode = cellRef.current.get(cellKey);
    const cellTop = cellNode.getBoundingClientRect().top;
    const cellLeft = cellNode.getBoundingClientRect().left;
    return [cellTop + iconOffset, cellLeft + iconOffset];
  }

  function iconImage(inputCoords) {
    let iconStyle;
    if (inputCoords === null) {
      iconStyle = {
        padding: 0,
      };
    } else {
      const [topValue, leftValue] = inputCoords;
      iconStyle = {
        position: "absolute",
        left: leftValue,
        top: topValue,
        padding: 0,
      };
    }

    return (
      <img
        alt="icon"
        height={iconEdge}
        width={iconEdge}
        src={iconSrc}
        style={iconStyle}
      />
    );
  }

  function GridBuilder({ numRows, numCols, cellStates, onClickFunction }) {
    const createCell = (rowIndex, colIndex) => {
      const cellKey = createCellKey(rowIndex, colIndex);
      const cellFill = cellStates[cellKey]?.isActive ? "#EF4179" : "white";

      let connectionsAsString = "";
      const connections = cellStates[cellKey]?.connections ?? {};
      Object.keys(connections).forEach((key) => {
        if (connections[key]) {
          connectionsAsString += key;
        }
      });

      return (
        <button
          onClick={onClickFunction}
          ref={(node) => setOrDeleteCellRef(node, cellKey)}
          id={cellKey}
          style={{
            alignItems: "center",
            backgroundColor: cellFill,
            border: "solid 2px black",
            display: "flex",
            margin: -2,
            padding: 0,
            height: cellEdge,
            width: cellEdge,
          }}
        >
          {connectionsAsString}
        </button>
      );
    };

    const cells = [];
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        cells.push(createCell(i, j));
      }
    }

    return (
      <div
        style={{
          display: "grid",
          gridGap: 1,
          gridTemplateColumns: `repeat(${numCols}, 1fr)`,
          gridTemplateRows: `repeat(${numRows}, 1fr)`,
          justifyContent: "center",
          margin: "auto",
          width: cellEdge,
        }}
      >
        {cells}
      </div>
    );
  }

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

    const cellCoords = getPositionXYOnClick(cellKey);
    setIconCoords(cellCoords);
  }

  return (
    <main>
      <MainBody>
        {iconImage(null)}
        {iconImage(iconCoords)}
        <h1>Pathfinder</h1>
        <p>This is sandbox for finding a path.</p>
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

export default PathfinderPage;

export const Head = () => <title>Pathfinder</title>;
