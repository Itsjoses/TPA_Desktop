import React from 'react'
import { db } from '../../database/firebase-Config';
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc, updateDoc,query,where} from "firebase/firestore"
import DataTable from 'react-data-table-component';
import Navbar from '../../navbar';

const ViewEvent = () => {
    const [events, setevent] = useState([]);

    const dbE = collection(db,"Event")
    useEffect(() => {
        const getPromo = async()=> {
          const data = await getDocs(dbE);
          setevent(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
    
        getPromo();
      }, []);

      const columns = [
        {
            name: 'Event Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'Start Date',
            selector: row => row.startDate,
            sortable: true,
        },
        {
            name: 'End Date',
            selector: row => row.endDate,
            sortable: true,
        },
    ];
  return (
    <div>
      <Navbar/>
        <div className="max-w-screen min-h-screen relative shadow-md sm:rounded-lg p-8 ml-[270px]">
            <button>Current</button>
            <DataTable
                columns={columns}
                data={events}
                pagination
            />
        </div>
    </div>
  )
}

export default ViewEvent
