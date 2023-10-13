import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { instance } from "../config/axios";

const OpenCourt = () => {
    const { id } = useParams();
    useEffect(() => {
        console.log(id);
        instance.get(`/users/getCourt`,{ params : {id}}).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        })
    }, [])
  return (
    <> 
        
    </>
  )
}

export default OpenCourt