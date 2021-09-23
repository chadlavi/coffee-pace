import { Button } from "./Button";
import { H1 } from "./Headers";
import { Input } from "./Input";
import { Box } from "./Box";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Base } from "./Base";
import { breakpoint, font } from "./theme";

import "./style.css";

const formatTime = (t) => {
  const minutes = Math.floor(t / 60);
  const seconds = t - minutes * 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const handleChange = (setter) => (e) => {
  const { value, name } = e.target;
  setter(value);
  if (name) save(value, name);
};

const save = (value, key) => {
  localStorage.setItem(key, value);
};

const load = (key) => localStorage.getItem(key);

const GramsDisplay = styled(Base)({
  fontSize: "4rem",
  fontWeight: 900,
  textAlign: "center",
  position: "relative"
});

const TimeDisplay = styled(Base)({
  textAlign: "center",
  fontWeight: 300,
  fontFamily: font.mono,
  position: "relative"
});

export default function App() {
  const [time, setTime] = useState(load("time") || "");
  const [water, setWater] = useState(load("water") || "");
  const [totalWater, setTotalWater] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [running, setRunning] = useState(false);

  const gramsPerSecond = parseInt(water, 10) / parseInt(time, 10);

  const isReset = elapsedTime === 0 && totalWater === 0;

  useEffect(() => {
    if (running) {
      if (elapsedTime < parseInt(time, 10)) {
        const timer = setTimeout(() => {
          setElapsedTime((t) => t + 1);
          setTotalWater((w) => w + gramsPerSecond);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        setRunning(false);
      }
    }
  }, [running, elapsedTime, gramsPerSecond, time]);

  const onStart = () => {
    setRunning(true);
  };
  const onStop = () => {
    setRunning(false);
  };
  const onReset = () => {
    setElapsedTime(0);
    setTotalWater(0);
  };

  return (
    <Box
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        padding: "2rem",
        [`@media (max-width: ${breakpoint.xs}px)`]: {
          padding: "5vw"
        },
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <Box style={{ maxWidth: breakpoint.xs }}>
        <H1>
          <span aria-hidden>☕️</span> Coffee pacer
        </H1>
        <Box style={{ display: "flex", marginBottom: "0.5rem" }}>
          <Box
            style={{
              paddingRight: "0.5rem",
              width: "50%"
            }}
          >
            <Input
              value={water.toString()}
              onChange={handleChange(setWater)}
              placeholder="Water (g)"
              type="number"
              name="water"
            />
          </Box>
          <Box
            style={{
              paddingLeft: "0.5rem",
              width: "50%"
            }}
          >
            <Input
              value={time.toString()}
              onChange={handleChange(setTime)}
              placeholder="Time (s)"
              type="number"
              name="time"
            />
          </Box>
        </Box>
      </Box>
      <Box style={{ padding: "2rem" }}>
        <GramsDisplay>
          <span aria-hidden>💧</span>
          {Math.round(totalWater)}
        </GramsDisplay>
        <TimeDisplay>
          <span aria-hidden>⏲</span> {formatTime(elapsedTime)}
        </TimeDisplay>
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          gap: "2.5vw",
          maxWidth: breakpoint.xs
        }}
      >
        <Button onClick={onStart} disabled={running} start>
          Start
        </Button>
        <Button onClick={onStop} disabled={!running} stop>
          Stop
        </Button>
        <Button onClick={onReset} disabled={running || isReset}>
          Reset
        </Button>
      </Box>
    </Box>
  );
}
