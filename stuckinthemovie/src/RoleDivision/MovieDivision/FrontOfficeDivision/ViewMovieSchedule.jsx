import React from 'react'
import { db } from '../../../database/firebase-Config';
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc, updateDoc,query,where} from "firebase/firestore"
import DataTable from 'react-data-table-component';
import Navbar from '../../../navbar';
import { Link , useNavigate } from 'react-router-dom';

const ViewMovieSchedule = () => {
    const [schedule, setSchedule] = useState([]);
    const [shift,SetShift] = useState(0);
    const [movieName,SetMovieName] = useState("");
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
        {
            name: 'Action',
            cell: row =>{
                return(
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-1/2">
                    <Link to="/Movie/Front/AddMovieOrder" state={{ScheduleId: row.SchedulId,StudioId: row.StudioId,MovieId: row.MovieId}}>AddOrder</Link>
                </button>
                )
            }
        },
    ];

    async function allSearch(){
        const data = await getDocs(dbM);
        setSchedule(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    async function setFilter(){
        console.log(shift)
        const q = query(dbM,where("MovieName","==",movieName))
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
                <input type="text" id='total' onChange={(event) => {
                  SetMovieName(event.target.value);
                }}
                className='mx-3 block w-1/4 border bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                <button onClick={setFilter} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                Submit
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

export default ViewMovieSchedule
