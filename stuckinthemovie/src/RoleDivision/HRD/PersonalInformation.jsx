import React from 'react'
import { db } from '../../database/firebase-Config'
import { useState,useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc,updateDoc, where,query} from "firebase/firestore"
import { Link } from 'react-router-dom';
import Navbar from '../../navbar'
import DataTable from 'react-data-table-component';

const PersonalInformation = () => {
    const [employees,setEmployee] = useState([]);

    const dbE = query(collection(db,"Employee"),where("status","==","Active"));
    const DBSA = collection(db,"SalaryAdjusment");

    const [salary,setSalary] = useState(1);
      
    useEffect(() => {
        const getData = async() =>{
            const data = await getDocs(dbE);
            setEmployee(data.docs.map((doc) => ({...doc.data(),id : doc.id})));
        }
        getData();
    },[])

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Job',
            selector: row => row.job,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
          
    ];

  return (
    <div >
        <Navbar/>
        <div className="max-w-screen min-h-screen relative shadow-md sm:rounded-lg p-8 ml-[270px]">
            <DataTable
                    columns={columns}
                    data={employees}
                    pagination
                    expandOnRowClicked
                    expandableRows
                expandableRowsComponent={(row) => {
                  return (
                    <div>
                      <table style={{width: "100%"}}>
                        <tr >
                          <td style={{width: "15%"}}>Age: </td>
                          <td style={{width: "85%"}}>{row.data.age}</td>
                        </tr >
                        <tr>
                          <td style={{width: "15%"}}>NumberPhone: </td>
                          <td style={{width: "85%"}}>{row.data.numberPhone}</td>
                        </tr>
                        <tr>
                          <td style={{width: "15%"}}>Salary: </td>
                          <td style={{width: "85%"}}>Rp. {row.data.salary}</td>
                        </tr>
                        <tr>
                          <td style={{width: "15%"}}>WarningLetter: </td>
                          <td style={{width: "85%"}}>{row.data.warningLetter}</td>
                        </tr>
                        <tr>
                          <td style={{width: "15%"}}>StartTime: </td>
                          <td style={{width: "85%"}}>{row.data.startTime}</td>
                        </tr>
                        <tr>
                          <td style={{width: "15%"}}>EndTime: </td>
                          <td style={{width: "85%"}}>{row.data.endTime}</td>
                        </tr>
                      </table>
                    </div>
                      
                  )
                }}
                />
        </div>
     
    </div>
  )
}

export default PersonalInformation
