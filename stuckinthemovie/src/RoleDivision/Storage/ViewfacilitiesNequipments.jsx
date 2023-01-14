import React from 'react'
import { db } from '../../database/firebase-Config';
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc, updateDoc,query,where} from "firebase/firestore"
import DataTable from 'react-data-table-component';
import Navbar from '../../navbar';
import QRCode from 'qrcode.react';

const ViewfacilitiesNequipments = () => {
    const [FNE, setFNE] = useState([]);

    const dbFE = collection(db,"FacilitiesAndEquipments")
    useEffect(() => {
        const getPromo = async()=> {
          const data = await getDocs(dbFE);
          setFNE(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
    
        getPromo();
      }, []);

      const output = (id) =>{
        return(
        <QRCode
            id="qrCodeEl"
            size={150}
            value={id}
          />
        )
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
                expandOnRowClicked
                expandableRows
                expandableRowsComponent={(row) => {
                    return (
                      <div>
                        <table style={{width: "100%"}}>
                          <tr >
                            <td>{output(row.data.id)}</td>
                          
                          </tr >
                        </table>
                      </div>
                        
                    )
                  }}
            />
        </div>
    </div>
  )
}

export default ViewfacilitiesNequipments
