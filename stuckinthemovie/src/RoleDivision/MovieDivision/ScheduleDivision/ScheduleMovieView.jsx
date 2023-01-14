import React from 'react'
import { db } from '../../../database/firebase-Config';
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc, updateDoc,query,where} from "firebase/firestore"
import DataTable from 'react-data-table-component';
import Navbar from '../../../navbar';
import { Link , useNavigate } from 'react-router-dom';

const ScheduleMovieView = () => {
    const [movies, setMovie] = useState([]);

    const dbM = collection(db,"Movie");
    useEffect(() => {
        const getRecruitment = async()=> {
          const data = await getDocs(dbM);
          setMovie(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
    
        getRecruitment();
      }, []);

      const columns = [
        {
            name: 'Movie Name',
            selector: row => row.movieName,
            sortable: true,
        },
        {
            name: 'Movie Duration',
            selector: row => row.movieDuration,
            sortable: true,
        },
        {
            name: 'Date Release',
            selector: row => row.dateRelease,
            sortable: true,
        },
        {
            name: 'End Release',
            selector: row => row.endRelease,
            sortable: true,
        },
        {
          name: 'Action',
          cell : row=>{
            return (
              <button class="mx-3 bg-blue-500 hover:bg-blue-700 text-white font-bold block w-full p-2.5 border border-blue-700 rounded-lg" 
              ><Link to="/Schedule/GenerateScheduleMovie" state={{movieId: row.id,movieName: row.movieName}} >Generate Schedule</Link></button>
            )
          }
      },
    ];
  return (
    <div>
      <Navbar/>
        <div className="max-w-screen min-h-screen relative shadow-md sm:rounded-lg p-8 ml-[270px]">
            <DataTable
                columns={columns}
                data={movies}
                pagination
            />
        </div>
    </div>
  )
}

export default ScheduleMovieView
