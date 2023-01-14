import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip  } from 'recharts';
import { db } from '../../../database/firebase-Config';
import { useState,useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc,updateDoc} from "firebase/firestore"
import { Link } from 'react-router-dom';
import Navbar from '../../../navbar';

const MovieReport = () => {
    const [report, setReport] = useState([]);
    const [taxes, setTaxes] = useState([]);
    const [month, setMonth] = useState(["January","February","Maret","April","Mei","Juni","july","Agustus","September","Oktober","November","Desember"])
    const dbMH = collection(db, "OrderMovieHeader");


    useEffect(() => {

      let totalReport = []
      for(let i =0;i<12;i++){
        totalReport[i] = 0
      } 
      const getData = async()=> {

        const dataExpend = await getDocs(dbMH);

        const ReportDoc = dataExpend.docs.map((doc) => ({...doc.data(), id: doc.id}))

        ReportDoc.map(e => {
            totalReport[e.date.toDate().getMonth()] = Number(e.price) + totalReport[e.date.toDate().getMonth()]
        })


        const getAllDataExpend = ([
          {
            month: month[0],
            price : totalReport[0]
          },
          {
            month: month[1],
            price : totalReport[1]
          },
          {
            month: month[2],
            price : totalReport[2]
          },
          {
            month: month[3],
            price : totalReport[3]
          },
          {
            month: month[4],
            price : totalReport[4]
          },
          {
            month: month[5],
            price : totalReport[5]
          },
          {
            month: month[6],
            price : totalReport[6]
          },
          {
            month: month[7],
            price : totalReport[7]
          },
          {
            month: month[8],
            price : totalReport[8]
          },
          {
            month: month[9],
            price : totalReport[9]
          },
          {
            month: month[10],
            price : totalReport[10]
          },
          {
            month: month[11],
            price : totalReport[11]
          }
        ]);

        const getAllDataTaxes = ([
            {
              month: month[0],
              price : totalReport[0]/10
            },
            {
              month: month[1],
              price : totalReport[1]/10
            },
            {
              month: month[2],
              price : totalReport[2]/10
            },
            {
              month: month[3],
              price : totalReport[3]/10
            },
            {
              month: month[4],
              price : totalReport[4]/10
            },
            {
              month: month[5],
              price : totalReport[5]/10
            },
            {
              month: month[6],
              price : totalReport[6]/10
            },
            {
              month: month[7],
              price : totalReport[7]/10
            },
            {
              month: month[8],
              price : totalReport[8]/10
            },
            {
              month: month[9],
              price : totalReport[9]/10
            },
            {
              month: month[10],
              price : totalReport[10]/10
            },
            {
              month: month[11],
              price : totalReport[11]/10
            }
          ]);
        setReport(getAllDataExpend)
        setTaxes(getAllDataTaxes)
        
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
              <LineChart width={600} height={200} data={report} margin={{ left: 50 }}>
                <Line type="monotone" dataKey="price" stroke="red" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
              </LineChart>
          </div>

          <div class="w-[700px] p-6 flex flex-col bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
              <p href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Taxes 10%</h5>
              </p>
              <LineChart width={600} height={200} data={taxes} margin={{ left: 50 }}>
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

export default MovieReport
