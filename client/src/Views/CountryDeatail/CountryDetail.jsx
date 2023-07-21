
import { useParams, Link } from "react-router-dom";
import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDetail } from "../../Redux/action";
import "../CountryDeatail/countryDetail.css"


export default function Detail() {

    const detail = useSelector((state) => state.detail);
    const dispatch = useDispatch();

    let { id } = useParams();

    useEffect(() => {
        dispatch(getDetail(id));
    }, []);

    return (
        <div>
            <div className="conteiner_principal" name="ContainerCardDetail" key="ContainerCardDetail">
                <Link to="/home"><button className="botonDetail"> Home </button> </Link>
                <div>
                    <h1>{detail.name}</h1>
                    <img src={detail.image} alt={detail.name} className="ImgBandera" name="FlagDetail" key="FlagDetail" />
                </div>
            </div>


            <hr />


            <div className="detalles">

                <li name="tittleId" key="Id" className="Tit"> ID : {detail.id} </li>
                <li name="tittleCapital" key="Capital" className="Tit"> Capital : {detail.capital}  </li>
                <li name="tittleSub-region" key="Sub-region" className="Tit"> Sub Region: {detail.subregion}</li>
                <li name="tittleContinent" key="Continent" className="Tit"> Continent : {detail.continent}  </li>
                <li name="tittleArea" key="Area" className="Tit"> Area : {detail.area}  </li>
                <li name="tittlePopulation" key="Population" className="Tit"> Population : {detail.population}  </li>
            </div>

            <div className="Activity" >
                <h1>ACTIVITY</h1>
                {detail.Activities?.length >= 0 ? (
                    detail.Activities?.map((activity) => {
                        return (
                            <div >
                                <h3>Name: {activity.name} </h3>
                                <h3>Difficulty: {activity.difficulty} </h3>
                                <h3>Duration: {activity.duration} </h3>
                                <h3>Season: {activity.season} </h3>
                            </div>
                        );
                    })
                ) : <h3>Without activities</h3>}
            </div>
        </div>


    );
}