import {
  SET_ARRAY,
  SET_CURRENT_BUBBLE_TWO,
  SET_CURRENT_SORTED,
  SET_CURRENT_SWAPPERS,
  SET_RUNNING,
  SET_SPEED,
  SET_CURRENT_LINE,
} from "../constants/bubleSortConstants";

const initialState = {
  array: [13, 62, 28, 15, 38],
  currentBubbleTwo: [],
  currentSorted: [],
  currentSwappers: [],
  running: false,
  speed: 1000,
  currentLine: 0,
};

export const bubleSortReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ARRAY:
      return {
        ...state,
        array: action.payload,
      };
    case SET_CURRENT_BUBBLE_TWO:
      return {
        ...state,
        currentBubbleTwo: action.payload,
      };
    case SET_CURRENT_SORTED:
      return {
        ...state,
        currentSorted: action.payload,
      };
    case SET_CURRENT_SWAPPERS:
      return {
        ...state,
        currentSwappers: action.payload,
      };
    case SET_RUNNING:
      return {
        ...state,
        running: action.payload,
      };
    case SET_SPEED:
      return {
        ...state,
        speed: action.payload,
      };
    case SET_CURRENT_LINE:
      return {
        ...state,
        currentLine: action.payload,
      };
    default:
      return state;
  }
};
