import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { db } from '../../database/firebase-Config'
import { useState,useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc,updateDoc} from "firebase/firestore"
import { Link } from 'react-router-dom';
import Navbar from '../../navbar'

const ViewExpend = () => {
    const [Employees, setEmployee] = useState([]);
    const dbE = collection(db, "FacilitiesAndEquipments");

    useEffect(() => {
        const getData = async()=> {
          const data = await getDocs(dbE);
          setEmployee(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
    
        getData();
      }, []);


  return (
    <div>
        <BarChart width={600} height={300} data={Employees}>
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="price" fill="#8884d8" barSize={30} />
        </BarChart>
    </div>
  )
}

export default ViewExpend
