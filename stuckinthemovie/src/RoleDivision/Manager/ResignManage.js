import React from 'react'
import {db} from "../../database/firebase-Config"
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc} from "firebase/firestore"

const ResignManage = () => {
    const [Resigns, setResign] = useState([]);

    const dbR = collection(db,"ResignRequest")
    useEffect(() => {
        const getRecruitment = async()=> {
          const data = await getDocs(dbR);
          setResign(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
    
        getRecruitment();
      }, []);

      const acceptResign = async (employeeid,id) =>{
            const dbE = doc(db,"Employee",employeeid);
            await deleteDoc(doc(dbR,id));
            await deleteDoc(dbE);
      }

      const rejectResign = async(id) =>{
        const dbE = doc(db,"Employee",id);
        await deleteDoc(dbE);
      }
    

  return (
    <div>
        {Resigns.map((Resign) => {
            return(
                <div>
                    <p>Name: {Resign.name} </p>
                    <p>Job: {Resign.job} </p>
                    <p>Email: {Resign.email} </p>
                    <button type="submit" onClick={() => {acceptResign(Resign.employeeid,Resign.id)}}>Accept Resign</button>
                    <button type="submit" onClick={() => {rejectResign(Resign.id)}}>Reject Resign</button>
                </div>
                    
            );
        })}
    </div>
  )
}

export default ResignManage
