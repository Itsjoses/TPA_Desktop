import React from 'react'
import { db } from '../../database/firebase-Config';
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc, updateDoc,query,where} from "firebase/firestore"
import DataTable from 'react-data-table-component';
import Navbar from '../../navbar';
import QRCode from 'qrcode.react';

const ViewDepartmentFundRequest = () => {
    const [fund, setFund] = useState([]);

    const dbFE = collection(db,"FundRequest")
    const dbQ = query(dbFE,where("status","==","accept"))
    useEffect(() => {
        const getFund = async()=> {
          const data = await getDocs(dbQ);
          setFund(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
    
        getFund();
      }, []);

      const columns = [
        {
            name: 'Department',
            selector: row => row.employeejob,
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true,
        },        
        {
            name: 'Comment',
            selector: row => row.comment,
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
                data={fund}
                pagination
            
            />
        </div>
    </div>
  )
}

export default ViewDepartmentFundRequest
