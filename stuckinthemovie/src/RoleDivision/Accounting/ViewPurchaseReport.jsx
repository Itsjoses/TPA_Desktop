import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip  } from 'recharts';
import { db } from '../../database/firebase-Config'
import { useState,useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc,updateDoc} from "firebase/firestore"
import { Link } from 'react-router-dom';
import Navbar from '../../navbar'

const ViewPurchaseReport = () => {
    const [expend, setExpend] = useState([]);
    const [month, setMonth] = useState(["January","February","Maret","April","Mei","Juni","july","Agustus","September","Oktober","November","Desember"])
    const dbEx = collection(db, "FacilitiesAndEquipments");


    useEffect(() => {

      let totalExpend = []
      for(let i =0;i<12;i++){

        totalExpend[i] = 0
      } 
      const getData = async()=> {

        const dataExpend = await getDocs(dbEx);

        const Expenddocs = dataExpend.docs.map((doc) => ({...doc.data(), id: doc.id}))

        Expenddocs.map(e => {
          totalExpend[e.date.toDate().getMonth()] = Number(e.price) + totalExpend[e.date.toDate().getMonth()]
        })


        const getAllDataExpend = ([
          {
            month: month[0],
            price : totalExpend[0]
          },
          {
            month: month[1],
            price : totalExpend[1]
          },
          {
            month: month[2],
            price : totalExpend[2]
          },
          {
            month: month[3],
            price : totalExpend[3]
          },
          {
            month: month[4],
            price : totalExpend[4]
          },
          {
            month: month[5],
            price : totalExpend[5]
          },
          {
            month: month[6],
            price : totalExpend[6]
          },
          {
            month: month[7],
            price : totalExpend[7]
          },
          {
            month: month[8],
            price : totalExpend[8]
          },
          {
            month: month[9],
            price : totalExpend[9]
          },
          {
            month: month[10],
            price : totalExpend[10]
          },
          {
            month: month[11],
            price : totalExpend[11]
          }
        ]);
        setExpend(getAllDataExpend)
      };

      getData()
    }, []);

  return (
    <div>
      <Navbar/>
        <div className="max-w-screen min-h-screen relative shadow-md sm:rounded-lg p-8 ml-[270px] flex flex-col justify-around items-center">

          <div class="w-[700px] p-6 flex flex-col bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
              <p href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Purchase Report</h5>
              </p>
              <LineChart width={600} height={200} data={expend} margin={{ left: 50 }}>
                <Line type="monotone" dataKey="price" stroke="red" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
              </LineChart>
          </div>
        
        </div>
        
    </div>
  )
}

export default ViewPurchaseReport
