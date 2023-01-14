import React from 'react'
import { db } from '../../database/firebase-Config'
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc} from "firebase/firestore"
import { Link } from 'react-router-dom';
import Navbar from '../../navbar';
const RequestPersonalLeave = () => {
    // const [Employees,setEmployee] = useState([]);
    const [type,setType]= useState("");
    const [comment,setComment] = useState("");
    const employeeId = sessionStorage.getItem("userId");
    
    const userEmail = sessionStorage.getItem("userEmail")
    const userJob = sessionStorage.getItem("userJob");
    const userName = sessionStorage.getItem("username");
    const userStartTime = sessionStorage.getItem("userStartTime");
    const userEndTime = sessionStorage.getItem("userEndTime");
    const DBPL = collection(db,"PersonalLeave")

    const addPersonalLeave = async(id,name,job,email) =>{
        await addDoc(DBPL, {
            employeeId : employeeId,
            name: userName,
            job : userJob,
            email : userEmail,
            type: type,
            comment: comment,
            status: "none"
        })
        window.location.reload();
    }

  return (
         <div className="min-w-full container flex flex-row">
            <Navbar/>
            <div className="w-screen min-h-screen relative shadow-md sm:rounded-lg  margin ml-[270px]">
        <div className="form-input min-h-screen flex flex-col justify-center items-center">
        <div class="mb-6 w-1/2">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Personal Leave Type</label>
                <select type='text' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                  setType(event.target.value);
                }}>
                    <option value="-">-</option>
                    <option value="Sakit">Sakit</option>
                    <option value="Cuti">Cuti</option>
                    <option value="Personal Leave">Personal Leave</option>
                </select>
            </div>

            
            <div class="mb-6 w-1/2">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Comment</label>
                <input type='text' name="" id="" cols="30" rows="10" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                  setComment(event.target.value);
                }}>
                
                </input>
            </div>

            <button onClick={addPersonalLeave} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-1/2">
                Submit
            </button>
        </div>
            
        </div>
        </div>
  )
}

export default RequestPersonalLeave
