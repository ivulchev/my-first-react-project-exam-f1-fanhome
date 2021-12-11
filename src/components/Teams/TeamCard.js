import styles from "./TeamCard.module.css";
import { Link, useHistory } from "react-router-dom";
import * as requester from "../../services/requester";
import { useState, } from "react";
import { useEffect } from "react";
import { endpoints } from "../../services/services";


function TeamCard({ team }) {
    let history = useHistory()
    const [rating, setRating] = useState(team.rating);
    function voteUp(e) {
        e.preventDefault();
        if(window.confirm("Do you really want to vote? You can vote only once per Team!")){
        requester.put(`${endpoints.baseUrl}jsonstore/teams/${team._id}`, { rating: rating + 1, voters: [...team.voters, localStorage._id]})
        setRating(rating + 1);
        history.push("/teams")
        }
    }
    function voteDown(e) {
        e.preventDefault();
        if(window.confirm("Do you really want to vote? You can vote only once per Team!")){
        requester.put(`${endpoints.baseUrl}jsonstore/teams/${team._id}`, { rating: rating - 1, voters: [...team.voters, localStorage._id]})
        setRating(rating - 1);
        history.push("/teams")
        }
    }
    const [isVoted, setIsVoted] = useState(false)
    useEffect(() => {
        fetch(`${endpoints.baseUrl}jsonstore/teams/${team._id}`)
            .then((res) => res.json())
            .then((data) => {
                let array = Object.values(data)
                if (array[6].includes(localStorage._id)) {
                    return setIsVoted(true)
                } else {
                    return setIsVoted(false)
                }
            })
    }, [rating])
    let upButton = <button className={styles.upBtn} onClick={voteUp}>
        Up
    </button>
    let downButton = <button className={styles.downBtn} onClick={voteDown}>
        Down
    </button>
    let buttons = [upButton, downButton]
    let Voted = () => {
        if (isVoted) {
            return <p id={styles.loginLink}> <strong>Thank you for voting!</strong></p>
        } else {
            return buttons
        }
    }
    return (
        <div className="card" id={styles.cardPartial}>
            <img src={team.image} id={styles.img} alt="Card img cap" />
            <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text" id={styles.text} ><strong>Drivers:</strong> {team.drivers}</p>
                <p className="card-text" id={styles.text} ><strong>Constructor Championships:</strong> {team.championships}</p>
                <p className="rating">Rating: {rating} </p>
                <button className={styles.detailsBtn} > <Link to={`/teams/${team._id}`} id={styles.loginLink} >
                    Details
                    </Link>
                </button>
                {localStorage._id?
                <Voted/> :
                <Link to="/login" id={styles.loginLink}>  Please, login to vote!</Link>}
            </div>
        </div>
    )
}
export default TeamCard