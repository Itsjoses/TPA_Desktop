import React from 'react'
import { db } from '../../database/firebase-Config';
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc, updateDoc,query,where} from "firebase/firestore"
import DataTable from 'react-data-table-component';
import Navbar from '../../navbar';

const ExternalReport = () => {
    const [department, setDepartment] = useState("");
    const [comment, setComment] = useState("");
    const dbEX =  collection(db,"ExternalRecord")

    const newExternalRecord = async() =>{
        await addDoc(dbEX,{
            department: department,
            comment: comment,
            date: new Date(),
            status: "NotDone"
        })
        window.location.reload();
    }

  return (
    <div className="cotainer flex flex-row">
        <Navbar/>
      <div className="w-screen min-h-screen relative shadow-md sm:rounded-lg p-8 ml-[270px] flex flex-col justify-center items-center">

            <div class="mb-6 w-1/2">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Department</label>
                <select type='text' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                    setDepartment(event.target.value);
                }}>
                    <option value="-">-</option>
                    <option value="Movie">Movie</option>
                    <option value="Advertising">Advertising</option>
                    <option value="Supply">Supply</option>
                </select>
            </div>

            <div class="mb-6 w-1/2">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Comment</label>
                <textarea type='text' name="" id="" cols="30" rows="10" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                    setComment(event.target.value);
                }}>
                </textarea>
            </div>

            <button onClick={newExternalRecord} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-1/2">
                Add New Record
            </button>
      </div>
    </div>
  )
}

export default ExternalReport
