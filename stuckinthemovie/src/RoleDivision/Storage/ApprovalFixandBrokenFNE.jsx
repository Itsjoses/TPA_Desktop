import React from 'react'
import { db } from '../../database/firebase-Config';
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc, updateDoc,query,where} from "firebase/firestore"
import DataTable from 'react-data-table-component';
import Navbar from '../../navbar';
import QRCode from 'qrcode.react';

const ApprovalFixandBrokenFNE = () => {
    const [FNB, setFNB] = useState([]);

    const dbFE = collection(db,"FixandBrokeFNE")
    const dbFNE = collection(db,"FacilitiesAndRequipments")
    const dbQ = query(dbFE,where("status","==","none"))
    useEffect(() => {
        const getFund = async()=> {
          const data = await getDocs(dbQ);
          setFNB(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
    
        getFund();
      }, []);

      const fixableFNE = async(id) =>{
        const docFNE = doc(dbFE,id);
        await updateDoc(docFNE,{
            status: "fixable"
        })
        window.location.reload()
      }

      const brokeFNE = async(id,FNEid,quantity) =>{
        const docFFNE = doc(dbFE,id);
        await updateDoc(docFFNE,{
            status: "broke"
        })
        const docFNE = doc(db,"FacilitiesAndEquipments",FNEid)
        const getdocFNE = await getDoc(docFNE)
        console.log(getdocFNE.data().quantity)
        await updateDoc(docFNE,{
            quantity: Number(getdocFNE.data().quantity - quantity)
        })
        window.location.reload()
      } 

      const columns = [
        {
            name: 'Equipment Name',
            selector: row => row.FNEName,
            sortable: true,
        },
        {
            name: 'Quantity',
            selector: row => row.quantity,
            sortable: true,
        },
        {
            name: 'Action',
            cell: row =>{
                return (
                    <button onClick={() => fixableFNE(row.id)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-1/2">
                        Fixeable
                    </button>
                    )
            }
        },  
        {
            name: 'Action',
            cell: row =>{
                return (
                    <button onClick={() => brokeFNE(row.id,row.FNEId,row.quantity)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-1/2">
                        Broke
                    </button>
                    )
            }
        },  
    ];
  return (
    <div>
      <Navbar/>
        <div className="max-w-screen min-h-screen relative shadow-md sm:rounded-lg p-8 ml-[270px]">
            <DataTable
                columns={columns}
                data={FNB}
                pagination
            />
        </div>
    </div>
  )
}

export default ApprovalFixandBrokenFNE
