import {
    GET_COUNTRIES,
    GET_COUNTRY,
    GET_DETAIL,
    ORDER_ASC,
    ORDER_POA,
    FIL_CONTINENT,
    FIL_ACTIVITY,
    GET_ACTIVITIES,
    POST_ACTIVITY,
    MEMORY_STATUS,
} from "./variales";

let initialState = {
    countries: [],
    detail: [],
    memory: [],
    allContinents: [],
    actividades: [],
    activity: [],
    error: "",
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        //mostramos todos lo paises
        case GET_COUNTRIES: {
            return {
                ...state,
                allContinents: action.payload,
                countries: action.payload,
                actividades: action.payload,
            };
        }
        //mostramos el detalle de cada pais
        case GET_DETAIL: {
            return {
                ...state,
                detail: action.payload
            }
        }
        //buscamos el pais por nombre
        case GET_COUNTRY: {
            return {
                ...state,
                countries: action.payload
            }
        }
        //Ordenamos de forma ASC y DES
        case ORDER_ASC: {
            let orderCountries = action.payload === 'asc'
                ? state.countries.sort(function (a, b) {
                    if (a.name > b.name) return 1;
                    if (b.name > a.name) return -1
                    return 0;
                })
                : state.countries.sort(function (a, b) {
                    if (a.name > b.name) return -1;
                    if (b.name > a.name) return 1;
                    return 0;
                })
            return {
                ...state,
                countries: orderCountries,
            }
        }
        //ordenamos por poblacion
        case ORDER_POA: {
            const orderPopulation = action.payload === 'POA' ?
                state.countries.sort(function (a, b) {
                    if (a.population > b.population) return -1;
                    if (b.population > a.population) return 1;
                    return 0;
                }) :
                state.countries.sort(function (a, b) {
                    if (a.population > b.population) return 1;
                    if (b.population > a.population) return -1;
                    return 0;
                })
            return {
                ...state,
                population: orderPopulation
            }
        }
        //filtrado por continente
        case FIL_CONTINENT:
            const allContinents = state.allContinents;
            //console.log(allContinents)
            const continentFilter =
                action.payload === "all"
                    ? allContinents
                    : allContinents.filter(
                        (pais) => pais.continent === action.payload
                    );
            console.log(allContinents)
            return {
                ...state,
                countries: continentFilter,
                memory: continentFilter,
            };
        //ordenamos por actividad
        case FIL_ACTIVITY:
            const allActivities = state.actividades;
            const activityFilter =
                action.payload === "all"
                    ? allActivities.filter((x) => x.Activities.length > 0)
                    : allActivities.filter((pais) =>
                        pais.Activities.find(
                            (activity) => activity.name === action.payload
                        )
                    );
            return {
                ...state,
                countries: activityFilter,
                memory: activityFilter,
            };
        //mostrar las actividades
        case GET_ACTIVITIES: {
            return {
                ...state,
                activity: action.payload
            }
        }
        //Crear nuevas actividades
        case POST_ACTIVITY:
            return {
                ...state,
                actividades: action.payload,
            };

        case MEMORY_STATUS:
            if (action.payload === "") {
                return {
                    ...state,
                    countries: state.memory,
                };
            }

        default:
            return state
    }

}

