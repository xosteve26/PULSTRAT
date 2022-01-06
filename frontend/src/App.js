import React from 'react';
import {BrowserRouter as  Router, Route, Routes} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInSCreen from './screens/SignInSCreen';
import DashboardScreen from './screens/DashboardScreen';
import UploadScreen from './screens/UploadScreen';

const App = ()=> {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen/>} exact/>
        <Route path="/sign-up" element={<SignUpScreen/>}/>
        <Route path="/sign-in" element={<SignInSCreen/>}/>
        <Route path="/dashboard" element={<DashboardScreen/>}/>
        <Route path="/upload" element={<UploadScreen/>}/>
      </Routes>
      
    </Router>
  );
}

export default App;
