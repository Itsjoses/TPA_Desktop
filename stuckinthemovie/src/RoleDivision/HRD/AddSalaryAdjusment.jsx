import React from 'react'
import { db } from '../../database/firebase-Config'
import { useState,useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc,updateDoc, where,query} from "firebase/firestore"
import { Link } from 'react-router-dom';
import Navbar from '../../navbar'
import DataTable from 'react-data-table-component';

const AddSalaryAdjusment = () => {
    const [employees,setEmployee] = useState([]);

    const dbE = query(collection(db,"Employee"),where("status","==","Active"));
    const DBSA = collection(db,"SalaryAdjusment");

    const [salary,setSalary] = useState(1);
      
    useEffect(() => {
        const getData = async() =>{
            const data = await getDocs(dbE);
            setEmployee(data.docs.map((doc) => ({...doc.data(),id : doc.id})));
        }
        getData();
    },[])

    const AddSalaryAdjusment = async(id,name,job,email) =>{
        try {
            await addDoc(DBSA,{
                employeeId : id,
                name: name,
                job: job,
                email : email,
                salary: Number(salary),
                status : "none"
            })
            
        } catch (error) {
              console.log(error.message);
        }
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
          name: 'SalaryAdjusment',
          cell: row => {
            return (
                <input type="number" name="" id="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => {setSalary(e.target.value)}}/>

            )
          }
        },
        {
            name: 'Action',
            cell: row => {
              return (
                <button onClick={() => {AddSalaryAdjusment(row.id,row.name,row.job,row.email)}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Submit</button>
            
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
                    data={employees}
                    pagination
                />
        </div>
     
    </div>
  )
}

export default AddSalaryAdjusment
