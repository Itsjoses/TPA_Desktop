import React from 'react'
import { db } from '../../database/firebase-Config';
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc, updateDoc,query,where} from "firebase/firestore"
import DataTable from 'react-data-table-component';
import Navbar from '../../navbar';
import { useLocation} from "react-router-dom";

const RequestFixandBrokeFNE = () => {
    const [FNE, setFNE] = useState([]);
    const [reqQuantity, setQuantity] = useState(0)
    const dbFE = collection(db,"FacilitiesAndEquipments")
    const dbFixandBrokeFNE = collection(db,"FixandBrokeFNE")
    const userEmail = sessionStorage.getItem("userEmail");
    console.log(userEmail);
    const employeeid = useLocation().state?.Employeeid;
    useEffect(() => {
        const getPromo = async()=> {
          const data = await getDocs(dbFE);
          setFNE(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
    
        getPromo();
      }, []);

    const addFixandBrokeFNE = async(id,name) =>{
        await addDoc(dbFixandBrokeFNE, {
            employeeId : userEmail,
            FNEId : id,
            FNEName: name,
            quantity : Number(reqQuantity),
            status: "none"
        })
        window.location.reload()
    }

      const columns = [
        {
            name: 'Type',
            selector: row => row.type,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },        
        {
            name: 'Quantity',
            selector: row => row.quantity,
            sortable: true,
        },
        {
            name: 'Set Quantity',
            cell: row =>{
                return(
                    <input type='number' name="" id="" cols="30" rows="10" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                    setQuantity(event.target.value);
                }}>
                </input>
                )
            }
        },
        {
            name: 'Action',
            cell: row =>{
            return (
            <button onClick={() => addFixandBrokeFNE(row.id,row.name)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-1/2">
                Add Data
            </button>
            )
            
            }
        },
    ];
  return (
    <div>
      <Navbar/>
        <div className="max-w-screen min-h-screen relative shadow-md sm:rounded-lg p-8 ml-[270px]">
            <button>Current</button>
            <DataTable
                columns={columns}
                data={FNE}
                pagination
            />
        </div>
    </div>
  )
}

export default RequestFixandBrokeFNE
