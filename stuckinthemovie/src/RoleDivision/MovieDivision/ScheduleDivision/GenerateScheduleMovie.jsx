import React from 'react'
import "../../../index.css"
import { db } from '../../../database/firebase-Config';
import {useState,useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc} from "firebase/firestore"
import {createUserWithEmailAndPassword} from "firebase/auth";
import { useLocation} from "react-router-dom";
import Navbar from '../../../navbar';
import {v4} from 'uuid';
const AddMembership = () => {
    const movieId = useLocation().state?.movieId
    const movieName = useLocation().state?.movieName
    const [Schedule,setSchedule] = useState([])
    const [Studio,setStudio] = useState([])
    const [startDate,setStartDate] = useState(new Date())
    const [endDate,setEndDate] = useState(new Date())
    const DBM = collection(db,"ScheduleMovieHeader");
    const DBSMD = collection(db,"ScheduleMovieDetail");
    const DBS = collection(db,"Studio");


    useEffect(() => {
        const getRecruitment = async()=> {
          const data = await getDocs(DBM);
          setSchedule(data.docs.map((doc) => ({...doc.data(), id: doc.id})));

          const dataStudio = await getDocs(DBS);
          setStudio(dataStudio.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
    
        getRecruitment();
      }, []);

    const newSchedule = async() => {
        var diff = endDate.getTime() - startDate.getTime()
        var getDay = diff/(1000* 3600*24)
        var totalLoop = Math.round(1 + Math.random() *(7-1))
        for(let i =0;i<totalLoop;i++){
            while(true){
                let flag = 1
                var shift = Math.round(1 + Math.random() *(7-1)) 
                var studio = Math.round(0 + Math.random() *(2-0)) 
                var diffDay = Math.round(0 + Math.random() *(getDay-1))
                var studioId = Studio[studio].id
                var studioName = Studio[studio].StudioName
                var currentStartDate = new Date(JSON.parse(JSON.stringify(startDate)))
                var test = new Date(currentStartDate.setDate(currentStartDate.getDate() + diffDay))
                Schedule.map(e =>{
                    if(e.shift == shift && e.Date.toLocaleDateString("en-US") == test.toLocaleDateString("en-US") && e.StudioId == studioId) flag = 0
                })

                if(flag == 1){
                    const id = v4()
                    await addDoc(DBM,{
                        SchedulId: id,
                        MovieId: movieId,
                        MovieName: movieName,
                        StudioId: studioId,
                        StudioName: studioName,
                        Date : test,
                        Shift: shift,

                    })

                    for(let i =0;i<45;i++){
                        await addDoc(DBSMD,{
                            ScheduleId: id,
                            Seat: i,
                            Status: "none"
                        })
                    }
                    break;
                }
            }
        }
        window.location.reload();
    }

  return (
    <div className="cotainer flex flex-row">
        <Navbar/>
      <div className="w-screen min-h-screen relative shadow-md sm:rounded-lg p-8 ml-[270px] flex flex-col justify-center items-center">

            <div class="mb-6 w-1/2">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Movie Name</label>
                <input value={movieName} readOnly type='text' name="" id="" cols="30" rows="10" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                </input>
            </div>

            <div class="mb-6 w-1/2">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Start Date</label>
                <input type='date' name="" id="" cols="30" rows="10" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                    setStartDate(new Date(event.target.value));
                }}>
                </input>
            </div>

            <div class="mb-6 w-1/2">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">End Date</label>
                <input type='date' name="" id="" cols="30" rows="10" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                    setEndDate(new Date(event.target.value));
                }}>
                </input>
            </div>

            <button onClick={newSchedule} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-1/2">
                Generate Schedule
            </button>
      </div>
    </div>
  )
}

export default AddMembership
