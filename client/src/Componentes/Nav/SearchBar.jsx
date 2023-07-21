import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountry, getCountries } from "../../Redux/action";
import "./SearchBar.css"



export default function SearchBar() {

const [text,setText] = useState("");
const dispatch = useDispatch();

const inputHandler = (e) => {
        setText(e.target.value);
};

const onClickHandler = () => {
    dispatch(getCountry(text));
}

const countrieshandler = () => {
    dispatch(getCountries());
}


    return (
        <div className="SearchDiv">
            <h2 omieza a buscar tu pais indicadoclassName="TitleSearch"></h2>

            <input type='search' value={text} onChange={inputHandler} placeholder="Search a country" className="InputSearch"/>

            <button onClick={() => onClickHandler(text)} className="BnSearch" name="btonSearch" key="btonSearch">Search</button>
            
            <button onClick={() => countrieshandler()} className="BnSearch" name="btonReset" key="btonReset">Reset</button>
        </div>
    );
}