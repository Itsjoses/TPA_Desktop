import React, { useState } from 'react'
import Navbar from '../../navbar'
import "../../index.css"
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc} from "firebase/firestore"
import { db } from '../../database/firebase-Config'
import { useLocation} from "react-router-dom";

const EmployeeClock = () => {
    const startTime = sessionStorage.getItem("userStartTime");
    const endTime = sessionStorage.getItem("userEndTime");
    console.log(endTime)
  return (
    <div className="">
        <Navbar/>
        <div class="ml-[270px] min-w-screen min-h-screen flex  justify-center relative">
    <div class="text-gray-100">
        
        <div class="text-6xl text-center flex flex-col min-h-[80vh] justify-around">
        <h1 class="text-3xl text-gray-500   text-center m-5">Your Working Time</h1>
            <div className="flex w-full">
                <div class="w-24 mx-1 p-2 bg-gray-500 text-white rounded-lg">
                    <div class="font-mono leading-none" x-text="hours">{startTime}</div>
                    <div class="font-mono uppercase text-sm leading-none">Hours</div>
                </div>
                <div class="w-24 mx-1 p-2 bg-gray-500 text-white rounded-lg">
                    <div class="font-mono leading-none" x-text="minutes">00</div>
                    <div class="font-mono uppercase text-sm leading-none">Minutes</div>
                </div>
                <div class="w-24 mx-1 p-2 bg-gray-500 text-white rounded-lg">
                    <div class="font-mono leading-none" x-text="seconds">00</div>
                    <div class="font-mono uppercase text-sm leading-none">Seconds</div>
                </div>
            </div>
            <h1 class="text-3xl text-gray-500 text-center mb-3 ">To</h1>
            <div className="flex w-full">
                <div class="w-24 mx-1 p-2 bg-gray-500 text-white rounded-lg">
                    <div class="font-mono leading-none" x-text="hours">{endTime}</div>
                    <div class="font-mono uppercase text-sm leading-none">Hours</div>
                </div>
                <div class="w-24 mx-1 p-2 bg-gray-500 text-white rounded-lg">
                    <div class="font-mono leading-none" x-text="minutes">00</div>
                    <div class="font-mono uppercase text-sm leading-none">Minutes</div>
                </div>
                <div class="w-24 mx-1 p-2 bg-gray-500 text-white rounded-lg">
                    <div class="font-mono leading-none" x-text="seconds">00</div>
                    <div class="font-mono uppercase text-sm leading-none">Seconds</div>
                </div>
            </div>
            
        </div>
    </div>
    </div>
    </div>
    
  )
}

export default EmployeeClock
