import React from "react";

import { ImageFetcher } from "./ImageFetcher";
import data from "../data/fish.json";
// import MonthsEnum from "../data/MonthsEnum.js";

const cellEdge = "100px";

export function FishEntries() {
  const entries = data.fish;
  const numCols = 10;
  const numRows = entries.length / numCols;

  return (
    <div id="fish-entries" style={{ padding: "20px" }}>
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
        {entries.map((entry) => {
          return (
            <div>
              <button
                onClick={() => {}}
                id={`${entry.name}_button`}
                style={{
                  alignItems: "center",
                  backgroundColor: "None",
                  border: "solid 2px black",
                  display: "flex",
                  height: cellEdge,
                  justifyContent: "center",
                  margin: -2,
                  width: cellEdge,
                }}
              >
                <ImageFetcher
                  folderName="fish"
                  filename={entry.image}
                  iconEdge="50px"
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
