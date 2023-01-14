import React from 'react'
import { db } from '../../../database/firebase-Config';
import {useState, useEffect} from 'react'
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc, updateDoc,query,where, orderBy} from "firebase/firestore"
import DataTable from 'react-data-table-component';
import Navbar from '../../../navbar';
import { Link , useNavigate } from 'react-router-dom';
import { useLocation} from "react-router-dom";

const AddMovieOrder = () => {
    const [seat, setSeat] = useState([]);
    const ScheduleId = useLocation().state?.ScheduleId
    const StudioId = useLocation().state?.StudioId
    const MovieId = useLocation().state?.MovieId
    const [cart,setCart] = useState([])
    const [totalPrice,setTotalPrice] = useState(0)
    const dbM = collection(db,"ScheduleMovieDetail");


    useEffect(() => {

        const getData = async()=> {
          const q = query(dbM,where("ScheduleId","==",ScheduleId));
          const qo = query(q)
          const data = await getDocs(q);
          // data.data().sort(data.data().Seat);
          // console.log(data.data());
          setSeat(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
    
        getData();
      }, []);

      const addCart = async(status,seat,id) =>{
        document.getElementById(id).style.backgroundColor = "red";

        setCart(current => [...current, {
            id: id,
            ScheduleId: ScheduleId,
            Seat: seat,
          }])
          setTotalPrice(totalPrice + 50000)
      }

      // const buttonReturn = (status,seat) => {
      //   if(status == "none"){
      //     return(
      //     <button onClick={addCart(status,seat)} class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-1/2">
      //         Reserve
      //     </button>
      //     )
      //   }
        
      // }

      const columns = [
        {
            name: 'Seat Number',
            selector: row => row.Seat,
            sortable: true,
        },
        {
            name: 'Action',
            cell: row =>{
              if(row.Status == "none"){
                return(
                  <button id={row.id} onClick={() => addCart(row.Status,row.Seat,row.id)} class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-1/2">
                      Reserve
                  </button>
                  )
              }
              else{
                return(
                
                  <button onClick={() => addCart(row.Status,row.Seat,row.id)} class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-1/2">
                      Reserve
                  </button>
                  )
              }
              
            }
        },
    ];
  return (
    <div>
      <Navbar/>
        <div className="max-w-screen min-h-screen relative shadow-md sm:rounded-lg p-8 ml-[270px]">            
            <DataTable
                columns={columns}
                data={seat}
                pagination
            />
            <button class="mx-3 bg-blue-500 hover:bg-blue-700 text-white font-bold block w-full p-2.5 border border-blue-700 rounded-lg">
              <Link to="/Movie/Front/ViewMovieCart" state={{cart: cart,totalPrice : totalPrice,ScheduleId: ScheduleId,StudioId: StudioId}} >ViewCart</Link></button>
        </div>
    </div>
  )
}

export default AddMovieOrder
