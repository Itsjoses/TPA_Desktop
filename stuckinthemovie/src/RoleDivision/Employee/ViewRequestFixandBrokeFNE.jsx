import React from 'react'
import { db } from '../../database/firebase-Config'
import { useState,useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc,updateDoc} from "firebase/firestore"
import { Link } from 'react-router-dom';
import Navbar from '../../navbar'

const ViewRequestFixandBrokeFNE = () => {
  const [Employees, setEmployee] = useState([]);
  const dbE = collection(db, "Employee");

    useEffect(() => {
        const getRecruitment = async()=> {
          const data = await getDocs(dbE);
          setEmployee(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
    
        getRecruitment();
      }, []);

  return (
    <div>
      <div className="min-w-full cotainer flex flex-row">

        <Navbar/>
        <div className="w-screen min-h-screen relative shadow-md sm:rounded-lg p-8 ml-[270px]">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <tr>
                <th className="py-3 px-6 bg-gray-50 dark:bg-gray-800">Name</th>
                <th className="py-3 px-6 dark:bg-gray-100">Age</th>
                <th className="py-3 px-6 bg-gray-50 dark:bg-gray-800">Job</th>
                <th className="py-3 px-6 dark:bg-gray-100">Email:</th>
                <th className="py-3 px-6 bg-gray-50 dark:bg-gray-800">Action</th>
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
                          <td className="py-3 px-6 dark:bg-gray-100">{Employee.email}</td>
                          <td className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                          <Link to="/RequestFixandBrokeFNE" state={{Employeeid: Employee.id, Employeejob: Employee.job}} >Add Request FNE</Link>
                          </td>
                          
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

export default ViewRequestFixandBrokeFNE
