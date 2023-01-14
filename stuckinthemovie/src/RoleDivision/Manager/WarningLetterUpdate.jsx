import React from 'react'
import "../../index.css"
import "../../css/table.css"
import {db} from "../../database/firebase-Config"
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc,updateDoc} from "firebase/firestore"
import { async } from '@firebase/util'
import Navbar from '../../navbar'




const WarningLetterUpdate = () => {

    const [WarningLetters,setWarningLetter] = useState([]);
    const dbWl = collection(db,"WarningLetter");
    useEffect(() => {
        const getWarningLetter = async()=> {
          const data = await getDocs(dbWl);
          setWarningLetter(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
    
        getWarningLetter();
    }, []);
    
    const AcceptWarningLetter = async(count,employeeid,id) => {
      const Employee = doc(db,"Employee",employeeid);
      const newField = {warningLetter : count+1};
      await updateDoc(Employee,newField);
      const WarningLetterDoc = doc(db,"WarningLetter",id);
      await updateDoc(WarningLetterDoc,{status: "Accept"});
    }

    const RejectWarningLetter = async(id) => {
      const WarningLetterDoc = doc(db,"WarningLetter",id);
      await updateDoc(WarningLetterDoc,{status: "Reject"});
    }

    const FiredEmployee = async(id) => {
      const EmployeeDoc = doc(db,"Employee",id);
      await updateDoc(EmployeeDoc,{status: "Fired"});
      const WarningLetterDoc = doc(db,"WarningLetter",id);
      await updateDoc(WarningLetterDoc,{status: "Fired"});
    }

    function choose(count,employeeid,id){
      if(count > 3){
        return <td className="py-3 px-6 bg-gray-50 dark:bg-gray-800"><button type="submit"  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => {FiredEmployee(employeeid)}}>Fired Employee</button></td>
      } 
      return <td className="py-3 px-6 bg-gray-50 dark:bg-gray-800"><button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => {AcceptWarningLetter(count,employeeid,id)}} >Accept Warning Letter</button></td> 
    }

  return (
    <div>
      <div className="cotainer flex flex-row">

        <Navbar/>
        <div className="w-screen min-h-screen relative shadow-md sm:rounded-lg p-8 ml-[270px]">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <tr>
                <th className="py-3 px-6 bg-gray-50 dark:bg-gray-800">Name</th>
                <th className="py-3 px-6 dark:bg-gray-100">Job</th>
                <th className="py-3 px-6 bg-gray-50 dark:bg-gray-800">Comment</th>
                            <th className="py-3 px-6 dark:bg-gray-100">Total Warning Letter</th>
                            <th className="py-3 px-6 bg-gray-50 dark:bg-gray-800">Action</th>
                            <th className="py-3 px-6 dark:bg-gray-100">Action</th>
                          </tr>
                        </thead>
                        <tbody>
        {WarningLetters.map((WarningLetter) => {
          if(WarningLetter.status === "none")
              return(
                          <tr>
                          <td className="py-3 px-6 bg-gray-50 dark:bg-gray-800">{WarningLetter.employeename}</td>
                          <td className="py-3 px-6 dark:bg-gray-100">{WarningLetter.employeejob}</td>
                          <td className="py-3 px-6 bg-gray-50 dark:bg-gray-800">{WarningLetter.employeecomment}</td>
                          <td className="py-3 px-6 dark:bg-gray-100">{WarningLetter.employeewarningletter}</td>
                          {choose(WarningLetter.employeewarningletter,WarningLetter.employeeid,WarningLetter.id)}
                          <td className="py-3 px-6 dark:bg-gray-100"><button type="submit" onClick={() => {RejectWarningLetter(WarningLetter.id)}}
                           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                           >Reject Warning Letter</button></td>
                          </tr>
              );
          })

          }
          </tbody>
          </table>


        </div>
      </div>
    </div>
  )
}

export default WarningLetterUpdate
