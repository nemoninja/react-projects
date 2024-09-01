import React from "react";

import { FishEntries } from "./FishEntries";

// import MonthsEnum from "../data/MonthsEnum.js";
import FishLocationsEnum from "../data/FishLocationsEnum.js";

export function FishPage() {
  const arrLocations = Object.values(FishLocationsEnum());
  return (
    <div id="fish-page" key="fish-page" style={{ padding: "20px" }}>
      {arrLocations.map((location) => (
        <div id={`${location}-section`} key={`${location}-section`}>
          <h2 style={{ alignText: "center", width: "100%" }}>{location}</h2>
          <FishEntries location={location} />
        </div>
      ))}
    </div>
  );
}
