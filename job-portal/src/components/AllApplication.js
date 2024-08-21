import { useState,useEffect } from "react"
import axios from "../config/axios"
import { useParams,useNavigate } from "react-router-dom"
export default function AllApplication(){
    const navigate=useNavigate()
    const [app,setApp]=useState([])
    const {id}=useParams()
   
    console.log(id)
    useEffect(()=>{
      const fun=async()=>{
          const res=await axios.get(`/api/jobs/${id}/applications`,
            {headers:{
                Authorization:localStorage.getItem('token')
            }}
          )
          console.log(res.data)
          setApp(res.data)
      }
      fun()
    },[])
   console.log(app)

const handleView=(jobId,appId)=>{
    navigate(`/api/jobs/${jobId}/applications/${appId}`)
}
    return (
        <div>
            <h1>All Applications</h1>
            <table border={1}>
              <thead>
                <tr>
                    <th>Candidate</th>
                    <th>status</th>
                    <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                 {
                    app.map((ele)=>{
                        return (<tr key={ele._id}>
                              <td>{ele.candidate.username}</td>
                              <td>{ele.status}</td>
                              <td>
                                <button onClick={()=>{handleView(ele.job,ele._id)}}>view</button>
                              </td>
                        </tr>)
                    })
                 }
              </tbody>
              </table>
        </div>
    )
}