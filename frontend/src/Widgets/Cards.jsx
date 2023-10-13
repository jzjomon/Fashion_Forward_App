import { useEffect, useState } from "react"
import { instance } from "../config/axios"
import { CardOne } from "../Components/Card";

const Cards = () => {
    const [courts, setCourts] = useState([]);
    useEffect(() => {
        instance.get('/users/getCourts').then(res => {
            setCourts(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])
    return (
        <>
            <CardOne  title="Courts" courts={courts} />
        </>
    )
}

export default Cards;