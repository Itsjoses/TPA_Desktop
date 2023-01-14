import React from 'react'
import {db} from "../../../database/firebase-Config"
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc,updateDoc} from "firebase/firestore"

const WorkingTime = () => {
    const [Employees, setEmployee] = useState([]);
    const [StartTime,setStartTime] = useState(1);
    const [EndTime,setEndTime] = useState(1);

    const dbE = collection(db, "Employee");

    useEffect(() => {
        const getRecruitment = async()=> {
          const data = await getDocs(dbE);
          setEmployee(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
    
        getRecruitment();
      }, []);


      const setWorkingTime = async(id) => {
        const employeeDoc = doc(db,"Employee",id);
        const setupdateDoc = {starttime: StartTime,
                            endtime : EndTime};
        await updateDoc(employeeDoc,setupdateDoc);
      }

      const checkstart = (start) =>{
        if(start) return <p>Start: {start}</p>
        
        else return <p>StartTime: -</p>
        
      }

      const checkend = (end) =>{
        if(end) return <p>EndTime: {end}</p>
        
        else return <p>EndTime: -</p>
        
      }
  return (
    <div>
        {Employees.map((Employee) => {
            return(
                <div>
                    
                    <p>Name: {Employee.name} </p>
                    <p>Age: {Employee.age} </p>
                    <p>Job: {Employee.job} </p>
                    <p>NumberPhone: {Employee.numberphone} </p>
                    <p>Email: {Employee.email} </p>
                
                    {checkstart(Employee.starttime)}
                    {checkend(Employee.endtime)}
                    {/* <form> */}
                    <input type="number" placeholder='StartTimes' required  onChange={(event) => {
                        setStartTime(event.target.value)
                    }}></input>
                    <input type="number" placeholder='EndTimes' required  onChange={(event) => {
                        setEndTime(event.target.value)
                    }}></input>
                    <button type="submit" onClick={() => {setWorkingTime(Employee.id)}}>Set Time</button>
                    {/* </form> */}
                </div>
                    
            );
        })

        }
    </div>
  )
}

export default WorkingTime
