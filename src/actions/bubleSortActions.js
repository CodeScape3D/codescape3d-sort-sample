import {
  SET_ARRAY,
  SET_CURRENT_BUBBLE_TWO,
  SET_CURRENT_SORTED,
  SET_CURRENT_SWAPPERS,
  SET_RUNNING,
  SET_SPEED,
} from "../constants/bubleSortConstants";

export function setArray(array) {
  return {
    type: SET_ARRAY,
    payload: array,
  };
}

export function setCurrentBubbleTwo(two) {
  return {
    type: SET_CURRENT_BUBBLE_TWO,
    payload: two,
  };
}

export function setCurrentSorted(sorted) {
  return {
    type: SET_CURRENT_SORTED,
    payload: sorted,
  };
}

export function setCurrentSwappers(swappers) {
  return {
    type: SET_CURRENT_SWAPPERS,
    payload: swappers,
  };
}

export function setRunning(running) {
  return {
    type: SET_RUNNING,
    payload: running,
  };
}

export function setSpeed(speed) {
  return {
    type: SET_SPEED,
    payload: speed,
  };
}

export function bubbleSort(stateArray, dispatch, speed) {
  let array = stateArray.slice(0),
    toDispatch = [],
    sorted = false,
    round = 0;

  while (!sorted) {
    sorted = true;
    for (let i = 0; i < array.length - 1 - round; i++) {
      toDispatch.push([i, i + 1]);
      if (array[i] > array[i + 1]) {
        toDispatch.push([i, i + 1, true]);
        let temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        sorted = false;
        toDispatch.push(array.slice(0));
        toDispatch.push([]);
      }
    }
    toDispatch.push([true, array.length - 1 - round]);
    round++;
  }
  handleDispatch(toDispatch, dispatch, array, speed);
  return array;
}

function handleDispatch(toDispatch, dispatch, array, speed) {
  if (!toDispatch.length) {
    dispatch(setCurrentBubbleTwo(array.map((num, index) => index)));
    setTimeout(() => {
      dispatch(setCurrentBubbleTwo([]));
      dispatch(setCurrentSorted(array.map((num, index) => index)));
      dispatch(setRunning(false));
    }, 900);
    return;
  }
  let dispatchFunction =
    toDispatch[0].length > 3
      ? setArray
      : toDispatch[0].length === 3 || toDispatch[0].length === 0
      ? setCurrentSwappers
      : toDispatch[0].length === 2 && typeof toDispatch[0][0] === "boolean"
      ? setCurrentSorted
      : setCurrentBubbleTwo;
  dispatch(dispatchFunction(toDispatch.shift()));
  setTimeout(() => {
    handleDispatch(toDispatch, dispatch, array, speed);
  }, speed);
}
