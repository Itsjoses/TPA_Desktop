import React, { useState } from 'react'
import Navbar from '../../navbar'
import "../../index.css"
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc} from "firebase/firestore"
import { db } from '../../database/firebase-Config'
import { useLocation} from "react-router-dom";

const RequestDepartmentFund = (props) => {
  const [price,setPrice] = useState(1);
  const [comment,setComment] = useState("");
  const employeeid = sessionStorage.getItem("userId");
  const employeejob = sessionStorage.getItem("userJob");
  const dbFUnd = collection(db,"FundRequest");
  const addFundRequest = async() => {
    await addDoc(dbFUnd,{
      employeeid: employeeid,
      employeejob: employeejob,
      price: Number(price),
      comment: comment,
      status: "none"
    })
  }
  return (
    <div className="min-w-full cotainer flex flex-row">
      <Navbar/>
      <div className="w-screen min-h-screen relative shadow-md sm:rounded-lg  margin ml-[270px]">
        <div className="form-input min-h-screen flex flex-col justify-center items-center">
            <div class="mb-6 w-1/2">
                <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 ">Price</label>
                <input type="number" id="large-input" class="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                  setPrice(event.target.value);
                }}/>
            </div>

            
            <div class="mb-6 w-1/2">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Comment</label>
                <input type='text' name="" id="" cols="30" rows="10" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                  setComment(event.target.value);
                }}>
                
                </input>
            </div>

            <button onClick={addFundRequest} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-1/2">
                Submit
            </button>
        </div>
            
        </div>
    </div>
  )
}

export default RequestDepartmentFund
