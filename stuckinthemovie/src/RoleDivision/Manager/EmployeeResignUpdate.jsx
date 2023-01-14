import React from 'react'
import {db} from "../../database/firebase-Config"
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc, updateDoc,query,where} from "firebase/firestore"
import Navbar from '../../navbar'
import DataTable from 'react-data-table-component';

const EmployeeResignUpdate = () => {
    const [Resigns, setResign] = useState([]);

    const dbR = query(collection(db,"ResignRequest"),where("status","==","none"));
    
    useEffect(() => {
        const getRecruitment = async()=> {
          const data = await getDocs(dbR);
          setResign(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
    
        getRecruitment();
      }, []);

      const acceptResign = async (employeeid,id) =>{
            const dbE = doc(db,"Employee",employeeid);
            const dbR = doc(db,"ResignRequest",id);
            await updateDoc(dbE,{status: "Resign"});
            await updateDoc(dbR,{status: "Accept"});
      }

      const rejectResign = async(id) =>{
            const dbR = doc(db,"ResignRequest",id);
            await updateDoc(dbR,{status: "Reject"});
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
              <button onClick={acceptResign(row.employeeid,row.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Accept</button>
            )
          }
        },
        {
          name: 'Action',
          cell: row => {
            return (
              <button onClick={rejectResign(row.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Reject</button>
            
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
                data={Resigns}
                pagination
            />
        </div>
      
    </div>
  )
}

export default EmployeeResignUpdate
