import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function CharacterDetails(props) {

    const { characterId } = useParams();

    const navigate = useNavigate();

    const [details, setDetails] = useState({});

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/characters/${characterId}`)
            .then(response => {
                setDetails(response.data);
            })
            .catch(e => console.log(e))
    }, []);


    const deleteCharacter = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/characters/${characterId}`)
            .then( (response) => {
                // our character has been deleted from the api
                props.callbackToUpdateList()
                navigate("/"); // redirect to homepage
            })
            .catch( e => console.log("Error deleting character from the API...", e));
    }


    return (
        <div className="box">
            <h1>{details.name}</h1>
            Occupation: {details.occupation} <br />
            Weapon: {details.weapon} <br />
            Debt: {details.debt ? "Yes" : "No"} <br />

            <p>
                <button onClick={deleteCharacter}>Delete this character</button>
            </p>

            <p>
                <Link to="/">Back</Link>
            </p>
        </div>
    );

}

export default CharacterDetails;