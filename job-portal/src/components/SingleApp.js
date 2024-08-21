import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "../config/axios"
export default function SingleApp(){
    const {id,appId}=useParams()
    const [app,setApp]=useState(null)
    const [update,setUpdate]=useState('')
    const [edit,setEdit]=useState(false)
    const [serEr,setSerEr]=useState(null)
    const [candidate,setCandidate]=useState([])
    const status = [
        { name: 'accepted'},
        { name: 'under-review'},
        { name: 'rejected'}
    ]
    useEffect(()=>{
        const fun=async()=>{
            const res=await axios.get(`/api/jobs/${id}/applications/${appId}`,
            {headers:{
                Authorization:localStorage.getItem('token')
            }})
            setApp(res.data)
        }
       fun()
    },[])

    useEffect(()=>{
        const fun=async()=>{
            const res=await axios.get(`/api/candidate/${appId}`,
            {
                headers:{
                Authorization:localStorage.getItem('token')
            }})
            setCandidate(res.data)
        }
       fun()
    },[])


    const handleUpdate=async(e)=>{
   try {  
        e.preventDefault()
        console.log(update)
        const res=await axios.put(`/api/jobs/${id}/applications/${appId}`,{ status: update },{
            headers:{
            Authorization:localStorage.getItem('token')
        }
    })
        setApp(res.data)
        setUpdate('')
        setSerEr(null)
    }catch(err){
          setSerEr(err.response.data.errors)
    }
 }
    const handleToggle=()=>{
        setEdit(!edit)
    }



return (
    <div>
        <h2>Application Info</h2>
        {
            app && 
            <>
            <h3>appId :- {app._id}</h3>
            <h3>JodId :- {app.job}</h3>
            <h3>status :- {app.status}</h3>
            </>
        }
         {
            edit && 
            <form onSubmit={handleUpdate}>
                <select  onChange={(e)=>{setUpdate(e.target.value)}}>
                    <option value=''>Select Status</option>
                    {
                        status.map((ele,i)=>{
                            return <option key={i} value={ele.name}>{ele.name}</option>
                        })
                    }
                </select>
               < input type="submit" />
            </form>
         }
        <button onClick={handleToggle}> { edit ? 'Cancel' : 'Update' }</button>

        {serEr && <h4 style={{color:'red'}}>Errors</h4>}
        <ul>
        {
            serEr &&
            
                 serEr.map((ele,i)=>{
                    return <li key={i} style={{color:'red'}}>{ele.msg}</li>
                 })
        }
        </ul>

         <h2>Candidate Info</h2>
        {
            candidate && 
            <>
            <h3>canidateId :- {candidate._id}</h3>
            <h3>FirstName :- {candidate.firstName}</h3>
            <h3>LastName :- {candidate.lastName}</h3>
            <h3>MobileNo :- {candidate.mobile}</h3>
            <h3>address :- {candidate.address}</h3>

            </>
        }
        


    </div>
)
}