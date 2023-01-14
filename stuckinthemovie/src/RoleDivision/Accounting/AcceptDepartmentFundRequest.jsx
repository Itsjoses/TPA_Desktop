import React from 'react'
import "../../index.css"
import {db} from "../../database/firebase-Config"
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc,updateDoc} from "firebase/firestore"
import { async } from '@firebase/util'
import Navbar from '../../navbar';

const AcceptDepartmentFundRequest = () => {
  const [fundRequests,setFundRequest] = useState([]);
  const dbFR = collection(db,"FundRequest");
  useEffect(() => {
    const getDatabase = async() =>{
      const data = await getDocs(dbFR);
      setFundRequest(data.docs.map((doc) => ({...doc.data(),id: doc.id})))
    }
    getDatabase();
  }, [])

  function redirect(){
    window.location.reload();
  }

  const AcceptRequest = async(id) => {
    const DbDoc = doc(dbFR,id);
    await updateDoc(DbDoc,{status : "accept"});
    redirect();
  }

  const RejectRequest = async(id) => {
    const DbDoc = doc(dbFR,id);
    await updateDoc(DbDoc,{status : "reject"});
    redirect();
  }


  return (
    <div className="cotainer flex flex-row">
        <Navbar/>
        <div className="w-screen min-h-screen relative shadow-md sm:rounded-lg p-8 ml-[270px]">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tr>
                  <th className="py-3 px-6 bg-gray-50 dark:bg-gray-800">Department</th>
                  <th className="py-3 px-6 dark:bg-gray-100">Price</th>
                  <th className="py-3 px-6 bg-gray-50 dark:bg-gray-800">Comment</th>
                  <th className="py-3 px-6 dark:bg-gray-100">Action</th>
                  <th className="py-3 px-6 bg-gray-50 dark:bg-gray-800">Action</th>
                            </tr>
                          </thead>
                          <tbody>                           
                          {fundRequests.map((fundRequest) => {
      if(fundRequest.status === "none"){
      return(  
          <tr>
          <td className="py-3 px-6 bg-gray-50 dark:bg-gray-800">{fundRequest.employeejob}</td>
          <td className="py-3 px-6 dark:bg-gray-100">{fundRequest.price}</td>
          <td className="py-3 px-6 bg-gray-50 dark:bg-gray-800">{fundRequest.comment}</td>
          <td className="py-3 px-6 dark:bg-gray-100">
          <button onClick={() => AcceptRequest(fundRequest.id)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-1/2">
              Accept
          </button>
          </td>
          <td className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
          <button onClick={() => RejectRequest(fundRequest.id)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-1/2">
              Reject
          </button>
          </td>
          
          </tr>
          );
        }
  })
  }
                          </tbody>
            </table>
        </div>
    </div>
  )
}

export default AcceptDepartmentFundRequest
