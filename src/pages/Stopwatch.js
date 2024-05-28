import React, { useState, useEffect } from "react";
import { MainBody } from "../components/MainBody";
import "../styles/StopwatchPage.module.css";

let intervalId = 0;
let pauseButtonLabel = "Start";

function timeUnitToString(unit, value, defaultVal = "") {
  return value === 0 ? defaultVal : value + unit + " ";
}

function timeToString(timestamp) {
  const date = new Date(timestamp);
  const hh = timeUnitToString("h", date.getUTCHours());
  const mm = timeUnitToString("m", date.getUTCMinutes());
  const ss = timeUnitToString("s", date.getSeconds(), "0s ");
  const ms = String(parseInt(date.getMilliseconds() / 10)).padStart(2, "0");
  return hh + mm + ss + ms;
}

const StopwatchPage = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [localDelta, setLocalDelta] = useState(0); // time difference between each resume-pause interval
  const [cachedTime, setCachedTime] = useState(0); // cache the last paused time delta on the stopwatch
  const [stopwatchTime, setStopwatchTime] = useState(0); // the current display on the stopwatch

  useEffect(() => {
    setStopwatchTime(() => cachedTime + localDelta);
  }, [cachedTime, localDelta]);

  function handlePause() {
    if (isRunning) {
      pauseButtonLabel = "Resume";

      clearInterval(intervalId);
      setCachedTime(stopwatchTime);
      setLocalDelta(0);
    } else {
      pauseButtonLabel = "Pause";

      let startTime = Date.now();
      intervalId = setInterval(() => {
        setLocalDelta(Date.now() - startTime);
      }, 100);
    }
    setIsRunning(!isRunning);
  }

  function handleClear() {
    clearInterval(intervalId);
    setIsRunning(false);
    setLocalDelta(0);
    setCachedTime(0);
    setStopwatchTime(0);
    pauseButtonLabel = "Start";
  }

  return (
    <main>
      <MainBody>
        <h1>Stopwatch</h1>
        <p>This is a stopwatch.</p>
        <div>
          <br />
          <p>{timeToString(stopwatchTime)}</p>
          <br />
          <p>Local delta: {timeToString(localDelta)}</p>
          <p>Cached time: {timeToString(cachedTime)}</p>
          <p>isRunning: {isRunning ? "true" : "false"}</p>
          <br />
          <button onClick={handlePause}>{pauseButtonLabel}</button>
          <button onClick={handleClear}>Clear</button>
        </div>
      </MainBody>
    </main>
  );
};

export default StopwatchPage;

export const Head = () => <title>Stopwatch</title>;
