import React from "react";

import data from "../data/n_fish.json";
// import MonthsEnum from "../data/MonthsEnum.js";

const cellEdge = "100px";
const iconEdge = "50px";

export function FishEntries() {
  const entries = data.n_fish;
  const numCols = 10;
  const numRows = entries.length / numCols;

  const images = require.context("../assets/fish", false);
  const imageList = images.keys().map((image) => images(image));

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
        {imageList.map((image, index) => {
          console.log("image", image);
          return (
            <div>
              <button
                onClick={() => {}}
                id={index}
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
                <img
                  alt={`${index}_icon`}
                  height={iconEdge}
                  width={iconEdge}
                  src={image.default}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
