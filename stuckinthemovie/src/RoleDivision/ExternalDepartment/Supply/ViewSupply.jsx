import React from 'react'
import { db } from '../../../database/firebase-Config'
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc, updateDoc,query,where} from "firebase/firestore"
import DataTable from 'react-data-table-component';
import Navbar from '../../../navbar';

const ViewSupply = () => {
    const [supply, setSupply] = useState([]);

    const dbM =  collection(db,"Supply")
    useEffect(() => {
        const getRecruitment = async()=> {
          const data = await getDocs(dbM);
          setSupply(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
    
        getRecruitment();
      }, []);

      const columns = [
        {
            name: 'Food name',
            selector: row => row.supplyName,
            sortable: true,
        },
        {
            name: 'Food Price',
            selector: row => row.supplyPrice,
            sortable: true,
        },
        {
            name: 'Quantity',
            selector: row => row.supplyQuantity,
            sortable: true,
        },
    ];
  return (
    <div>
      <Navbar/>
        <div className="max-w-screen min-h-screen relative shadow-md sm:rounded-lg p-8 ml-[270px]">
            <DataTable
                columns={columns}
                data={supply}
                pagination
            />
        </div>
    </div>
  )
}

export default ViewSupply
