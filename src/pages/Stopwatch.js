import React, { useState, useEffect } from "react";
import "../styles/MainPage.module.css";
import paths from "../paths";
import { Link } from "gatsby";

let pauseButtonLabel = "Start";

const StopwatchPage = () => {
  const [pause, setPause] = useState(true);
  const [startTime, setStartTime] = useState(Date.now());
  const [localDifference, setLocalDifference] = useState(0);
  const [totalDifference, setTotalDifference] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (!pause) {
        setLocalDifference(Date.now() - startTime);
        setTotalDifference(totalDifference + localDifference);
      }
    }, 100);
  });

  function handlePause() {
    if (!pause) {
      setStartTime(Date.now());
      setLocalDifference(0);
      pauseButtonLabel = "Pause";
    } else pauseButtonLabel = "Resume";
    setPause(!pause);
  }

  function handleClear() {
    setPause(true);
    setLocalDifference(0);
    setTotalDifference(0);
    setStartTime(Date.now());
    pauseButtonLabel = "Start";
  }

  function timeToString(timestamp) {
    // const date = new Date(timestamp);
    // const hh = date.getUTCHours();
    // const mm = date.getUTCMinutes();
    // const ss = date.getSeconds();
    // return hh + ":" + mm + ":" + ss;

    return timestamp / 1000;
  }

  return (
    <main>
      <h1>Stopwatch</h1>
      <div className="container">
        <p>This is a stopwatch.</p>
        <p>{totalDifference}</p>
        <p>{timeToString(totalDifference)}</p>
        <p>{startTime}</p>
        <br />
        <button onClick={handlePause} style={{ width: 60 }}>
          {pauseButtonLabel}
        </button>
        <button onClick={handleClear} style={{ width: 60 }}>
          Clear
        </button>
      </div>
      <div>
        <br />
        <Link to={paths.Home}>Go home</Link>.
      </div>
    </main>
  );
};

export default StopwatchPage;

export const Head = () => <title>Stopwatch</title>;
