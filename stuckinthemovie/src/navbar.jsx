import React from 'react'
import './navbar.css';
import './color.css';
import { Link , useNavigate } from 'react-router-dom';
import { useEffect }from 'react'
import { signOut } from 'firebase/auth';
import { auth } from './database/firebase-Config';
const Navbar = () => {

const userEmail = sessionStorage.getItem("userEmail")
const userJob = sessionStorage.getItem("userJob");
const userName = sessionStorage.getItem("username");
const userStartTime = sessionStorage.getItem("userStartTime");
const userEndTime = sessionStorage.getItem("userEndTime");

const NavbarRole = () =>{
  const Navigate = useNavigate();

  const logout = async() =>{
    await signOut(auth);
    console.log("asd");
    Navigate('/logout')
  }

  const EmployeeNavbar = () =>{
    return(
      <p>
        <li><Link to='/RequestPersonalLeave'>RequestPersonalLeave</Link></li>
                <li><Link to='/RequestDepartmentFund'>RequestDepartmentFund</Link></li>
                {/* <li><Link to='/ViewEmployeeFundRequest'>ViewEmployeeFundRequest</Link></li> */}
                {/* <li><Link to='/EmployeeResignRequest'>EmployeeResignRequest</Link></li> */}
                <li><Link to='/RequestResign'>RequestResign</Link></li>
                {/* <li><Link to='/ViewRequest1FixandBrokeFNE'>ViewRequestFixandBrokeFNE</Link></li> */}
                <li><Link to='/RequestFixandBrokeFNE'>RequestFixandBrokeFNE</Link></li>
                {/* <li><Link to='/ViewEmployeeClock'>ViewEmployeeClock</Link></li> */}
                <li><Link to='/EmployeeClock'>EmployeeClock</Link></li>
                <li><Link to='/logout'>LogOut</Link></li>
      </p>
      
    )
    
  }

  if(userJob == "Manager"){
    return (
      <p>
        <li><Link to='/Manager/ViewRevenueNExpend'>ViewRevenueNExpend</Link></li>
        <li><Link to='/Manager/ViewFNE'>ViewFNE</Link></li>
        <li><Link to='/Manager/ManagerViewSchedule'>ManagerViewSchedule</Link></li>
        <li><Link to='/Manager/ManagerViewEmployee'>ManagerViewEmployee</Link></li>
        <li><Link to='/Manager/ViewMembership'>ViewMembership</Link></li>
        <li><Link to='/Manager/EmployeeResignUpdate'>UpdateResignRequest</Link></li>
        {/* <li><Link to='/Manager/AbsentApproval'>AbsentApproval</Link></li> */}
        <li><Link to='/Manager/ApprovalSalaryAdjusment'>ApprovalSalaryAdjusment</Link></li>
        <li><Link to='/Manager/WarningLetterUpdate'>WarningLetterUpdate</Link></li>
        {EmployeeNavbar()}
      </p>
    )
  }else if(userJob === "HRD"){
    return (
      <div className="div">
        <li><Link to='/HRD/SubmitWarningLetter' >SubmitWarningLetter</Link></li>
        <li><Link to='/HRD/SetWorkingTime'>SetWorkingTime</Link></li>
        <li><Link to='/HRD/ViewPersonalInformation' >ViewPersonalInformation</Link></li>
        <li><Link to='/HRD/AddEmployee' >AddEmployee</Link></li>
        <li><Link to='/HRD/AddSalaryAdjusment' >AddSalaryAdjusment</Link></li>
        <li><Link to='/HRD/AbsentApproval' >AbsentApproval</Link></li>
        {EmployeeNavbar()}
      </div>
    )
  }else if(userJob == "Storage"){
    return (
      <div className="div">
        <li><Link to='/Storage/ViewDepartmentFundRequest'> ViewDepartmentFundRequest</Link></li>
        <li><Link to='/Storage/AddnewfacilitiesNequipments'>AddnewfacilitiesNequipments </Link></li>
        <li><Link to='/Storage/ViewfacilitiesNequipments'>ViewfacilitiesNequipments</Link></li>
        <li><Link to='/Storage/ApprovalFixandBrokenFNE'>ApprovalFixandBrokenFNE</Link></li>
        {EmployeeNavbar()}
      </div>
    )
  }else if(userJob == "Accounting"){
    return (
      <div className="div">
        <li><Link to='/Accounting/FundRequest'>FundRequest</Link></li>
        <li><Link to='/Accounting/ViewPurchaseReport'>ViewPurchaseReport</Link></li>
        <li><Link to='/Accounting/ApprovalSalaryAdjusment'>ApprovalSalaryAdjusment</Link></li>
      {EmployeeNavbar()}
      </div>
    )
  }else if(userJob == "Movie"){
    return (
      <div className="div">
        <li><Link to='/External/ViewExternalReport'>ViewExternalReport</Link></li>
        <li><Link to='/External/ExternalReport'>ExternalReport</Link></li>
        <li><Link to='/External/Movie/AddMovie'>AddMovie</Link></li>
        <li><Link to='/External/Movie/ViewMovie'>ViewMovie</Link></li>
        <li><Link to='/External/Movie/MovieReport'>MovieReport</Link></li>
        {EmployeeNavbar()}
      </div>
    )
  }else if(userJob == "Advertising"){
    return (
      <div className="div">
        <li><Link to='/External/ViewExternalReport'>ViewExternalReport</Link></li>
        <li><Link to='/External/ExternalReport'>ExternalReport</Link></li>
        <li><Link to='/External/Advertising/AddAdvertising' >AddAdvertising</Link></li>
        <li><Link to='/External/Advertising/ViewAdvertising'>ViewAdvertising</Link></li>
        {EmployeeNavbar()}
      </div>
    )
  }else if(userJob == "Supply"){
    return (
      <div className="div">
        <li><Link to='/External/ViewExternalReport'>ViewExternalReport</Link></li>
        <li><Link to='/External/ExternalReport'>ExternalReport</Link></li>
        <li><Link to='/External/Supply/AddSupply'>AddSupply</Link></li>
        <li><Link to='/External/Supply/ViewSupply'>ViewSupply</Link></li>
        {EmployeeNavbar()}
      </div>
    )
  }else if(userJob == "CafeFront"){
    return (
      <div className="div">
        <li><Link to='/Cafe/AddOrder'>AddOrder</Link></li>
        {/* <li><Link to='/Cafe/ViewCart'>ViewCart</Link></li> */}
        <li><Link to='/Cafe/AddMembership'>AddMembership</Link></li>
        <li><Link to='/Cafe/AddMembership'>AddMembership</Link></li>
        {EmployeeNavbar()}
      </div>
    )
  }else if(userJob == "Kitchen"){
    return(
      <div className="div">
      <li><Link to='/Cafe/CookOrder'>CookOrder</Link></li>
      {EmployeeNavbar()}
      </div>
    )
      
  }else if(userJob == "PromoEvent"){
    return (
      <div className="div">
      <li><Link to='/PromoEvent/AddPromo'>AddPromo</Link></li>
      <li><Link to='/PromoEvent/AddEvent' >AddEvent</Link></li>
      <li><Link to='/PromoEvent/ViewPromo' >ViewPromo</Link></li>
      <li><Link to='/PromoEvent/ViewEvent' >ViewEvent</Link></li>
      <li><Link to='/PromoEvent/ViewMembership' >ViewMembership</Link></li>
      {EmployeeNavbar()}
      </div>
    )
  }else if(userJob == "MovieFront"){
    return (
      <div className="div">
        <li><Link to='/Movie/Front/AddMembership' >AddMembership</Link></li>
        <li><Link to='/Movie/Front/ViewMovieSchedule' >ViewMovieSchedule</Link></li>
        {/* <li><Link to='/Movie/Front/AddMovieOrder'>AddMovieOrder</Link></li> */}
        {/* <li><Link to='/Movie/Front/ViewMovieCart'>ViewMovieCart</Link></li> */}
        {EmployeeNavbar()}
      </div>
    )
  }else if(userJob == "Schedule"){
    return (
      <div className="div">
        <li><Link to='/Schedule/ScheduleMovieView'>ScheduleMovieView</Link></li>
        <li><Link to='/Schedule/GenerateScheduleMovie'>GenerateScheduleMovie</Link></li>
        <li><Link to='/Schedule/ViewSchedule'>ViewSchedule</Link></li>
        {EmployeeNavbar()}
      </div>
    )
  }else if(userJob == "Operation"){
    return (
      <div className="div">
        <li><Link to='/Operation/RunningSchedule'>RunningSchedule</Link></li>
        {EmployeeNavbar()}
      </div>
    )
  }
  else if(userJob == "Admin"){
    console.log("asd");
    return(
      <div className="div">
        <li><Link to='/Admin/ResetPassword'>Reset Password</Link></li>
        {EmployeeNavbar()}
      </div>
    )
    
  }
  
}
  return (
    <div>
      <div class="aside">
            <div class="logo">
            <Link to="/home" ><span>S</span>tuck In The Movie</Link>
            </div>
            <div>
            <ul class="nav">
                {NavbarRole()}

                {/* Manager */}
                
                 {/* <Link to='/Manager/ViewExpend' ={<ViewExpend/>}/> */}

                {/* Storage */}
                
          
                {/* Accounting */}
                
                {/* HRD */}
                

                {/* External*/}
                

                {/* Movie */}
                
                
                {/* Advertising */}
                

                {/* Supply */}
                

                {/* Cafe*/}
                

                {/* Kitchen */}
                

                {/* PromoEvent*/}
                

                {/* Front */}
                

                {/* Schedule */}
                        
                
                
                
            </ul> 
            </div>
            
        </div>
    </div>
  )
}

export default Navbar
