import React from 'react'
import Header from '../components/Header'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ThreeBody } from '@uiball/loaders'

import DashboardTable from '../components/DashboardTable'

const DashboardScreen = () => {
    const navigate = useNavigate();
    
    const [data, setData] = useState([]);
    const [received, setReceived] = useState(false);
    const [dates, setDates] = useState(null);
    
    console.log(data)
    
    useEffect(async() => {
        const loggedIn = window.sessionStorage.getItem("LoggedIn")
        console.log("LOGGED IN ", loggedIn);
        if (!loggedIn || loggedIn === "false") {
            console.log("IN IF")
            alert("Please login to access this route")
            navigate("/sign-in")
        }

        const res = await axios.get(process.env.REACT_APP_BASE_URL+'/scans', { withCredentials: true });
        setData(res.data.scans);
        console.log("data",res.data)
        
        
        const dates = [... new Set(data.map(x => x.timestamps["$date"].slice(0, 10)))]
<<<<<<< Updated upstream
=======
        dates.reverse()
>>>>>>> Stashed changes
        setDates(dates)
        setReceived(true);
        console.log("dates", dates)
        
        console.log(res.data.scans);
    },[received, navigate]);

    
    return(
    <>
        <Header />
           
            <h1 className="text-center text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl pb-3">
                <span className="block xl:inline ">Scan</span>
                <span className="block text-yellow-400 xl:inline "> History</span>

            </h1>
            
            
            {!received && <><div className="grid place-items-center h-screen"><ThreeBody
                size={50}
                speed={1.1}
                color="black"
                style="content-center"
            /></div></>}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <DashboardTable data={data} received={received} dates={dates} />
        </div>

    </>
    )
}
    

export default DashboardScreen