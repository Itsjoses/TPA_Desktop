import React from 'react'
import { db } from '../../database/firebase-Config';
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc, updateDoc,query,where} from "firebase/firestore"
import DataTable from 'react-data-table-component';
import Navbar from '../../navbar';
import { Link , useNavigate } from 'react-router-dom';

const ViewExternalReport = () => {
    const [Record, setRecord] = useState([]);
    const [shift,SetShift] = useState(0);
    const [movieName,SetMovieName] = useState("");
    const dbM = collection(db,"ExternalRecord");
    useEffect(() => {
        const getData = async()=> {
          const data = await getDocs(dbM);
          setRecord(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
    
        getData();
      }, []);

      const columns = [
        {
            name: 'Department',
            selector: row => row.department,
            sortable: true,
        },
        {
            name: 'Comment',
            selector: row => row.comment,
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => row.date.toDate().toLocaleDateString("en-US"),
            sortable: true,
        },
    ];

  return (
    <div>
      <Navbar/>
        <div className="max-w-screen min-h-screen relative shadow-md sm:rounded-lg p-8 ml-[270px]">            
            <DataTable
                columns={columns}
                data={Record}
                pagination
            />
        </div>
    </div>
  )
}

export default ViewExternalReport
