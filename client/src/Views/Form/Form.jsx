import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getActivities, getCountries, postActivity } from "../../Redux/action"
import { useNavigate } from "react-router-dom";
//---.
import "./form.css"
import validate from "./validacion";
import styled from "styled-components"


let SelectCountries = styled.select`
size: 5;
width: 200px;
height: 150px;
`;



function Form() {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [confirmation, setConfirmation] = useState("");
    const [showFont, setShowFont] = useState(true)

    const countries = useSelector(state => state.countries).sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    })

    const [userData, setUserData] = useState({
        name: "",
        difficulty: "",
        season: "",
        duration: "",
        idPais: [],
    })

    const [errors, setErrors] = useState({
        name: "",
        difficulty: "",
        season: "",
        idPais: [],
    })


    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])

    useEffect(() => {
        dispatch(getActivities())
    }, [dispatch])


    const handleInputChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        })
        setErrors(validate({
            ...userData,
            [event.target.name]: event.target.value,
        }))

    };

    function handleSelectDifficulty(e) {
        setUserData({
            ...userData,
            difficulty: e.target.value
        })
    }

    function handleSelectSeason(event) {
        setUserData({
            ...userData,
            season: event.target.value
        })
    }

    function handleSelectCountries(id) {
        setUserData({
            ...userData,
            idPais: [...userData.idPais, id.target.value]
        })
    }

    const handleSubmit = (evento) => {

        evento.preventDefault()
        var form = true;
        if (userData["name"].length < 2) { form = false; }
        else if (!userData["idPais"].length >= 1) { form = false; }
        else if (userData["duration"] === "") { form = false; }
        console.log(userData)
        if (form) {
            dispatch(postActivity(userData));
            setUserData({
                name: "",
                recreacion:"",
                difficulty: "",
                season: "",
                duration: "",
                idPais: [],
            });
            setConfirmation("Actividad Creada")
            setShowFont(false);
            setTimeout(() => {
                setConfirmation ("")
                navigate("/home");
            }, 3000); // Retraso de 2 segundos
        } else {
            return alert("Please fill all the fields before creating a new activity");
        }
    };

    return (

        <div name="DivContainerForm" key="DivContainerForm" className="FormDiv" >
            {confirmation && (<div>
                <h1>{
                    confirmation
                }
                </h1>

            </div>)} {showFont && (
                <form onSubmit={handleSubmit} className="formus" name="CreateActivity" key="CreateActivity">
                    <h2 className="create">Create your activity!</h2>

                    <label name="LabelName" key="LabelName">
                        Name :
                        <input type="text" value={userData.name} name="name" placeholder="The activity name" onChange={handleInputChange} />
                        {errors.name && < p name="validationName" key="validationName" className="pee">{errors.name}</p>}
                    </label>
                    <lebel name="Activida" key="Actividad">
                    Tipo de Activida:
                    <input type="text" value={userData.recreacion}  name="recracion" placeholder="Recreacion" onChange={handleInputChange}  />
                    
                    </lebel>

                    <label name="LabelDifficulty" key="LabelDifficulty">
                        Difficulty :
                        <select name="difficulty" onChange={handleSelectDifficulty} key="Difficulty">
                            <option value="" name="Opt" key="Opt"> Select </option>
                            <option value="1" name="Opt1" key="Opt1">1 - Very easy</option>
                            <option value="2" name="Opt2" key="Opt2">2 - Easy </option>
                            <option value="3" name="Opt3" key="Opt3">3 - Regular</option>
                            <option value="4" name="Opt4" key="Opt4">4 - Difficult</option>
                            <option value="5" name="Opt5" key="Opt5">5 - Very difficult</option>
                        </select>
                        {errors.difficulty && <p name="ValidationDiffculty" key="ValidationDiffculty" className="pee">{errors.difficulty}</p>}
                    </label>


                    <label name="LabelDuration" key="LabelDuration">
                        Duration :
                        <input type="number" value={userData.duration} name="duration" placeholder="In hours" onChange={handleInputChange} min="1" max="24" className="number" />
                    </label>


                    <label name="LabelSeason" key="LabelSeason">
                        Season :
                        <select name="season" onChange={handleSelectSeason}>
                            <option value="" hiddem name="1234"> Select </option>
                            <option value="Summer" name="1234"> Summer </option>
                            <option value="Autumn" name="1234">Autumn</option>
                            <option value="Winter" name="1234">Winter</option>
                            <option value="Spring" name="1234">Spring</option>
                        </select>
                        {errors.season && <p name="ValidationSeason" key="ValidationSeason" className="pee">{errors.season}</p>}
                    </label>


                    <label className="label12" name="LabelCountries" key="LabelCountries">
                        Countries :
                        <br />
                        <SelectCountries name="countries" onChange={handleSelectCountries} value={userData.idPais} multiple>
                            <option value=""> Select </option>
                            {countries.map(e => (
                                <option value={[e.id]} name="countries" key={e.id} >{e.name}</option>
                            ))}

                        </SelectCountries>
                        {errors.idPais && <p name="ValidationCountries" key="ValidationCountries" className="pee">{errors.idPais}</p>}

                    </label>

                    <button type="submit" className="BnCheto" name="BtonSubmit" key="BtonSubmit">Submit</button>

                </form>
            )}

        </div>
    )

}

export default Form;