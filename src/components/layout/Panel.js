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
    if (currentLine === 1) {
      setPaso(
        "Se establece intercambiado como falso; se iteran los elementos adyascentes"
      );
    }

    if (currentBubbleTwo.length === 2 && currentLine !== 1) {
      setPaso(
        "Se comparan los indices " +
          currentBubbleTwo[0] +
          " y " +
          currentBubbleTwo[1]
      );
    }

    if (currentSwappers.length === 3) {
      setPaso(
        "Se intercambian los indices " +
          currentSwappers[0] +
          " y " +
          currentSwappers[1]
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
            <pre>{`mientras intercambiado sea true hacer:`}</pre>
            <pre>{`   intercambiado = false
   para i de 0 a longitud(arr)-2 hacer:`}</pre>
            <pre>{`     si arr[i] > arr[i+1] entonces:`}</pre>
            <pre>{`       intercambiar(arr[i], arr[i+1])
       intercambiado = true`}</pre>
          </code>
        </div>

        <div className="container-paso">{paso}</div>
      </div>
    </div>
  );
}

export default Panel;
