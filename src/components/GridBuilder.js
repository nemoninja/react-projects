import React from "react";

const cellEdge = "50px"; // 50px by 50pxs

const cellKeyChars = {
  prefix: "cell",
  delimiter: "-",
};

export function createCellKey(rowIndex, colIndex) {
  return cellKeyChars.prefix.concat(
    cellKeyChars.delimiter,
    rowIndex,
    cellKeyChars.delimiter,
    colIndex
  );
}

export function getCellIndex(cellKey) {
  const splitKey = cellKey.split(cellKeyChars.delimiter);
  const rowIndex = parseInt(splitKey[1]);
  const colIndex = parseInt(splitKey[2]);
  return [rowIndex, colIndex];
}

export function GridBuilder({ numRows, numCols, cellStates, onClickFunction }) {
  const CreateCell = (rowIndex, colIndex) => {
    const cellKey = createCellKey(rowIndex, colIndex);
    const cellFill = cellStates[cellKey]?.isActive ? "red" : "white";

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
        id={cellKey}
        style={{
          alignItems: "center",
          backgroundColor: cellFill,
          border: "solid 2px black",
          display: "flex",
          height: cellEdge,
          margin: -2,
          width: cellEdge,
        }}
      >
        {connectionsAsString}
      </button>
    );
  };

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
        justifyContent: "center",
        margin: "auto",
        width: cellEdge,
      }}
    >
      {Cells}
    </div>
  );
}

export default GridBuilder;
