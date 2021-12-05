import styles from "./LegendsStandings.module.css"
import { useEffect, useState } from "react";

function LegendsStandings() { 
    const [first, setFirst] = useState([]);
    const [legends, setLegends] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3030/jsonstore/legends`)
            .then(res => res.json())
            .then(result => {
                let array = Object.values(result)
                array.sort((a,b) => {
                    return b.rating - a.rating || a.name.localeCompare(b.name)
                } )
                setFirst(array[0])
                setLegends(array)
            });
    }, []);
    return (
        <header>
            <div className="card" id={styles.standings}>
                <h3>Top Teams</h3>
            <img src={first.image} alt="Card img cap" />
            <ul className="list-group list-group-flush">
                {(!legends.length == 0)?
                <ul className="list-group list-group-flush">
                <li className="list-group-item" key={legends[0]._id} ><strong>1st:</strong> {legends[0].name}: <strong>{legends[0].rating}</strong></li> 
                <li className="list-group-item" key={legends[1]._id} ><strong>2nd:</strong> {legends[1].name}: <strong>{legends[1].rating}</strong></li> 
                <li className="list-group-item" key={legends[2]._id} ><strong>3rd:</strong> {legends[2].name}: <strong>{legends[2].rating}</strong></li> 
                </ul>
                :
                <li>Loading...</li>}
            </ul>
        </div>
        </header>
    )
}

export default LegendsStandings