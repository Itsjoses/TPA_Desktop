import React from 'react'
import {useState} from 'react'
import {db} from "../../../database/firebase-Config"
import {collection, addDoc} from "firebase/firestore"
const AddRecruitment = () => {
    const [newName, setnewName] = useState("");
    const [newAge, setnewAge] = useState(0);
    const [newJob, setnewJob] = useState("");
    const [newNumberPhone, setnewNumberPhone] = useState("");
    const [newEmail, setnewEmail] = useState("");
    const dbSITM = collection(db, "RecruitmentEmployee");

    const createNewRecruitmentEmployee = async () => {
        await addDoc(dbSITM, {
            name: newName,
            age: Number(newAge),
            job: newJob,
            numberphone: newNumberPhone,
            email: newEmail,
            warningletter : Number(0),
            starttime: Number(0),
            endtime: Number(0)
        });
    }
  return (
    <div id='createNewRecruitment'>
      <input type="text" placeholder='Name' onChange={(event) => {
        setnewName(event.target.value)
      }}/>

        <input type="Number" placeholder='Age' onChange={(event) => {
        setnewAge(event.target.value);
      }}/>

      <input type="text" placeholder='Job' onChange={(event) => {
        setnewJob(event.target.value)
      }}/>

      <input type="text" placeholder='NumberPhone' onChange={(event) => {
        setnewNumberPhone(event.target.value)
      }}/>

      <input type="text" placeholder='Email' onChange={(event) => {
        setnewEmail(event.target.value)
      }}/>

      <button onClick={createNewRecruitmentEmployee}>Create New Recruitment</button>
    </div>
  )
}

export default AddRecruitment
