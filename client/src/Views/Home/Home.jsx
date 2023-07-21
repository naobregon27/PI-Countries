import "./Home.css"
import CardsContainer from "../../Componentes/Cards/Cards";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filActivity, filContinent, getActivities, getCountries, orderASC, orderPOA } from "../../Redux/action";
import { useState } from "react";
import Nav from "../../Componentes/Nav/Nav";


function Home() {
    const dispatch = useDispatch()

    const [sort, setSort] = useState("");
    const [filConti, setFilConti] = useState("");

    const filAct = useSelector(state => state.activity)

    useEffect(() => {
        dispatch(getActivities())
    }, [dispatch])


    const handleOrder = (e) => {
        dispatch(orderASC(e.target.value));
        setSort(e.target.value);
    };

    const handleOrderPOA = (e) => {
        dispatch(orderPOA(e.target.value));
        setSort(e.target.value);
    };

    const handleFilteredContinent = (e) => {
        e.preventDefault();
        dispatch(filContinent(e.target.value))
        setFilConti(e.target.value);
    }

    function handleFilterActi(e) {
        e.preventDefault();
        dispatch(filActivity(e.target.value));
        setOrder(e.target.value);
    }

    return (
        <div name="ContainerHome" key="ContainerHome">
            <Nav />


            <div className="DivOrder" name="Order/Filter" key="Order/Filter">

                <p className="ps" name="SortByName" key="SortByName">Sort by :</p>
                <select onChange={(e) => handleOrder(e)} name="SelectOrderAsc" key="SelectOrderAsc">
                    <option value="" key="-" name="-">   -   </option>
                    <option value='asc' key='asc' name="asc"> A-Z </option>
                    <option value='Desc' key='Desc' name="dsc"> Z-A </option>
                </select>

                <p className="ps" name="SortByPopulation" key="SortByPopulation">Sort by population :</p>
                <select onChange={(e) => handleOrderPOA(e)} name="SelectOrderPOA" key="SelectOrderPOA">
                    <option value="" name="--" key="--">   -   </option>
                    <option value="POA" name="POA" key="POA">↑ population</option>
                    <option value="POE" name="POE" key="POE">↓ population</option>
                </select>

                <p className="ps" name="FilterByContinent" key="FilterByContinent"> Filter by Continent:</p>
                <select onChange={handleFilteredContinent}>
                    <option value="all" >  All  </option>
                    <option value="South America" key="South America">South America</option>
                    <option value="North America" key="North America">North America</option>
                    <option value="Europe" key="Europe">Europe</option>
                    <option value="Africa" key="Africa">Africa</option>
                    <option value="Oceania" key="Oceania">Oceania</option>
                    <option value="Asia" key="Asia">Asia</option>
                    <option value="Antarctica" key="Antarctica">Antarctica</option>
                </select>

                <p className="ps" name="FilterActivities" key="FilterActivities">Activity:</p>
                <select onChange={handleFilterActi} name="SelectFilterActivities" >
                    <option value="" name="AllActivities" >All</option>
                    {filAct &&
                 filAct.map((activity) => (
                  <option value={activity.name} key={activity.name} onClick={() =>getCountries()}>
                    {activity.name}
                  </option>
                ))}
                </select>

            </div>

            <CardsContainer />


        </div>
    )

}

export default Home;