import Card from "./Card"
import { useEffect, useState } from "react";
import { endpoints } from "../../services/services";

function Pilots() {
    const [pilots, setPilots] = useState([]);
    useEffect(() => {
        fetch(`${endpoints.baseUrl}jsonstore/drivers`)
            .then(res => res.json())
            .then(result => {
                let array = Object.values(result)
                setPilots(array)
            });
    },[]);
    return (
        <header>
            <div className="row">
                {pilots.map(x => <Card key={x._id} driver={x} />)}
            </div>
        </header>
    )
}

export default Pilots