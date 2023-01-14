import React from 'react'
import {db} from "../../database/firebase-Config"
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc} from "firebase/firestore"
import Navbar from '../../navbar'

const AddResign = () => {
    const [Employees, setEmployee] = useState([]);
    const dbE = collection(db,"Employee")
    useEffect(() => {
        const getRecruitment = async()=> {
          const data = await getDocs(dbE);
          setEmployee(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
    
        getRecruitment();
      }, []);

    const Resign = async(id,name,job,email) =>{
        const dbR = collection(db,"ResignRequest");
        await addDoc(dbR,{
            employeeid : id,
            name : name,
            job : job,
            email : email,
            status: "none"
        })
    }
    
  return (
    <div className="cotainer flex flex-row">
      <Navbar/>
      <div className="w-screen min-h-screen relative shadow-md sm:rounded-lg p-8 ml-[270px]">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-b-4 ">
                <tr>
                  <th className="py-3 px-6 bg-gray-50 dark:bg-gray-800 ">Name</th>
                  <th className="py-3 px-6 dark:bg-gray-100">Age</th>
                  <th className="py-3 px-6 bg-gray-50 dark:bg-gray-800">Job</th>
                  <th className="py-3 px-6 dark:bg-gray-100">PhoneNumber</th>
                  <th className="py-3 px-6 bg-gray-50 dark:bg-gray-800">Email</th>
                  <th className="py-3 px-6 dark:bg-gray-100">Action</th>
                            </tr>
                          </thead>
                          <tbody> 
      {Employees.map((Employee) => {
        if(Employee.status == "Active")
        return(
          <tr>
          <td className="py-3 px-6 bg-gray-50 dark:bg-gray-800">{Employee.name}</td>
          <td className="py-3 px-6 dark:bg-gray-100">{Employee.age}</td>
          <td className="py-3 px-6 bg-gray-50 dark:bg-gray-800">{Employee.job}</td>
          <td className="py-3 px-6 dark:bg-gray-100">{Employee.numberPhone}</td>
          <td className="py-3 px-6 bg-gray-50 dark:bg-gray-800">{Employee.email}</td>
          <td className="py-3 px-6 dark:bg-gray-100 ">
          <button onClick={() => Resign(Employee.id,Employee.name,Employee.job,Employee.email)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            Add Resign
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

export default AddResign
