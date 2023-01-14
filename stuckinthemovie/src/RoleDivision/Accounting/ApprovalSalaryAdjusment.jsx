import React from 'react'
import { db } from '../../database/firebase-Config'
import { useState,useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc,updateDoc, where,query} from "firebase/firestore"
import { Link } from 'react-router-dom';
import Navbar from '../../navbar'
import DataTable from 'react-data-table-component';

const ApprovalSalaryAdjusment = () => {
    const [salarys,setSalarys] = useState([]);
    const dbE = query(collection(db,"SalaryAdjusment"),where("status","==","none"));
    const DBSA = collection(db,"SalaryAdjusment");
    const DBE = collection(db,"Employee");
      
    useEffect(() => {
        const getData = async() =>{
            const data = await getDocs(dbE);
            setSalarys(data.docs.map((doc) => ({...doc.data(),id : doc.id})));
        }
        getData();
    },[])

    const Accept = async(id,employeeId,salary) =>{
        const employeeDoc = doc(DBE,employeeId)
        await updateDoc(employeeDoc,{salary: salary})
        const salaryDoc = doc(DBSA,id);
        await updateDoc(salaryDoc,{status: "Accept"})
    }

    const Reject = async(id)=>{
        const salaryDoc = doc(DBSA,id);
        await updateDoc(salaryDoc,{status: "Reject"})
    }

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Job',
            selector: row => row.job,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Salary',
            selector: row => row.salary,
            sortable: true,
        },
        {
          name: 'Action',
          cell: row => {
            return (
                <button onClick={() => {Accept(row.id,row.employeeId,row.salary)}} 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Accept</button>
            
            )
          }
        },
        {
            name: 'Action',
            cell: row => {
              return (
                <button 
                onClick={() => Reject(row.id)} 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Reject</button>
              )
            }
          }
    ];

  return (
    <div >
        <Navbar/>
        <div className="max-w-screen min-h-screen relative shadow-md sm:rounded-lg p-8 ml-[270px]">
            <DataTable
                    columns={columns}
                    data={salarys}
                    pagination
                />
        </div>
     
    </div>
  )
}

export default ApprovalSalaryAdjusment
