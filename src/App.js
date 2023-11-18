import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login'
import UserDashboard from './Components/UserDashboard';
import Profile from './Components/Profile';
import Templates from './Components/Templates';
import Academics from './Components/Academics';
import PushStudy from './Components/PushStudy';
import AddToAcademics from './Components/AddToAcademics';
import ApiData from './ApiData';
import Error404 from './Components/Error404';
import ZVPDF from './ZVPDF';
import TextEditor from './Components/TextEditor';
import TotalStudyData from './Components/TotalStudyData';
import ReportsTab from './Components/ReportsTab';
import TextQuillEditor from './Components/TextQuillEditor';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Link to='/user/login'>Login</Link>} />
        <Route path='/user/login' element={<Login />} />
        <Route path='/user/dashboard' element={<UserDashboard />} />
        <Route path='/user/dashboard/profile' element={<Profile />} />
        <Route path='/user/dashboard/template' element={<Templates />} />
        <Route path='/user/dashboard/pushstudy' element={<PushStudy />} />
        <Route path='/user/dashboard/addtoacadmics' element={<AddToAcademics />} />
        <Route path='/user/dashboard/academics' element={<Academics />} />


        <Route path='/user/dashboard/zvpf/:id' element={<ZVPDF />} />

        {/* Show total studies */}
        <Route path='/user/totalstudies/:id' element={<TotalStudyData />} />

        {/* OLD REPORT PAGE */}
        {/* <Route path='/user/reports/:id' element={<ReportsTab />} /> */}

        <Route path='/user/reports/:id' element={<TextQuillEditor />} />

        <Route path='/testerpage' element={<ApiData />} />

        <Route path='/user/dashboard/addHtmlTemplate' element={<TextEditor />} />

        {/* <Route path='*' element={<h1>Error <br /> <button ><Link to='/user/login'>Back</Link></button></h1>} /> */}
        <Route path='*' element={<Error404 />} />
      </Routes>

    </>
  );
}

export default App;

