import React from 'react'
import { db } from '../../database/firebase-Config';
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc, updateDoc,query,where} from "firebase/firestore"
import DataTable from 'react-data-table-component';
import Navbar from '../../navbar';
import { Link , useNavigate } from 'react-router-dom';

const AddOrder = () => {
    const [order, setOrder] = useState([]);
    const [quantity,setQuantity] = useState(0)
    const [asd,setsd] = useState("Asd")
    const [cart,setCart] = useState([])
    const [totalPrice,setTotalPrice] = useState(0)
    const Navigate = useNavigate()
    // var total = 0
    // let cart = []; 
    const dbS =  collection(db,"Supply")
    useEffect(() => {
        const getdata = async()=> {
          const data = await getDocs(dbS);
          setOrder(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
    
        getdata();
      }, []);

      const submitToCart = async(id,name) =>{
        var currentTotal = 0
        const supplyDoc = doc(db,"Supply",id);
        const supplysnap = await getDoc(supplyDoc);
        currentTotal = quantity * supplysnap.data().supplyPrice
        setCart(current => [...current, {
          supplyId : id,
          supplyName: name,
          quantity : quantity,
          currentTotal: currentTotal
        }])
        setTotalPrice(totalPrice + currentTotal)
      }

      const viewCart = () =>{
        Navigate('/Cafe/ViewCart', {asd: "asd"})
      }

      const columns = [
        {
            name: 'Name',
            selector: row => row.supplyName,
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => row.supplyPrice,
            sortable: true,
        },
        {
            name: 'Quantity',
            selector: row => row.supplyQuantity,
            sortable: true,
        },
        {
          name: 'Quantity',
          cell: row=>{
            return (
                <input type="number" id='total' onChange={(event) => {
                  setQuantity(event.target.value);
              }}
                className='mx-3 block w-full border bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
            )
          }
          
        },
        {
          name: 'Action',
          cell: row=>{
            return (
              
                <button class="mx-3 bg-blue-500 hover:bg-blue-700 text-white font-bold block w-full p-2.5 border border-blue-700 rounded-lg" 
                onClick={() => submitToCart(row.id,row.supplyName)}>Submit</button>
                
            )
          }
        },
    ];

    // const test = () =>{
    //   data.push({
    //     name: "barang Mewah",
    //     quantity: 2
    //   })
    // }

    // const minus = () =>{
    //   let dataquantity = document.getElementById("total");
    //   var i = parseInt(dataquantity.value)
    //   if(i == 0){

    //   }else{
    //     i -= 1;
    //     dataquantity.value = i;
    //   }
    

    // const plus = () =>{
    //   let dataquantity = document.getElementById("total");
    //   var i = parseInt(dataquantity.value)
    //   i++;
    //   dataquantity.value = i;
    //   console.log(i)
    //   // data.map(e => {
    //   //   e.quantity -= 1;
    //   //   if(e.quantity == 0){
    //   //     data.splice(index,1);
    //   //   }
    //   // })
    // }

    const output = () =>{
      // console.log(cart)
      console.log(cart)
    }
    // const minus = () =>{
    //   data.filter(() => {
    //     if(data.name == test){
    //       data.quantity -= 1;
    //     }
    //   })
    //   console.log(data)
    // }

  return (
    <div>
      {/* <button onClick={test}>asdasd</button><br />
      <button onClick={plus}>+</button> <br />
      <button onClick={output}>output</button><br /> */}
      {/* <button onClick={minus}>-</button> */}
      <Navbar/>
        <div className="max-w-screen min-h-screen relative shadow-md sm:rounded-lg p-8 ml-[270px]">
            <DataTable
                columns={columns}
                data={order}
                pagination
            />
            <button class="mx-3 bg-blue-500 hover:bg-blue-700 text-white font-bold block w-full p-2.5 border border-blue-700 rounded-lg">
              <Link to="/Cafe/ViewCart" state={{cart: cart,totalPrice : totalPrice}} >ViewCart</Link></button>
        </div>
    </div>
  )
}

export default AddOrder
