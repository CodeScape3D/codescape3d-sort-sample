//se importan todas las constantes que se utilizan para nombrar las acciones
import {
  SET_ARRAY,
  SET_CURRENT_BUBBLE_TWO,
  SET_CURRENT_LINE,
  SET_CURRENT_SORTED,
  SET_CURRENT_SWAPPERS,
  SET_RUNNING,
  SET_SPEED,
} from "../constants/bubleSortConstants";

//Actualiza el estado del array utilizado en la aplicación.

export function setArray(array) {
  return {
    type: SET_ARRAY,
    payload: array,
  };
}

//Actualiza el estado del array currentBubbleTwo
export function setCurrentBubbleTwo(two) {
  return {
    type: SET_CURRENT_BUBBLE_TWO,
    payload: two,
  };
}

//Actualiza el estado del array currentSorted utilizado en la aplicación
export function setCurrentSorted(sorted) {
  return {
    type: SET_CURRENT_SORTED,
    payload: sorted,
  };
}

//actualiza el estado del array currentSwappers utilizado en la aplicación.
export function setCurrentSwappers(swappers) {
  return {
    type: SET_CURRENT_SWAPPERS,
    payload: swappers,
  };
}

//Actualiza el estado de running utilizado en la aplicación.
export function setRunning(running) {
  return {
    type: SET_RUNNING,
    payload: running,
  };
}

//Actualiza el estado de la velocidad de la aplicación.
export function setSpeed(speed) {
  return {
    type: SET_SPEED,
    payload: speed,
  };
}

//Actualiza el estado de la línea actual de la aplicación para la depuración del código.
export function setCurrentLine(line) {
  return {
    type: SET_CURRENT_LINE,
    payload: line,
  };
}

//Metodo de ordenamiento BURBUJA, recive (Arreglo,Dispatch, velocidad )
export function bubbleSort(stateArray, dispatch, speed) {
  let array = stateArray.slice(0), //Hace una copia del array recibido
    toDispatch = [], //Matriz vacía para almacenar los cambios que ocurrirán en el array
    sorted = false, //Booleano que indica que el arraym aún no está ordenado
    round = 0; //Cantidad de vueltas o iteraciones, que da el algoritmo

  while (!sorted) {
    //Creamos bucle, hasta que el arreglo esté ordenador
    sorted = true; //Indicamos que está ordenado, en caso de que esté ordenado desde el principio
    for (let i = 0; i < array.length - 1 - round; i++) {
      //Creamos otro bucle for, que recorre la mátriz
      toDispatch.push([i, i + 1]); //Agregamos indices a los elementos a toDispatch, para animar el algoritmo
      if (array[i] > array[i + 1]) {
        //sí  arr[i] > arr[i+1]

        //Sí se cumple la codición:

        //intercambiamos elementos del array
        toDispatch.push([i, i + 1, true]);
        let temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;

        sorted = false; //indicamos que el arreglo no está arreglado
        toDispatch.push(array.slice(0)); //Agregamos matriz actualizada a toDispatch
        toDispatch.push([]); //Agregamos elemento vacío a to Dispatch, para limpiar las acciones anteriores
      }
    }

    //Una vez se complete el bucle for:
    toDispatch.push([true, array.length - 1 - round]); //Agregamos un elemento a toDispatch, para indicar que el ultimo elemento de la matriz es ordenado
    round++; //Aumentamos round de uno en uno, para decir que se completó una vuelta
  }

  //Una vez ya se haya ordenado el arreglo con éxito
  //Pasamos a la función handleDispatch, los parametros toDispatch, dispatch, array, speed

  handleDispatch(toDispatch, dispatch, array, speed);
  //Retornamos el arreglo ordenado

  return array;
}

//Despacha las acciones apropiadas en la tienda de Redux con los datos que se proporcionan en toDispatch, dispatch, array y speed.

function handleDispatch(toDispatch, dispatch, array, speed) {
  //Se comprueba si la mátriz está vacía
  if (!toDispatch.length) {
    //Sí se cumple la codición:

    //Actualizamos la interfaz de usuario para mostrar que la clasificación a finalizado
    dispatch(setCurrentBubbleTwo(array.map((num, index) => index)));
    setTimeout(() => {
      dispatch(setCurrentBubbleTwo([]));
      dispatch(setCurrentSorted(array.map((num, index) => index)));
      dispatch(setRunning(false));
      dispatch(setCurrentLine(null));
    }, 900);
    return;
  }
  /*
  Sí no se cumple la condición

  la función determina qué acción de Redux debe despacharse
  en función del contenido de toDispatch
  */
  let dispatchFunction =
    toDispatch[0].length > 3
      ? setArray //se llama si la longitud del primer elemento de toDispatch es mayor que 3.
      : toDispatch[0].length === 3 || toDispatch[0].length === 0
      ? setCurrentSwappers // se llama si la longitud del primer elemento de toDispatch es 3 o 0.
      : toDispatch[0].length === 2 && typeof toDispatch[0][0] === "boolean"
      ? setCurrentSorted // se llama si la longitud del primer elemento de toDispatch es 2 y el primer elemento de toDispatch es un valor booleano
      : setCurrentBubbleTwo; // se llama en cualquier otro caso

  //Luego, la función verifica qué función de acción de Redux se estableció en dispatchFunction


/*Si setCurrentBubbleTwo se establece en dispatchFunction, 
  esto significa que los elementos están siendo comparados en la matriz,
 por lo que se llama a setCurrentLine para actualizar la
 línea de código resaltada en la interfaz de usuario.
 */
  if (dispatchFunction === setCurrentBubbleTwo) {       
    dispatch(setCurrentLine(2));
  }

/*
Si setArray se establece en dispatchFunction, 
esto significa que la matriz de elementos está siendo actualizada, 
por lo que se llama a setCurrentLine para actualizar 
la línea de código resaltada en la interfaz de usuario.

*/


  if (dispatchFunction === setArray) {
    dispatch(setCurrentLine(3));
  }


/*
  Si setCurrentSorted se establece en dispatchFunction, 
  esto significa que se ha ordenado una parte de la matriz,
   por lo que se llama a setCurrentLine para actualizar 
  la línea de código resaltada en la interfaz de usuario.

*/
  if (dispatchFunction === setCurrentSorted) {
    dispatch(setCurrentLine(1));
  }


/*

Finalmente, la función llama a dispatchFunction con el primer 
elemento de toDispatch, que contiene los datos que se utilizarán 
en la acción de Redux. Luego, la función se llama a sí misma 
después de un tiempo determinado por el parámetro speed

*/


  dispatch(dispatchFunction(toDispatch.shift()));

  setTimeout(() => {
    handleDispatch(toDispatch, dispatch, array, speed);
  }, speed);
}
