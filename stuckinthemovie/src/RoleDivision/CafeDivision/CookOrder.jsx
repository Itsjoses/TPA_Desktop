import React from 'react'
import { db } from '../../database/firebase-Config'
import { useState,useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc,updateDoc, where,query} from "firebase/firestore"
import { Link } from 'react-router-dom';
import Navbar from '../../navbar'
import DataTable from 'react-data-table-component';

const CookOrder = () => {
    const [kitchen,setKitchen] = useState([]);

    const dbE = query(collection(db,"Kitchen"),where("status","==","NotDone"));

    useEffect(() => {
        const getData = async() =>{
            const data = await getDocs(dbE);
            setKitchen(data.docs.map((doc) => ({...doc.data(),id : doc.id})));
        }
        getData();
    },[])

    const DoneCook = async(id) =>{
        const docsingle = doc(db,"Kitchen",id)
        await updateDoc(docsingle,{
            status: "Done"
        })
        window.location.reload()
    }

    const columns = [
        {
            name: 'Transaction Id',
            selector: row => row.transactionId,
        },
        {
            name: 'Action',
            cell: row=>{
                return (
                    <button onClick={() => DoneCook(row.id)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                    Done
                    </button>
                )
            },
        },
          
    ];

  return (
    <div >
        <Navbar/>
        <div className="max-w-screen min-h-screen relative shadow-md sm:rounded-lg p-8 ml-[270px]">
            <DataTable
                    columns={columns}
                    data={kitchen}
                    pagination
                />
        </div>
     
    </div>
  )
}

export default CookOrder
