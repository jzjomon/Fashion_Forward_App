import { useEffect, useState } from "react"
import { instance } from "../config/axios"
import { CardOne } from "../Components/Card";
import { Paginate } from "../Components/Paginate";

const Cards = () => {
    const [page, setPage] = useState(1);
    const [courts, setCourts] = useState([]);
    useEffect(() => {
        instance.get('/users/getCourts',{ params: { page } }).then(res => {
            setCourts(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [page])
    return (
        <>
            <CardOne title="Courts" courts={courts} />
            {/* pagination  */}
            {
              courts.length < 8  ? <Paginate page={page} setPage={setPage} /> : <Paginate page={page} setPage={setPage} length />
            }
        </>
    )
}

export default Cards;