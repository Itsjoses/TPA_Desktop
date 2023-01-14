import React from 'react'
import { db } from '../../../database/firebase-Config';
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc, updateDoc,query,where,Timestamp} from "firebase/firestore"
import DataTable from 'react-data-table-component';
import Navbar from '../../../navbar';
import QRCode from 'qrcode.react';
import {v4} from 'uuid';
import { useLocation} from "react-router-dom";
import { Link , useNavigate } from 'react-router-dom';

const ViewMovieCart= () => {
    const [cart, setCart] = useState([]);
    const [membership,setMembership] = useState("")
    const [voucher,setVoucher] = useState("")
    const [payment,setPayment] = useState("")
    const arr = useLocation().state?.cart
    const totalPrice = useLocation().state?.totalPrice
    // const seatid = useLocation().state?.id
    const ScheduleId = useLocation().state?.ScheduleId
    const StudioId = useLocation().state?.StudioId
    const dbMH = collection(db,"OrderMovieHeader")
    const dbMD = collection(db,"OrderMovieDetail")
    const Navigate = useNavigate()
    // console.log(seatid);
    useEffect(() => {
            setCart(arr.map((e) => ({...e})));
    },[])

    const columns = [
        {
            name: 'Seat',
            selector: row => row.Seat,
            sortable: true,
        },
        {
            name: 'Price',
            cell: row =>{
                return (
                    <p>Rp. 50000</p>
                )
            },
            sortable: true,
        },
    ];

    const commitTransaction = async() =>{
        let totalPricevalid = totalPrice
        if(membership != ""){
            const membershipDoc = doc(db,"Membership",membership);
            const getSnapMemberhsip = await getDoc(membershipDoc)
            await updateDoc(membershipDoc,{
                point: Number(getSnapMemberhsip.data().point + 5)
            })
        }

        if(voucher != ""){
            const docpro = query(collection(db,"MemberVoucher"),where("voucherId","==",voucher));
            const arrayallvou = await getDocs(docpro);
            const getarrayvoucher = arrayallvou.docs.map((doc) => ({...doc.data(),id: doc.id}))
            const singlevoucher = doc(db,"Promo",voucher)
            const getsinglevoucher = await getDoc(singlevoucher);
            
            getarrayvoucher.map(async e => {
                console.log(e.MembershipId)
                if(e.MembershipId == membership && e.Status == "Available" && getsinglevoucher.data().department == "Movie"){
                    const docsingle = doc(db,"MemberVoucher",e.id)
                    
                    totalPricevalid -= getsinglevoucher.data().decPrice
                    
                    if(totalPricevalid <= 0) totalPricevalid = 0
                    // await updateDoc(docsingle,{
                    //     Status: "Used"
                    // })
                    
                    
                }
            })
            console.log(totalPricevalid)
            
            
        }   
        const id = v4()
            await addDoc(dbMH,{
                ScheduleId: ScheduleId,
                StudioId : StudioId,
                price : totalPricevalid,
                payment : payment,
                date : Timestamp.now(),
            })
        cart.map(async e =>{
            await addDoc(dbMD,{
                ScheduleId: ScheduleId,
                Seat : e.Seat,
            })
            const qdoc = doc(db,"ScheduleMovieDetail",e.id);
            await updateDoc(qdoc,{Status: "Reserve"})
        })
        window.print()
        Navigate('/Movie/Front/ViewMovieSchedule')
        
    }

  return (
    <div>

      <Navbar/>
        <div className="max-w-screen min-h-screen relative shadow-md sm:rounded-lg p-8 ml-[270px]">
            <DataTable
                columns={columns}
                data={cart}
                pagination
            />

            <table>
                <tr>
                    <td>Total Price</td>
                    <td>{totalPrice}</td>
                </tr>
            </table>

            <div class="mb-6 w-full">
            <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Input Membership</label>
            <input type='text' name="" id="" cols="30" rows="10" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                    setMembership(event.target.value);
                }}></input>
            </div>

            <div class="mb-6 w-full">
            <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Input Voucher</label>
            <input type='text' name="" id="" cols="30" rows="10" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                    setVoucher(event.target.value);
                }}></input>
            </div>

            <div class="mb-6 w-full">
                <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ">Choose Payment</label>
                <select type='text' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                    setPayment(event.target.value);
                }}>
                    <option selected>-</option>
                    <option value="Cash">Cash</option>
                    <option value="Digital">Digital</option>
                </select>
            </div>

            
            <button class="mx-3 bg-blue-500 hover:bg-blue-700 text-white font-bold block w-full p-2.5 border border-blue-700 rounded-lg" 
            onClick={commitTransaction}>Commit Transaction</button>
        </div>
    </div>
  )
}

export default ViewMovieCart
