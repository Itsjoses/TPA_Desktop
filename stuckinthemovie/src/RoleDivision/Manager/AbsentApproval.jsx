import React from 'react'
import { db } from '../../database/firebase-Config'
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc, updateDoc} from "firebase/firestore"
import Navbar from '../../navbar'

const AbsentApproval = () => {
  const [PersonalLeave, setPersonalLeave] = useState([]);

    const dbPL = collection(db, "PersonalLeave");
    useEffect(() => {
      const getRecruitment = async()=> {
        const data = await getDocs(dbPL);
        setPersonalLeave(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      };
  
      getRecruitment();
    }, []);

    const AcceptAbsent = async(id) => {
      const AAdoc = doc(dbPL,id);
      await updateDoc(AAdoc,{status: "Accept"})
    }

    const RejectAbsent = async(id) => {
      const AAdoc = doc(dbPL,id);
      await updateDoc(AAdoc,{status: "Reject"})
    }
  return (
    <div className="cotainer flex flex-row">
      <Navbar/>
      <div className="w-full min-h-screen relative shadow-md sm:rounded-lg p-8 ml-[270px]">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-b-4 ">
                <tr>
                  <th className="py-3 px-6 bg-gray-50 dark:bg-gray-800 ">Name</th>
                  <th className="py-3 px-6 dark:bg-gray-100">Email</th>
                  <th className="py-3 px-6 bg-gray-50 dark:bg-gray-800">Job</th>
                  <th className="py-3 px-6 dark:bg-gray-100">Type</th>
                  <th className="py-3 px-6 bg-gray-50 dark:bg-gray-800">Comment</th>
                  <th className="py-3 px-6 dark:bg-gray-100">Action</th>
                  <th className="py-3 px-6 bg-gray-50 dark:bg-gray-800">Action</th>
                            </tr>
                          </thead>
                          <tbody>   
      {PersonalLeave.map((e) => {
        if(e.status === "none")
        return(
          <tr>
          <td className="py-3 px-6 bg-gray-50 dark:bg-gray-800">{e.name}</td>
          <td className="py-3 px-6 dark:bg-gray-100">{e.email}</td>
          <td className="py-3 px-6 bg-gray-50 dark:bg-gray-800">{e.job}</td>
          <td className="py-3 px-6 dark:bg-gray-100">{e.type}</td>
          <td className="py-3 px-6 bg-gray-50 dark:bg-gray-800">{e.comment}</td>
          <td className="py-3 px-6 dark:bg-gray-100">
          <button onClick={() => AcceptAbsent(e.id)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          Accept Absent
          </button>
          </td>
          <td className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
          <button onClick={() => RejectAbsent(e.id)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          Reject Absent
          </button>
          </td>
          </tr>
                
        );
      })

      }
                          </tbody>
            </table>
        </div>
    </div>
  )
}

export default AbsentApproval
