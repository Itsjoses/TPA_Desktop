import React from 'react'
import { db } from '../../database/firebase-Config';
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc, updateDoc,query,where} from "firebase/firestore"
import DataTable from 'react-data-table-component';
import Navbar from '../../navbar';
import { Link , useNavigate } from 'react-router-dom';

const ManagerViewSchedule = () => {
    const [schedule, setSchedule] = useState([]);
    const [shift,SetShift] = useState(0);
    const dbM = collection(db,"ScheduleMovieHeader");
    useEffect(() => {
        const getData = async()=> {
          const data = await getDocs(dbM);
          setSchedule(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
    
        getData();
      }, []);

      const columns = [
        {
            name: 'Movie Name',
            selector: row => row.MovieName,
            sortable: true,
        },
        {
            name: 'Studio Name',
            selector: row => row.StudioName,
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => row.Date.toDate().toLocaleDateString("en-US"),
            sortable: true,
        },
        {
            name: 'Shift',
            selector: row => row.Shift,
            sortable: true,
        },
    ];

    async function allSearch(){
        const data = await getDocs(dbM);
        setSchedule(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    async function setFilter(){
        console.log(shift)
        const q = query(dbM,where("Shift","==",shift))
        const data = await getDocs(q);
        setSchedule(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }
  return (
    <div>
      <Navbar/>
        <div className="max-w-screen min-h-screen relative shadow-md sm:rounded-lg p-8 ml-[270px]">
            <div className="filter flex justify-around">
            <button onClick={allSearch} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                All Shift
            </button>
            <select type='text' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-1/4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                    SetShift(Number(event.target.value));
                }}>
                    <option value="-">-</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    
                </select>

                <button onClick={setFilter} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                Selected Shift
                </button>
            </div>
            
            
            <DataTable
                columns={columns}
                data={schedule}
                pagination
            />
        </div>
    </div>
  )
}

export default ManagerViewSchedule
