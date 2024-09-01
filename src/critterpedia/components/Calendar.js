import React from "react";

import MonthsEnum from "../data/MonthsEnum.js";

const cellEdge = "50px";

export function Calendar() {
  const arrayM = Object.values(MonthsEnum());
  const numCols = arrayM.length;
  const numRows = arrayM.length / numCols;

  return (
    <div id="calendar" style={{ padding: "20px" }}>
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
        {arrayM.map((month) => (
          <button
            onClick={() => {}}
            id={month}
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "None",
              border: "solid 2px black",
              display: "flex",
              height: cellEdge,
              margin: -2,
              width: cellEdge,
            }}
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  );
}
