import React from 'react'
import "../../../index.css"
import { db } from '../../../database/firebase-Config';
import {useState,useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc} from "firebase/firestore"
import {createUserWithEmailAndPassword} from "firebase/auth";

import Navbar from '../../../navbar';

const AddAdvertising = () => {
    const [partnerName,setPartnerName] = useState("");
    const [partnerEmail,setPartnerEmail] = useState(" ");
    const [partnerPhoneNumber,setPartnerPhoneNumber] = useState("");
    const [partnerDetail,setPartnerDetail] = useState("");
    const DBP = collection(db,"Partner");

    const newAdvertising = async() => {
        await addDoc(DBP,{
            partnerName : partnerName,
            partnerEmail : partnerEmail,
            partnerPhoneNumber : partnerPhoneNumber,
            partnerDetail : partnerDetail,
            status: "Active"
        })
        window.location.reload();
    }

  return (
    <div className="cotainer flex flex-row">
        <Navbar/>
      <div className="w-screen min-h-screen relative shadow-md sm:rounded-lg p-8 ml-[270px] flex flex-col justify-center items-center">

            <div class="mb-6 w-1/2">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Partner Name</label>
                <input type='text' name="" id="" cols="30" rows="10" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                    setPartnerName(event.target.value);
                }}>
                </input>
            </div>

            
            <div class="mb-6 w-1/2">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                <input type='text' name="" id="" cols="30" rows="10" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                    setPartnerEmail(event.target.value);
                }}>
                </input>
            </div>

            <div class="mb-6 w-1/2">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Phone Number</label>
                <input type='text' name="" id="" cols="30" rows="10" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                    setPartnerPhoneNumber(event.target.value);
                }}>
                </input>
            </div>

            <div class="mb-6 w-1/2">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Partner Detail</label>
                <input type='text' name="" id="" cols="30" rows="10" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                    setPartnerDetail(event.target.value);
                }}>
                </input>
            </div>

            <button onClick={newAdvertising} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-1/2">
                Add Partner
            </button>
      </div>
    </div>
  )
}

export default AddAdvertising
