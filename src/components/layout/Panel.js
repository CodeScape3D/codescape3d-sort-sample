import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./Panel.css";

function Panel() {
  const {
    array,
    currentBubbleTwo,
    currentSwappers,
    currentSorted,
    currentLine,
  } = useSelector((state) => state.bubleSort);

  const [paso, setPaso] = useState("Inicia el ordenamiento");
  const [prevCurrentLine, setPrevCurrentLine] = useState(null);
  const codeRef = useRef(null);

  useEffect(() => {
    if (currentBubbleTwo.length === 2) {
      setPaso(
        "Se comparan los elementos " +
          array[currentBubbleTwo[0]] +
          " y " +
          array[currentBubbleTwo[1]]
      );
    }

    if (currentSwappers.length === 3) {
      setPaso(
        "Se intercambian los elementos " +
          array[currentSwappers[0]] +
          " y " +
          array[currentSwappers[1]]
      );
    }

    if (currentSorted.length === array.length) {
      setPaso("El ordenamiento ha finalizado");
    }

    if (codeRef.current) {
      const currentElement = codeRef.current.childNodes[currentLine];
      const prevElement = codeRef.current.childNodes[prevCurrentLine];

      if (prevElement) {
        prevElement.style.backgroundColor = "transparent";
      }

      if (currentElement) {
        currentElement.style.backgroundColor = "#4286f4cc";
      }

      setPrevCurrentLine(currentLine);
    }
  }, [
    array,
    currentBubbleTwo,
    currentSwappers,
    currentSorted,
    currentLine,
    prevCurrentLine,
  ]);

  return (
    <div style={{ position: "absolute", bottom: 0, right: 0 }}>
      <div>
        <h3>Bubble Sort</h3>
        <div className="container-code">
          <code ref={codeRef}>
            <pre>{`do`}</pre>
            <pre>{`   swapped = false
   for i = 1 to indexOfLastUnsortedElement-1`}</pre>
            <pre>{`     if leftElement rightElement`}</pre>
            <pre>{`       swap(leftElement, rightElement)
       swapped = true; ++swapCounter`}</pre>
            <pre>{` while swapped`}</pre>
          </code>
        </div>

        <div className="container-paso">{paso}</div>
      </div>
    </div>
  );
}

export default Panel;
