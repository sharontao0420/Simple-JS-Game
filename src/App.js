import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [x, setX] = useState(20);
  const [y, setY] = useState(20);
  const [start, setStart] = useState(false);
  const [sHeight, setSHeight] = useState(null);
  const [sWidth, setSWidth] = useState(null);
  const [direction, setDirection] = useState("right");

  useEffect(() => {
    if (start) {
      setX(x + 10);
    }
  }, [start]);

  useEffect(() => {
    if (start) {
      move();
    }
  }, [direction]);

  useEffect(() => {
    if ((x || y) && start) {
      setTimeout(() => {
        move();
      }, 100); //control the delay of the moving
    }
  }, [x, y]); //once it changes x and y, and start is on, it moves again, it's infinite move, triggers itself.

  // mounted
  useEffect(() => {
    document.addEventListener("keyup", keyPressed);
  }, []); //runs one time

  function move() {
    setTimeout(() => {
      if (direction === "right") {
        setX(x + 5);
      }
      if (direction === "left") {
        setX(x - 5);
      }
      if (direction === "up") {
        setY(y - 5);
      }
      if (direction === "down") {
        setY(y + 5);
      }
    }, 10); //half it to faster the speed
  }

  function keyPressed(e) {
    if (e.repeat) {
      return;
    }
    if (e.code === "ArrowUp") {
      setDirection("up");
    }
    if (e.code === "ArrowDown") {
      setDirection("down");
    }
    if (e.code === "ArrowLeft") {
      setDirection("left");
    }
    if (e.code === "ArrowRight") {
      setDirection("right");
    }
    if (e.code === "Space") {
      setStart(true);
    }
    if (e.code === "KeyP") {
      setStart(false);
    }
    console.log(e.code);
  }

  return (
    <div className="App">
      <div className="dot" style={{ left: `${x}px`, top: `${y}px` }}></div>
    </div>
  );
}
