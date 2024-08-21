import axios from "axios"
import { useEffect, useState } from "react"
import AddJob from "./AddJob"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
export default function MyJob(){
    const[job,setJob] = useState([])
    const navigate=useNavigate()
    useEffect(()=>{
       async  function fetchingJob(){
            try {
                  const response = await axios.get('http://localhost:3333/api/jobs/my',{
                    headers:{
                        Authorization:localStorage.getItem('token')
                    }
                  })
                  console.log(response.data)
                  setJob(response.data)
            }
            catch(error){
                console.log(error.response.data)
            }
        }
        fetchingJob()
    },[])
   
    const handleView=(id)=>{

        navigate(`/api/jobs/${id}/application`)
    }
    
    
    const handleRemove=async(id)=>{
    try{
        const response=await axios.delete(`http://localhost:3333/api/jobs/${id}`,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        })
        const newArr=job.filter(ele=>{
            if(ele._id!=id){
                return ele
            }
        })
    setJob(newArr) 
    }catch(err){
    console.log(err.response.data)
   }

 }


    return (
        <div>
            <h2>MyJob</h2>
            <table border={2}>
              <thead>
                <tr>
                    <th>title</th>
                    <th>description</th>
                    <th>openings</th>
                    <th>location</th>
                    <th>jobType</th>
                    <th>minExp</th>
                    <th>maxExp</th>
                    <th>skills</th>
                    <th>dueDate</th>
                    <th>minSalary</th>
                    <th>maxSalary</th>
                    <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                 {job.map((ele)=>{
                    return (
                        <tr key={ele._id}>
                            <td><Link to={`/api/jobs/${ele._id}/application`}>{ele.title}</Link></td>
                            <td>{ele.description}</td>
                            <td>{ele.openings}</td>
                            <td>{ele.location}</td>
                            <td>{ele.jobType}</td>
                            <td>{ele.experience.minExp}</td>
                            <td>{ele.experience.maxExp}</td>
                            <td>{ele.skills}</td>
                            <td>{ele.dueDate}</td>
                            <td>{ele.salary.minSalary}</td> 
                            <td>{ele.salary.maxSalary}</td>
                            <td><button onClick={()=>{handleView(ele._id)}}>View</button><button onClick={()=>{handleRemove(ele._id)}}>Delete</button></td>

                        </tr>
                    )
                 })}
              </tbody>
            </table>
            
        </div>
    )
}