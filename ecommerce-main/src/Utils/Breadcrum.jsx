import { useState } from "react"
import { BASE_URL } from "../AdminComponent/BaseUrl"
import axios from "axios";

const useBreadcrumb = (id) => {

    const [breaddata , setData] = useState([])


    const getbreadcrum = () =>{
        const data = {
            pageid :id
        }
        
        axios.post(`${BASE_URL}/getbreadcrum`,data)
        .then((res) => {
           setData(res.data[0].upload_image)
        })
    }

    useState(() =>{
        getbreadcrum()
    })  




    return breaddata;
   
 
}


export default useBreadcrumb;
