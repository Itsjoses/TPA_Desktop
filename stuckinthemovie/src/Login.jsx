import React from 'react'
import {useState} from 'react'
import './css/Login/login.css'
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from "firebase/auth";
import { Link , useNavigate } from 'react-router-dom';
import {auth} from "../src/database/firebase-Config";
import { db } from '../src/database/firebase-Config';
import { collection, deleteDoc, doc, addDoc, getDocs, getDoc,query,where} from "firebase/firestore"
const Login = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({});
    const Navigate = useNavigate()
    

    // const register = async() =>{
    //   try {
    //     const user = await createUserWithEmailAndPassword(auth, registerEmail,registerPassword);
    //     console.log(user)
    //     onAuthStateChanged(auth, (currentUser) =>{
    //       setUser(currentUser)
    //     })
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // }

    const login = async() =>{
      try {
        const user = await signInWithEmailAndPassword(auth, loginEmail,loginPassword);

        console.log(user)
        const q = query(collection(db,"Employee"),where("email","==",loginEmail));
        const snapq = await getDocs(q);
        const q1 = snapq.docs.map((doc) => ({...doc.data(), id: doc.id}));
        sessionStorage.setItem("userEmail",q1[0].email);
        sessionStorage.setItem("username",q1[0].name);
        sessionStorage.setItem("userStartTime",q1[0].startTime);
        sessionStorage.setItem("userEndTime",q1[0].endTime);
        sessionStorage.setItem("userJob",q1[0].job);  
        sessionStorage.setItem("userId",q1[0].id);
        Navigate('/home')
      } catch (error) {
        console.log(error.message);
      }
    }

    

  return (
    <div className='container-login'>
      <div className="form">
            <h1 className='title'>Login User</h1>
            <div class="form-input">
              <input type="email" placeholder='Email' 
              onChange={(e) => {setLoginEmail(e.target.value)}
              }/>
            </div>
            <div className="form-input">
              <input type="password" placeholder='Password'  className=' w-full'
              onChange={(e) => {setLoginPassword(e.target.value)}
              }/>
            </div>
            <button onClick={login} className='submit-button'>Login</button>
      </div>
          
            
        

    </div>
  )
}

export default Login
