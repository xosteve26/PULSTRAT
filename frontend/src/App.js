import React from 'react';
import {BrowserRouter as  Router, Route, Routes} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInSCreen from './screens/SignInSCreen';
import ReportScreen from './screens/ReportScreen';
import UploadScreen from './screens/UploadScreen';
import DashboardScreen from './screens/DashboardScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import Four04Screen from './screens/Four04Screen';

const App = ()=> {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Four04Screen />} />
        <Route path="/" element={<HomeScreen/>} exact/>
        <Route path="/sign-up" element={<SignUpScreen/>}/>
        <Route path="/sign-in" element={<SignInSCreen/>}/>
        <Route path="/report/:id" element={<ReportScreen/>}/>
        <Route path="/upload" element={<UploadScreen/>}/>
        <Route path="/dashboard/:pageNumber" element={<DashboardScreen />} />
        <Route path="/about" element={<AboutUsScreen />} />
      </Routes>
      
    </Router>
  );
}

export default App;
