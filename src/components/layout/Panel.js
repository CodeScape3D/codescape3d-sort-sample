import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function Panel() {
  const preRef = useRef(null);

  const preContent = `
    do
    swapped = false
    for i = 1 to indexOfLastUnsortedElement-1
      if leftElement rightElement
        swap(leftElement, rightElement)
        swapped = true; ++swapCounter
    while swapped`;

  const { array, currentBubbleTwo, currentSwappers, currentSorted } =
    useSelector((state) => state.bubleSort);

  const [paso, setPaso] = React.useState("Inicia el ordenamiento");
  const [lines, setLines] = React.useState([]);

  useEffect(() => {
    let debug;

    if (currentBubbleTwo.length === 2) {
      setPaso(
        "Se comparan los elementos " +
          array[currentBubbleTwo[0]] +
          " y " +
          array[currentBubbleTwo[1]]
      );
      debug = 4;
    }

    if (currentSwappers.length === 3) {
      setPaso(
        "Se intercambian los elementos " +
          array[currentSwappers[0]] +
          " y " +
          array[currentSwappers[1]]
      );
      debug = 5;
    }

    if (currentSorted.length === array.length) {
      setPaso("El ordenamiento ha finalizado");
    }

    const lines = preContent.split("\n").map((line, index) => {
      if (index === debug) {
        return (
          <div
            key={index}
            style={{ backgroundColor: "rgba(78, 216, 96, 0.8)" }}
          >
            {line}
          </div>
        );
      } else {
        return <div key={index}>{line}</div>;
      }
    });

    setLines(lines);
  }, [array, currentBubbleTwo, currentSwappers, currentSorted, preContent]);

  return (
    <div style={{ position: "absolute", bottom: 0, right: 0 }}>
      <div>
        <h3
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            whiteSpace: "nowrap",
            padding: "0 5px 0 0",
            color: "#130E09",
          }}
        >
          Bubble Sort
        </h3>
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: 0,
            backgroundColor: "#eeeeee",
            padding: "10px",
            width: "380px",
            overflow: "hidden",
            color: "#fff",
          }}
        >
          <pre ref={preRef}>{lines}</pre>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "250px",
            right: 0,
            backgroundColor: "#eeeeee",
            padding: "10px",
            width: "380px",
            overflow: "hidden",
            color: "#000",
            fontSize: "1em",
          }}
        >
          {paso}
        </div>
      </div>
    </div>
  );
}

export default Panel;
