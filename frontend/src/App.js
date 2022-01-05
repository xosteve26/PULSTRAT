import React from 'react';
import {BrowserRouter as  Router, Route, Routes} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';

const App = ()=> {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen/>} exact/>
        <Route path="/sign-up" element={<SignUpScreen/>}/>
      </Routes>
      
    </Router>
  );
}

export default App;
