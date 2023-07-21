import axios from "axios"

import {
    FIL_CONTINENT,
    GET_COUNTRIES,
    GET_DETAIL,
    GET_COUNTRY,
    ORDER_ASC,
    ORDER_POA,
    FIL_ACTIVITY,
    GET_ACTIVITIES,
    POST_ACTIVITY,
    MEMORY_STATUS


} from "./variales"

const URL = "http://localhost:3001";
const ACTIVITY = "activity"

// Mostrar todos los paises
export function getCountries() {
    return async function (dispatch) {
        try {
            const respBack = await axios.get(URL + "/countries")
            return dispatch({
                type: GET_COUNTRIES,
                payload: respBack.data,
            })
        } catch (error) {
            console.log(error)
        }
    }
};
//Mostrar el detalle de cada pais
export function getDetail(id) {
    return async function (dispatch) {
        try {
            const back = await axios.get(URL + `/countries/${id}`)
            console.log(back)
            return dispatch({
                type: GET_DETAIL,
                payload: back.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};
//buscamos pais por nombre 
export const getCountry = (name) => {
   
    return async (dispatch) => {
        try {
          const endpoint = `${URL}/name?name=${name}`;
          const { data } = await axios.get(endpoint);
    
          if (data.length <= 0) {
            const errorMessage = `No countries were found with the name: ${name}.`;
            dispatch({
              type: ERROR_NAME,
              error: errorMessage,
            });
          } else {
            dispatch({
              type: GET_COUNTRY,
              payload: data,
            });
          }
        } catch (error) {
          alert(
            `Ocurrió un error al buscar los países por nombre: ${error.message}`
          );
        }
      };
};
// Ordenamos asc y desc por nombre alfabetico de paises y canti de poblacion
export function orderASC(name) {
    return {
        type: ORDER_ASC,
        payload: name,
    }
};
//Ordenamos por poblacion
export function orderPOA(payload) {
    return {
        type: ORDER_POA,
        payload,
    }
};
// Filtrar por continente 
export const filContinent = (opc) => {


    return {
        type: FIL_CONTINENT,
        payload: opc
    };
};
//Ordenamos por actividades
export function filActivity(payload) {
    return {
        type: FIL_ACTIVITY,
        payload: payload,
    };
};

//Creamos una nueva actividad
export const postActivity = (userData) => {
    return async (dispatch) => {
        try {
            const endpoint = `${URL}/${ACTIVITY}`;
            if (!userData.duration) {
                userData.duration = "Has No Duration";
            }
            if (!userData.season) {
                userData.season = "Has No Seasons";
            }
            const { data } = await axios.post(endpoint, userData);

            dispatch({
                type: POST_ACTIVITY,
                payload: data,
            });
        } catch (error) {
            alert(`No se pudo crear la actividad: ${error.message}`);
        }
    };
};
//mostrar todas las Actividades
export const getActivities = () => {
    return async (dispatch) => {
        try {
            const endpoint = `${URL}/${ACTIVITY}`;
            const { data } = await axios.get(endpoint);

            dispatch({
                type: GET_ACTIVITIES,
                payload: data,
            });
        } catch (error) {
           /* alert(`No se pudieron encontrar las activiades: ${error.message}`);*/
        }
    };
};

export const memory = (value) => {
    return {
      type: MEMORY_STATUS,
      payload: value,
    }
}


