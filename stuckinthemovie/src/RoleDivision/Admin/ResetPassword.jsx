import React from 'react'
import { db } from '../../database/firebase-Config'
import { useState,useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc,updateDoc, where,query} from "firebase/firestore"
import { Link } from 'react-router-dom';
import Navbar from '../../navbar'
import DataTable from 'react-data-table-component';
import { reload, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../database/firebase-Config';
import { toast, Toaster } from 'react-hot-toast';

const ResetPassword = () => {
    const [employees,setEmployee] = useState([]);

    const dbE = query(collection(db,"Employee"),where("status","==","Active"));
      
    useEffect(() => {
        const getData = async() =>{
            const data = await getDocs(dbE);
            setEmployee(data.docs.map((doc) => ({...doc.data(),id : doc.id})));
        }
        getData();
    },[])

    const changePassword = async(email) =>{
      console.log("asd");
      await sendPasswordResetEmail(auth,email).then(toast.success('Reset Password is Already Sent'));
      window.location.reload();
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
          name: 'Action',
          cell: row => {
            return (
              <button onClick={() => changePassword(row.email)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-full">
                        Send Change Password
                    </button>
            )
          },
      },
          
    ];

  return (
    
    <div >
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
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

export default ResetPassword
