import React from 'react'
import { db } from '../../../database/firebase-Config'
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc, updateDoc,query,where} from "firebase/firestore"
import DataTable from 'react-data-table-component';
import Navbar from '../../../navbar';

const ViewAdvertising = () => {
    const [advertising, setAdvertising] = useState([]);

    const dbP = query(collection(db,"Partner"),where("status","==","Active"));
    useEffect(() => {
        const getRecruitment = async()=> {
          const data = await getDocs(dbP);
          setAdvertising(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
    
        getRecruitment();
      }, []);

      const columns = [
        {
            name: 'Partner Name',
            selector: row => row.partnerName,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.partnerEmail,
            sortable: true,
        },
        {
            name: 'Phone Number',
            selector: row => row.partnerPhoneNumber,
            sortable: true,
        },
        {
            name: 'Partner Detail',
            selector: row => row.partnerDetail,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
    ];
  return (
    <div>
      <Navbar/>
        <div className="max-w-screen min-h-screen relative shadow-md sm:rounded-lg p-8 ml-[270px]">
            <DataTable
                columns={columns}
                data={advertising}
                pagination
            />
        </div>
    </div>
  )
}

export default ViewAdvertising
