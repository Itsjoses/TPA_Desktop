import React from 'react'
import { db } from '../../database/firebase-Config';
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc, updateDoc,query,where} from "firebase/firestore"
import DataTable from 'react-data-table-component';
import Navbar from '../../navbar';
import QRCode from 'qrcode.react';

const ViewPromo = () => {
    const [promo, setpromo] = useState([]);

    const dbP = collection(db,"Promo")
    useEffect(() => {
        const getPromo = async()=> {
          const data = await getDocs(dbP);
          setpromo(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
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
            name: 'Promo Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'Decrease Price',
            selector: row => row.decPrice,
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
        {
            name: 'Department',
            selector: row => row.department,
            sortable: true,
        },
        {
            name: 'Membership Tier',
            selector: row => row.tier,
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
                data={promo}
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

export default ViewPromo
