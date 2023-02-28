
/*
Importamos constantes desde ../constants/bubleSortConstants

Estas constantes son utilizadas para definir los tipos
de acciones que el "reducer" maneja.
*/
import {

  SET_ARRAY,
  SET_CURRENT_BUBBLE_TWO,
  SET_CURRENT_SORTED,
  SET_CURRENT_SWAPPERS,
  SET_RUNNING,
  SET_SPEED,
  SET_CURRENT_LINE,
} from "../constants/bubleSortConstants";

//Definimos estado inicial de la aplicación
const initialState = {
  
  array: [13, 62, 28, 15, 38],    //Arreglo numerico a ordenar
  currentBubbleTwo: [],           //Arreglo vacío, que contendrá los dos elementos en comparación
  currentSorted: [],              //Arreglo vacío, que contendrá los elementos ya ordenados
  currentSwappers: [],           //Arreglo vacío, que contendrá los elementos que se están intercambiando
  running: false,                 //Booleano, que indica si el algoritmo estaba corriendo o no
  speed: 1000,                    //Velocidad, que indica la velocidad que tendrá el metodo de ordenamiento
  currentLine: 0,                 //numero que denota la línea de códico actual que se está ejecutando
};

//Definimos la función que majerá los estados de la aplicación
export const bubleSortReducer = (state = initialState, action) => {
  
  /*La función recibe como parametros

      - State => Estado actual de la aplicación
      - Action => Objeto que obtiene un tipo de acción
      - InitialState => Estado inicial definido
  
  
  */


  switch (action.type) {  //Utilizamos switch para manejar las distintas acciones
    
    case SET_ARRAY:       //En el caso que se quiera actualizar el array, retorna               
      return {
        ...state,         //Copia del estado actual
        array: action.payload, //sobrescribe la propiedad "array" con el payload de la acción
      };
    case SET_CURRENT_BUBBLE_TWO:  //En el caso que se quiera actualizar el arreglo currentBubbleTwo, retorna
      return {
        ...state, //Copia del estado actual
        currentBubbleTwo: action.payload, //Sobrescribe la propiedad  "currentBubbleTwo" con el payload de la acción
      };
    case SET_CURRENT_SORTED: //En el caso que se quiera actualizar el arreglo currentSorted, retorna:
      return {
        ...state, //Copia del estado actual
        currentSorted: action.payload, //Sobrescribe la propiedad  "currentSorted" con el payload de la acción
      };
    case SET_CURRENT_SWAPPERS: //En el caso que se quiera actualizar el arreglo "currentSwappers", retorna
      return {
        ...state,  //Copia del estado actual
        currentSwappers: action.payload, //Sobrescribe la propiedad  "currentSwappers" con el payload de la acción
      };
    case SET_RUNNING: //En el caso que se quiera actualizar la propiedad "running", retorna
      return {
        ...state, //Copia del estado actual
        running: action.payload, //Sobrescribe la propiedad "running" con el payload de la acción
      };
    case SET_SPEED: //En el caso que se quiera actualizar la propiedad "speed", retorna
      return {
        ...state, //Copia del estado actual
        speed: action.payload, //Sobrescribe la propiedad "speed" con el payload de la acción
      };
    case SET_CURRENT_LINE: //En el caso que se quiera actualizar la propiedad "currerntLine", retorna:
      return {
        ...state, //Copia del estado actual
        currentLine: action.payload, //Sobrescribe la propiedad "currentLine" con el payload de la acción
      };

    /*Si la acción recibida no corresponde a ninguno de los
      tipos de acciones definidos en el switch statement, simplemente
      devuelve el estado actual sin hacer cambios.
      */
    default:
      return state;
  }
};
