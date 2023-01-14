import React from 'react'
import {db} from "../../../database/firebase-Config"
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc} from "firebase/firestore"

const SelectRecruitment = () => {
    const [Recruitments, setRecruitment] = useState([]);
    const dbSITM = collection(db, "RecruitmentEmployee");
    const dbE = collection(db, "Employee");
  
    const acceptRecruitment = async(id) => {
        const recruitmentDoc = doc(db,"RecruitmentEmployee",id);
        const docData = await (await getDoc(recruitmentDoc)).data();
        // console.log(docData.data());
        await addDoc(dbE,docData);
        await deleteDoc(recruitmentDoc);
    }

    const rejectRecruitment = async(id) => {
      const recruitmentDoc = doc(db,"RecruitmentEmployee",id);
        await deleteDoc(recruitmentDoc);
    }

    useEffect(() => {
        const getRecruitment = async()=> {
          const data = await getDocs(dbSITM);
          setRecruitment(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
    
        getRecruitment();
    
      }, []);

  return (
    <div>
      {Recruitments.map((Recruitment) => {
        return(
            <div>
                <h1>Name: {Recruitment.name} </h1>
                <h1>Age: {Recruitment.age} </h1>
                <h1>Job: {Recruitment.job} </h1>
                <h1>NumberPhone: {Recruitment.numberphone} </h1>
                <h1>Email: {Recruitment.email} </h1>

                <button onClick={() => {acceptRecruitment(Recruitment.id)}}>Accept Recruitment</button>
                <button onClick={() => {rejectRecruitment(Recruitment.id)}}>Rejected Recruitment</button>
          </div>
        );
      })

      }
    </div>
  )
}

export default SelectRecruitment
