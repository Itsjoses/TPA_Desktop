import React from 'react'
import {db} from "../../../database/firebase-Config"
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc} from "firebase/firestore"
import Navbar from '../../../navbar'

const WarningLetter = () => {
    const [Employees, setEmployee] = useState([]);
    const [Comment, setComment] = useState("");

    const dbE = collection(db, "Employee");
    const dbWl = collection(db,"WarningLetter");

    useEffect(() => {
        const getRecruitment = async()=> {
          const data = await getDocs(dbE);
          setEmployee(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
    
        getRecruitment();
      }, []);

    const giveWarningletter = async(id,name,job,countWarningLetter) => {
        await addDoc(dbWl,{
            employeeid : id,
            employeename : name,
            employeejob : job,
            employeecomment : Comment,
            employeewarningletter: countWarningLetter,
            status: "none"
        })
        window.location.reload();
    }
    
  return (
    <div className="min-w-full cotainer flex flex-row">
      <Navbar/>
        <div className="w-full min-h-screen relative shadow-md sm:rounded-lg p-8 ml-[270px]">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-b-4 ">
                <tr>
                  <th className="py-3 px-6 bg-gray-50 dark:bg-gray-800 ">Name</th>
                  <th className="py-3 px-6 dark:bg-gray-100">Age</th>
                  <th className="py-3 px-6 bg-gray-50 dark:bg-gray-800">Job</th>
                  <th className="py-3 px-6 dark:bg-gray-100">Email</th>
                  <th className="py-3 px-6 bg-gray-50 dark:bg-gray-800">Warning Letter Count</th>
                  <th className="py-3 px-6 dark:bg-gray-100">AddComment</th>
                  <th className="py-3 px-6 bg-gray-50 dark:bg-gray-800">Action</th>
                            </tr>
                          </thead>
                          <tbody>   
      {Employees.map((Employee) => {
        if(Employee.status === "Active")
        return(
          <tr>
          <td className="py-3 px-6 bg-gray-50 dark:bg-gray-800">{Employee.name}</td>
          <td className="py-3 px-6 dark:bg-gray-100">{Employee.age}</td>
          <td className="py-3 px-6 bg-gray-50 dark:bg-gray-800">{Employee.job}</td>
          {/* <td className="py-3 px-6 dark:bg-gray-100">{Employee.numberPhone}</td> */}
          <td className="py-3 px-6 dark:bg-gray-100">{Employee.email}</td>
          <td className="py-3 px-6 bg-gray-50 dark:bg-gray-800">{Employee.warningLetter}</td>
          <td className="py-3 px-6 dark:bg-gray-100">
            <input type="text" name="" id="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            onChange={(event) => {
                setComment(event.target.value);
                }}></input>
          </td>
          <td className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
          <button onClick={() => giveWarningletter(Employee.id,Employee.name,Employee.job,Employee.warningLetter)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          Give Warning Letter
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

export default WarningLetter
