import { useEffect,useState } from "react"
import { useAuth } from "../context/AuthContext"
import axios from "../config/axios"
export default function AllJobs(){
    const {user,dispatch}=useAuth()
    const [jobs,setJobs]=useState([])
    useEffect(() => {
        if(localStorage.getItem('token'))  {
          (async () => {
            const response = await axios.get('/api/list', {
              headers: {
                Authorization: localStorage.getItem('token')
              }
            })
            setJobs([...jobs,response.data])
          })();
        }
      }, [])
      console.log(jobs)
      const ul=()=>{
        (
            <div>
                <ul>
                    { jobs.map((ele, i) => {
                      console.log(ele)
                        return <li key={i}> {ele.title} </li>
                    })}
                </ul>
            </div>
        )
      }

      
return (<div>
    <h1>List of jobs</h1>
    {jobs&& ul()}
</div>)
}