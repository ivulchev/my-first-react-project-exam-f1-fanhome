import styles from "./TeamDetails.module.css"
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ErrorPage from "../Error/ErrorPage";
import { endpoints } from "../../services/services";
function TeamDetails() {
    let history = useHistory()
    const [team, setTeam] = useState({})
    let {id} = useParams()
    useEffect(() => {
        fetch(`${endpoints.baseUrl}jsonstore/teams/${id}`)
            .then(res => res.json())
            .then(result => {
                setTeam(result)
            });
    },[]);
    return (team.name === undefined ? <ErrorPage/> :
        <div className="card" id={styles.details} >
            <img src={team.image} className="card-img-top" alt="..."/>
            <div className ="card-body">
            <h5 className ="card-title">{team.name}</h5>
            <p className ="card-text">Drivers: {team.drivers}</p>
            <p className ="card-text">Constructor Championships: {team.championships}</p>
            <p className ="card-text"> {team.description}</p>
            </div>
            
            <div className ="card-body">
            <button onClick={() => history.goBack()} className ="card-link" id={styles.goBack}>Go Back</button>
            </div>
        </div>
    )
}
export default TeamDetails