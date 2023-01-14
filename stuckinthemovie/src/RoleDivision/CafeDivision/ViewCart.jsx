import React from 'react'
import { db } from '../../database/firebase-Config';
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc, updateDoc,query,where,Timestamp} from "firebase/firestore"
import DataTable from 'react-data-table-component';
import Navbar from '../../navbar';
import QRCode from 'qrcode.react';
import {v4} from 'uuid';
import { useLocation} from "react-router-dom";
import { Link , useNavigate } from 'react-router-dom';

const ViewCart= () => {
    const [cart, setCart] = useState([]);
    const [membership,setMembership] = useState("")
    const [voucher,setVoucher] = useState("")
    const [payment,setPayment] = useState("")

    const arr = useLocation().state?.cart
    var totalPrice = useLocation().state?.totalPrice
    const dbTH = collection(db,"TransactionHeader")
    const dbTD = collection(db,"TransactionDetail")
    const dbK = collection(db,"Kitchen")
    const Navigate = useNavigate()
    useEffect(() => {
            setCart(arr.map((e) => ({...e})));
            console.log(totalPrice)
    },[])

    const columns = [
        {
            name: 'Supply Name',
            selector: row => row.supplyName,
            sortable: true,
        },
        {
            name: 'Quantity',
            selector: row => row.quantity,
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => row.currentTotal,
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
                
                if(e.MembershipId == membership && e.Status == "Available" && getsinglevoucher.data().department == "Cafe"){
                    const docsingle = doc(db,"MemberVoucher",e.id)
                    
                    totalPricevalid -= getsinglevoucher.data().decPrice
                    if(totalPricevalid <= 0) totalPricevalid = 0
                    await updateDoc(docsingle,{
                        Status: "Used"
                    })
                    
                    
                }
            })
        }

        
        const id = v4()
        await addDoc(dbTH,{
            transactionId : id,
            price : totalPricevalid,
            date : Timestamp.now(),
            payment : payment
        })

        

        await addDoc(dbK,{
            transactionId : id,
            price : totalPricevalid,
            status: "NotDone"
        })
        
        cart.map(async e =>{
            await addDoc(dbTD,{
                transactionId : id,
                supplyId : e.supplyId,
                supplyName: e.supplyName,
                quantity : e.quantity
            })

            const supplyDoc = doc(db,"Supply",e.supplyId);
            const getSnap = await getDoc(supplyDoc)
            await updateDoc(supplyDoc,{
                supplyQuantity: getSnap.data().supplyQuantity - e.quantity
            })
        })
        window.print()
        Navigate('/Cafe/AddOrder')
        
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

export default ViewCart
