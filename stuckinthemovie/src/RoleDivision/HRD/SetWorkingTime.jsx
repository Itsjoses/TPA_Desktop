import React from 'react'
import { db } from '../../database/firebase-Config'
import { useState,useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc,updateDoc, where,query} from "firebase/firestore"
import { Link } from 'react-router-dom';
import Navbar from '../../navbar'
import DataTable from 'react-data-table-component';

const SetWorkingTime = () => {
    const [employees,setEmployee] = useState([]);

    const dbE = query(collection(db,"Employee"),where("status","==","Active"));

    const [starttime,setStartTime] = useState(1);
    const [endtime,setEndTime] = useState(1);
      
    useEffect(() => {
        const getData = async() =>{
            const data = await getDocs(dbE);
            setEmployee(data.docs.map((doc) => ({...doc.data(),id : doc.id})));
        }
        getData();
    },[])

    const SetTime = async(id) =>{
      console.log("asd")
        const employeeDoc = doc(db,"Employee",id);
        await updateDoc(employeeDoc,{
            startTime : Number(starttime),
            endTime : Number(endtime)
        })
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
            name: 'StartTime',
            selector: row => row.startTime,
            sortable: true,
        },
        {
            name: 'EndTime',
            selector: row => row.endTime,
            sortable: true,
        },
        {
          name: 'StartTime',
          cell: row => {
            return (
                <input type="number" name="" id="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => {setStartTime(e.target.value)}}/>

            )
          }
        },
        {
          name: 'EndTime',
          cell: row => {
            return (
                <input type="number" name="" id="" 
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                onChange={ (e) => {setEndTime(e.target.value)}}/>
            )
          }
        },
        {
            name: 'Action',
            cell: row => {
              return (
                <button 
                onClick={() => SetTime(row.id)} 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Submit</button>
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

export default SetWorkingTime
