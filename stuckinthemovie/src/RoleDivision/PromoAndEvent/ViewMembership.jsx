import React from 'react'
import { db } from '../../database/firebase-Config';
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc, updateDoc,query,where} from "firebase/firestore"
import DataTable from 'react-data-table-component';
import Navbar from '../../navbar';
import QRCode from 'qrcode.react';

const ViewMembership = () => {
    const [memberships, setMembership] = useState([]);

    const dbM =  collection(db,"Membership")
    useEffect(() => {
        const getRecruitment = async()=> {
          const data = await getDocs(dbM);
          setMembership(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
    
        getRecruitment();
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
            name: 'Member Name',
            selector: row => row.memberName,
            sortable: true,
        },
        {
            name: 'Member Phone',
            selector: row => row.memberPhone,
            sortable: true,
        },
        {
            name: 'Member Email',
            selector: row => row.memberEmail,
            sortable: true,
        },
        {
          name: 'Member Tier',
          selector: row => row.memberTier,
          sortable: true,
      },
    ];
  return (
    <div>
      <Navbar/>
        <div className="max-w-screen min-h-screen relative shadow-md sm:rounded-lg p-8 ml-[270px]">
            <DataTable
                columns={columns}
                data={memberships}
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

export default ViewMembership
