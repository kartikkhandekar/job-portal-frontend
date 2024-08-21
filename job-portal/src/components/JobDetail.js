import { useState, useEffect } from 'react' 
import { useParams } from 'react-router-dom'
import axios from '../config/axios'
export default function JobDetail(){
    const { id } = useParams()
    const [job, setJob] = useState(null)
    const [candidateStatus,setCandidateStatus] = useState(null)

    const handleApply = async () => {
        try { 
            const response = await axios.post('/api/applications', { job: id}, { 
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            setCandidateStatus(response.data)
        } catch(err) {
            alert(err) 
        }
    }

    useEffect(() => {
        (async() => {
            try { 
                const response = await axios.get(`/api/jobs/${id}`)
                setJob(response.data) 
            }catch(err) {
                alert(err) 
            }
        })();
    }, [])

    useEffect(() => {
        if(localStorage.getItem('token')) {
            (async() => {
                try { 
                    const response = await axios.get(`/api/applications/check/${id}`, { 
                        headers : {
                            Authorization: localStorage.getItem('token')
                        }
                    })
                    setCandidateStatus(response.data)
                } catch(err) {
                    console.log(err) 
                }
            })();
        }
    }, [])

    return (
        <div>
            { job && (
                <div>
                    <h2>{ job.title }</h2>
                    <p>{ job.description } </p>
                    <p>Skills: { job.skills.join(', ') }</p>
                    <p>Location: { job.location.join(', ') } </p>
                    <p>Job Type: { job.jobType } </p>
                    <p>Experience: { job.experience.minExp } - { job.experience.maxExp } </p>
                    <p>Salary : { job.salary.minSalary } - { job.salary.maxSalary } </p>
                    <p>Openings: { job.openings } </p>
                    <p>Last date to apply: { job.dueDate } </p>
                    <p>Recruiter: { job.recruiter }</p>
                    <p>Status : { candidateStatus?.status } </p>

                    { localStorage.getItem('token') ? <button onClick={handleApply}>Apply</button>  : <p>Sign in to apply for the job</p> }
                    
                </div> 
            )}
            
        </div>
    )
}