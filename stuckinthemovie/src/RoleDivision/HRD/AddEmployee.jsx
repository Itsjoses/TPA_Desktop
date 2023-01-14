import React from 'react'
import { db } from '../../database/firebase-Config'
import {useState,useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc} from "firebase/firestore"
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../database/firebase-Config"
import Navbar from '../../navbar'

const AddEmployee = () => {
    const [name,setName] = useState("");
    const [age,setAge] = useState(1);
    const [job,setJob] = useState("");
    const [email,setEmail] = useState("");
    const [numberPhone,setNumberPhone] = useState("");
    const [salary,setSalary] = useState(1);
    const DBE = collection(db,"Employee");

    const newEmployee = async() => {
        
        await addDoc(DBE,{
            name: name,
            age: age,
            job : job,
            email : email,
            numberPhone :numberPhone,
            startTime : Number(0),
            endTime : Number(0),
            warningLetter : Number(0),
            salary : Number(salary),
            status : "Active"
        })

        try {
            await createUserWithEmailAndPassword(auth, email,"Default123");
        } catch (error) {
              console.log(error.message);
        }
        window.location.reload();
    }


  return (
    <div className="cotainer flex flex-row">
      <Navbar/>
      <div className="w-screen min-h-screen relative shadow-md sm:rounded-lg p-8 ml-[270px] flex flex-col justify-center items-center">

            <div class="mb-6 w-1/2">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                <input type='text' name="" id="" cols="30" rows="10" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                    setName(event.target.value);
                }}>
                </input>
            </div>

            
            <div class="mb-6 w-1/2">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Age</label>
                <input type='number' name="" id="" cols="30" rows="10" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                    setAge(event.target.value);
                }}>
                </input>
            </div>

            <div class="mb-6 w-1/2">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Job</label>
                <select type='text' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                    setJob(event.target.value);
                }}>
                    <option value="-">-</option>
                    <option value="Manager">Manager</option>
                    <option value="HRD">HRD</option>
                    <option value="Accounting">Accounting</option>
                    <option value="Storage">Storage</option>
                    <option value="Movie">External Movie</option>
                    <option value="Advertising">External Advertising</option>
                    <option value="Supply">External Supply</option>
                    <option value="CafeFront">CafeFrontOffice</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="PromoEvent">PromotionAndEvent</option>
                    <option value="MovieFront">MovieFrontOffice</option>
                    <option value="Schedule">Schedule</option>
                    <option value="Operation">Operation</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>

            <div class="mb-6 w-1/2">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">email</label>
                <input type='email' name="" id="" cols="30" rows="10" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                    setEmail(event.target.value);
                }}>
                </input>
            </div>

            <div class="mb-6 w-1/2">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Number Phone</label>
                <input type='text' name="" id="" cols="30" rows="10" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                    setNumberPhone(event.target.value);
                }}>
                </input>
            </div>

            <div class="mb-6 w-1/2">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Salary</label>
                <input type='number' name="" id="" cols="30" rows="10" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                    setSalary(event.target.value);
                }}>
                </input>
            </div>

            <button onClick={newEmployee} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-1/2">
                Add Employee
            </button>
      </div>
    </div>
  )
}

export default AddEmployee
