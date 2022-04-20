import React from 'react';
import {BrowserRouter as  Router, Route, Routes} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInSCreen from './screens/SignInSCreen';
import ReportScreen from './screens/ReportScreen';
import UploadScreen from './screens/UploadScreen';
import DashboardScreen from './screens/DashboardScreen';

const App = ()=> {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen/>} exact/>
        <Route path="/sign-up" element={<SignUpScreen/>}/>
        <Route path="/sign-in" element={<SignInSCreen/>}/>
        <Route path="/report" element={<ReportScreen/>}/>
        <Route path="/upload" element={<UploadScreen/>}/>
        <Route path="/dashboard" element={<DashboardScreen />} />
      </Routes>
      
    </Router>
  );
}

export default App;
