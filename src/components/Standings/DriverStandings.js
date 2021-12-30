import styles from "./DriverStandings.module.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { endpoints } from "../../services/services";

function DriverStandings() {
    const [first, setFirst] = useState([]);
    const [drivers, setDrivers] = useState([]);
    useEffect(() => {
        fetch(`${endpoints.baseUrl}drivers.json`)
            .then(res => res.json())
            .then(result => {
                let array = Object.values(result)
                array.sort((a, b) => {
                    return b.rating - a.rating || a.name.localeCompare(b.name)
                })
                setFirst(array[0])
                setDrivers(array)
            });
    }, []);
    return (
        <header>
            <div className="card" id={styles.standings}>
                <h3>Top Drivers</h3>
                <img src={first.logoUrl} alt="Card img cap" />
                <ul className="list-group list-group-flush">
                    {(!drivers.length == 0) ?
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item" key={drivers[0]._id} ><strong>1st: </strong> <Link id={styles.names} to={`/pilots/${drivers[0]._id}`} className="card-link">{drivers[0].name}</Link>: <strong>{drivers[0].rating}</strong></li>
                            <li className="list-group-item" key={drivers[1]._id} ><strong>2nd: </strong> <Link id={styles.names} to={`/pilots/${drivers[1]._id}`} className="card-link">{drivers[1].name}</Link>: <strong>{drivers[1].rating}</strong></li>
                            <li className="list-group-item" key={drivers[2]._id} ><strong>3rd: </strong> <Link id={styles.names} to={`/pilots/${drivers[2]._id}`} className="card-link">{drivers[2].name}</Link>: <strong>{drivers[2].rating}</strong></li>
                        </ul>
                        :
                        <li>Loading...</li>}
                </ul>
            </div>
        </header>
    )
}

export default DriverStandings