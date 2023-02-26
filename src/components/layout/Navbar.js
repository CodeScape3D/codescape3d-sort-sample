import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setArray,
  setRunning,
  bubbleSort,
  setCurrentSorted,
  setSpeed,
} from "../../actions/bubleSortActions";

function Navbar() {
  const btn_generar = useRef(null);
  const dispatch = useDispatch();
  const [size, setSize] = useState(5);
  const { array, speed } = useSelector((state) => state.bubleSort);

  const sizeHandler = (e) => {
    e.preventDefault();
    setSize(e.target.value);
  };

  const generateArray = (e) => {
    if (size >= 5 && size <= 10) {
      e.preventDefault();
      let array = [];
      for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
      }
      dispatch(setArray(array));
      dispatch(setCurrentSorted([]));
    } else {
      window.alert("El tamaño debe estar entre 5 y 10");
      setSize(5);
    }
  };

  const sortArray = (e) => {
    e.preventDefault();
    dispatch(setCurrentSorted([]));
    dispatch(setRunning(true));
    bubbleSort(array, dispatch, speed);
  };

  useEffect(() => {
    //btn_generar.current.click();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="navbar-brand">
        <img
          className="d-inline-block align-top mx-2"
          src="./assets/logo.png"
          alt="logo"
          width="30"
          height="30"
        />
        CodeScape3D
      </span>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#nav"
        aria-controls="nav"
        aria-expanded="false"
        aria-label="Nav navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="nav">
        <form className="form-inline ml-auto my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="number"
            placeholder="Tamaño"
            aria-label="Tamaño"
            onChange={sizeHandler}
            value={size}
            max={200}
            min={5}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
            onClick={generateArray}
            ref={btn_generar}
          >
            Generar Arreglo
          </button>
          <button
            className="btn btn-outline-primary my-2 my-sm-0 ml-2"
            type="submit"
            onClick={sortArray}
          >
            Ordenar burbuja
          </button>
          <div className="my-2 my-sm-0 ml-2">
            <label className="form-label" htmlFor="range">
              Velocidad
            </label>
            <div className="range">
              <input
                type="range"
                className="form-range"
                id="range"
                min={0}
                max={4000}
                defaultValue={speed}
                onChange={(e) => dispatch(setSpeed(e.target.value))}
              />
            </div>
          </div>
          <button
            className="btn btn-outline-danger my-2 my-sm-0 ml-2"
            type="submit"
            onClick={() => {
              window.location.reload();
            }}
          >
            Reset
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
