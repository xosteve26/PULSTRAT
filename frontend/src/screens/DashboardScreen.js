import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
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

    const originalNumberOfScans=window.sessionStorage.getItem("originalNumberOfScans");
    const currentNumberOfScans=window.sessionStorage.getItem("numberOfScans");
    
    console.log(data)
    
    useEffect(async() => {
        const loggedIn = window.localStorage.getItem("LoggedIn")
        console.log("LOGGED IN ", loggedIn);
        if (!loggedIn || loggedIn === "false") {
            console.log("IN IF")
            alert("Please login to access this route")
            return navigate("/sign-in")
        }
        const numberData={
            "originalNumberOfScans":originalNumberOfScans,
            "currentNumberOfScans":currentNumberOfScans
        }
        if(!received){
            const res = await axios.post(process.env.REACT_APP_BASE_URL + '/scans', numberData, { withCredentials: true });
            setData(res.data.scans);
            window.sessionStorage.setItem('originalNumberOfScans', parseInt(currentNumberOfScans));
            console.log("data", res.data)
            setReceived(true);
            
            console.log("dates", dates)

            console.log(res.data.scans);
        }
        const dates = [... new Set(data.map(x => x.timestamps["$date"].slice(0, 10)))]
        dates.reverse()
        setDates(dates)
        console.log(dates,data)
    },[received, navigate]);

    
    return(
    <>
        <Header />
           
            <h1 className="pt-32 text-center text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl pb-3">
                <span className="block xl:inline ">Scan</span>
                <span className="block text-yellow-400 xl:inline "> History</span>

            </h1>
            
            
            {!received ? 

                <>
                    <div className="grid place-items-center h-screen"><ThreeBody
                        size={50}
                        speed={1.1}
                        color="black"
                        style="content-center"
                    /></div>
                </> 
                
                : 

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <DashboardTable data={data} dates={dates} />
                </div>
            }
        
        <Footer />
    </>
    )
}
    

export default DashboardScreen