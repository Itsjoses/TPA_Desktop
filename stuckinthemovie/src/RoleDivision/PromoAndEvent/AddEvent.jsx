import React from 'react'
import { db } from '../../database/firebase-Config';
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc, updateDoc,query,where} from "firebase/firestore"
import DataTable from 'react-data-table-component';
import Navbar from '../../navbar';

const AddEvent = () => {
    const [name, setName] = useState("");
    const [description, setdescription] = useState("");
    const [startDate, setstartDate] = useState(new Date());
    const [endDate, setendDate] = useState(new Date());
    const dbE =  collection(db,"Event")

      const newEvent = async() =>{
        await addDoc(dbE,{
            name: name,
            description: description,
            startDate: startDate,
            endDate: endDate,
        })
        window.location.reload();
      }

  return (
    <div className="cotainer flex flex-row">
        <Navbar/>
      <div className="w-screen min-h-screen relative shadow-md sm:rounded-lg p-8 ml-[270px] flex flex-col justify-center items-center">

            <div class="mb-6 w-1/2">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Promo Name</label>
                <input type='text' name="" id="" cols="30" rows="10" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                    setName(event.target.value);
                }}>
                </input>
            </div>

            <div class="mb-6 w-1/2">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Promo Description</label>
                <input type='text' name="" id="" cols="30" rows="10" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                    setdescription(event.target.value);
                }}>
                </input>
            </div>

            <div class="mb-6 w-1/2">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">StartDate</label>
                <input type='date' name="" id="" cols="30" rows="10" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                    setstartDate(event.target.value);
                }}>
                </input>
            </div>

            <div class="mb-6 w-1/2">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">EndDate</label>
                <input type='date' name="" id="" cols="30" rows="10" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                    setendDate(event.target.value);
                }}>
                </input>
            </div>

            <button onClick={newEvent} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-1/2">
                Add Event
            </button>
      </div>
    </div>
  )
}

export default AddEvent
