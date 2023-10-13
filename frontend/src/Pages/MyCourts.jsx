import { useEffect, useState } from "react";
import { NavBar } from "../Components/NavBar";
import { instance } from "../config/axios.js";
import { CardOne } from "../Components/Card";



const MyCourts = () => {
    const [myCourts, setMyCourts] = useState([]);
    useEffect(() => {
        instance.get('/users/myCourts').then(res => {
            setMyCourts(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <div>
            <NavBar />
            <CardOne title="My Courts" courts={myCourts} />
        </div>
    )
}

export default MyCourts;