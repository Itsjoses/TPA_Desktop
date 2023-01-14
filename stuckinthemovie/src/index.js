import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";

import './all-content.css';
import App from './App';

import Navbar from './navbar';
import Home from './RoleDivision/Home';
import Login from './Login';
import Logout from './RoleDivision/Employee/Logout';
import AddRecruitment from './RoleDivision/HRD/Recruitment/AddRecruitment';
import WarningLetter from './RoleDivision/HRD/WarningLetter/WarningLetter';
import WorkingTime from './RoleDivision/HRD/WorkingTime/WorkingTime';

import ResignManage from './RoleDivision/Manager/ResignManage';
import SelectRecruitment from './RoleDivision/HRD/Recruitment/SelectRecruitment';
import WarningLetterUpdate from './RoleDivision/Manager/WarningLetterUpdate';

//Accouting
import ApprovalSalaryAdjusment from './RoleDivision/Accounting/ApprovalSalaryAdjusment';
import AcceptDepartmentFundRequest from './RoleDivision/Accounting/AcceptDepartmentFundRequest';
import ViewPurchaseReport from './RoleDivision/Accounting/ViewPurchaseReport';

//Manager
import EmployeeResignUpdate from './RoleDivision/Manager/EmployeeResignUpdate';
import SetWorkingTime from './RoleDivision/HRD/SetWorkingTime';
import PersonalInformation from './RoleDivision/HRD/PersonalInformation';
import ViewRevenue from './RoleDivision/Manager/ViewRevenue';
import ViewExpend from './RoleDivision/Manager/ViewExpend';
import ViewFNE from './RoleDivision/Manager/ViewFNE';
import ManagerViewSchedule from './RoleDivision/Manager/ManagerViewSchedule';
import ManagerViewEmployee from './RoleDivision/Manager/ManagerViewEmployee';


//HRD
import AddEmployee from './RoleDivision/HRD/AddEmployee';
import AddSalaryAdjusment from './RoleDivision/HRD/AddSalaryAdjusment';

//Employee
import AbsentApproval from './RoleDivision/Manager/AbsentApproval';
import RequestPersonalLeave from './RoleDivision/Employee/RequestPersonalLeave';
import ViewEmployeeFundRequest from './RoleDivision/Employee/ViewEmployeeFundRequest';
import RequestDepartmentFund from './RoleDivision/Employee/RequestDepartmentFund';
import AddResign from './RoleDivision/Employee/AddResign';
import ViewRequestFixandBrokeFNE from './RoleDivision/Employee/ViewRequestFixandBrokeFNE';
import RequestFixandBrokeFNE from './RoleDivision/Employee/RequestFixandBrokeFNE';
import EmployeeClock from './RoleDivision/Employee/EmployeeClock';
import ViewEmployeeClock from './RoleDivision/Employee/ViewEmployeeClock';
import RequestResign from './RoleDivision/Employee/RequestResign';

//External Department
import ExternalReport from './RoleDivision/ExternalDepartment/ExternalReport';
import ViewExternalReport from './RoleDivision/ExternalDepartment/ViewExternalReport';

import AddMovie from './RoleDivision/ExternalDepartment/Movie/AddMovie';
import ViewMovie from './RoleDivision/ExternalDepartment/Movie/ViewMovie';

import AddAdvertising from './RoleDivision/ExternalDepartment/Advertising/AddAdvertising';
import ViewAdvertising from './RoleDivision/ExternalDepartment/Advertising/ViewAdvertising';

import AddSupply from './RoleDivision/ExternalDepartment/Supply/AddSupply';
import ViewSupply from './RoleDivision/ExternalDepartment/Supply/ViewSupply';

//Movie Department
import AddMembership from './RoleDivision/CafeDivision/AddMembership';
import ViewMovieSchedule from './RoleDivision/MovieDivision/FrontOfficeDivision/ViewMovieSchedule';
import AddMovieOrder from './RoleDivision/MovieDivision/FrontOfficeDivision/AddMovieOrder';
import ViewMovieCart from './RoleDivision/MovieDivision/FrontOfficeDivision/ViewMovieCart';
import MovieReport from './RoleDivision/ExternalDepartment/Movie/MovieReport';

//Schedule Department
import ScheduleMovieView from './RoleDivision/MovieDivision/ScheduleDivision/ScheduleMovieView';
import GenerateScheduleMovie from './RoleDivision/MovieDivision/ScheduleDivision/GenerateScheduleMovie';
import ViewSchedule from './RoleDivision/MovieDivision/ScheduleDivision/ViewSchedule';

//Operation Department
import RunningSchedule from './RoleDivision/MovieDivision/OperationDivision/RunningSchedule';

//PromotionAndEvent
import ViewMembership from './RoleDivision/PromoAndEvent/ViewMembership';
import AddPromo from './RoleDivision/PromoAndEvent/AddPromo';
import ViewPromo from './RoleDivision/PromoAndEvent/ViewPromo';
import ViewEvent from './RoleDivision/PromoAndEvent/ViewEvent';
import AddEvent from './RoleDivision/PromoAndEvent/AddEvent';

//Cafe Department
import ViewCart from './RoleDivision/CafeDivision/ViewCart';
import AddOrder from './RoleDivision/CafeDivision/AddOrder';
import CookOrder from './RoleDivision/CafeDivision/CookOrder';

//storage
import ViewDepartmentFundRequest from './RoleDivision/Storage/ViewDepartmentFundRequest';
import AddnewfacilitiesNequipments from './RoleDivision/Storage/AddnewfacilitiesNequipments';
import ViewfacilitiesNequipments from './RoleDivision/Storage/ViewfacilitiesNequipments';
import ApprovalFixandBrokenFNE from './RoleDivision/Storage/ApprovalFixandBrokenFNE';

//admin
import ResetPassword from './RoleDivision/Admin/ResetPassword';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    
    {/* <Login/> */}
    <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/logout' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          
          <Route path='/Storage/ViewDepartmentFundRequest' element={<ViewDepartmentFundRequest/>}/>
          <Route path='/Storage/AddnewfacilitiesNequipments' element={<AddnewfacilitiesNequipments/>}/>
          <Route path='/Storage/ViewfacilitiesNequipments' element={<ViewfacilitiesNequipments/>}/>
          <Route path='/Storage/ApprovalFixandBrokenFNE' element={<ApprovalFixandBrokenFNE/>}/>
          
          <Route path='/Accounting/FundRequest' element={<AcceptDepartmentFundRequest />}/>
          <Route path='/Accounting/ViewPurchaseReport' element={<ViewPurchaseReport />}/>           
          <Route path='/Accounting/ApprovalSalaryAdjusment' element={<ApprovalSalaryAdjusment />}/>           
          

          <Route path='/Manager/EmployeeResignUpdate' element={<EmployeeResignUpdate/>}/>
          
          <Route path='/Manager/ViewRevenueNExpend' element={<ViewRevenue/>}/>
          <Route path='/Manager/ViewExpend' element={<ViewExpend/>}/>
          <Route path='/Manager/ViewFNE' element={<ViewFNE/>}/>
          <Route path='/Manager/ManagerViewSchedule' element={<ManagerViewSchedule/>}/>
          <Route path='/Manager/ManagerViewEmployee' element={<ManagerViewEmployee/>}/>
          <Route path='/Manager/ApprovalSalaryAdjusment' element={<ApprovalSalaryAdjusment />}/>
          <Route path='/Manager/WarningLetterUpdate' element={<WarningLetterUpdate/>}/>
          <Route path='/Manager/ViewMembership' element={<ViewMembership/>}/>

          <Route path='/HRD/SetWorkingTime' element={<SetWorkingTime />}/>
          <Route path='/HRD/SubmitWarningLetter' element={<WarningLetter />}/>
          <Route path='/HRD/ViewPersonalInformation' element={<PersonalInformation />}/>
          <Route path='/HRD/AddEmployee' element={<AddEmployee/>}/>
          <Route path='/HRD/AddSalaryAdjusment' element={<AddSalaryAdjusment/>}/>
          <Route path='/HRD/AbsentApproval' element={<AbsentApproval/>}/>

          <Route path='/RequestPersonalLeave' element={<RequestPersonalLeave/>}/>
          <Route path='/RequestDepartmentFund' element={<RequestDepartmentFund/>}/>
          <Route path='/ViewEmployeeFundRequest' element={<ViewEmployeeFundRequest/>}/>
          <Route path='/EmployeeResignRequest' element={<AddResign/>}/>
          <Route path='/ViewRequestFixandBrokeFNE' element={<ViewRequestFixandBrokeFNE/>}/>
          <Route path='/RequestFixandBrokeFNE' element={<RequestFixandBrokeFNE/>}/>
          <Route path='/ViewEmployeeClock' element={<ViewEmployeeClock/>}/>
          <Route path='/RequestResign' element={<RequestResign/>}/>
          <Route path='/EmployeeClock' element={<EmployeeClock/>}/>

          <Route path='/External/ExternalReport' element={<ExternalReport/>}/>
          <Route path='/External/ViewExternalReport' element={<ViewExternalReport/>}/>

          <Route path='/External/Movie/AddMovie' element={<AddMovie/>}/>
          <Route path='/External/Movie/ViewMovie' element={<ViewMovie/>}/>
          <Route path='/External/Movie/MovieReport' element={<MovieReport/>}/>
          
          <Route path='/External/Advertising/AddAdvertising' element={<AddAdvertising/>}/>
          <Route path='/External/Advertising/ViewAdvertising' element={<ViewAdvertising/>}/>

          <Route path='/External/Supply/AddSupply' element={<AddSupply/>}/>
          <Route path='/External/Supply/ViewSupply' element={<ViewSupply/>}/>
          
          <Route path='/Cafe/AddOrder' element={<AddOrder/>}/>
          <Route path='/Cafe/ViewCart' element={<ViewCart/>}/>
          <Route path='/Cafe/AddMembership' element={<AddMembership/>}/>
          <Route path='/Cafe/CookOrder' element={<CookOrder/>}/>
          
          <Route path='/PromoEvent/AddPromo' element={<AddPromo/>}/>
          <Route path='/PromoEvent/AddEvent' element={<AddEvent/>}/>
          <Route path='/PromoEvent/ViewPromo' element={<ViewPromo/>}/>
          <Route path='/PromoEvent/ViewEvent' element={<ViewEvent/>}/>
          <Route path='/PromoEvent/ViewMembership' element={<ViewMembership/>}/>

          <Route path='/Movie/Front/AddMembership' element={<AddMembership/>}/>
          <Route path='/Movie/Front/ViewMovieSchedule' element={<ViewMovieSchedule/>}/>
          <Route path='/Movie/Front/AddMovieOrder' element={<AddMovieOrder/>}/>
          <Route path='/Movie/Front/ViewMovieCart' element={<ViewMovieCart/>}/>
          
          <Route path='/Schedule/ScheduleMovieView' element={<ScheduleMovieView/>}/>
          <Route path='/Schedule/GenerateScheduleMovie' element={<GenerateScheduleMovie/>}/>
          <Route path='/Schedule/ViewSchedule' element={<ViewSchedule/>}/>

          <Route path='/Operation/RunningSchedule' element={<RunningSchedule/>}/>

          <Route path='/Admin/ResetPassword' element={<ResetPassword/>}/>


        </Routes>
    </Router>
    {/* <div className='all-content'>
    <Login/> */}
      {/* <div className='left'>
        <Navbar />
      </div> */}
      {/* <div> */}
        {/* <Login/> */}
        {/* <Cho /> */}
        {/* {/* <WarningLetter/> */}
        {/* <WorkingTime/>
        <AddResign/>
        <ResignManage/> 
      </div> */}
    {/* </div> */}
  </React.StrictMode>
);
