import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import { useParams } from "react-router-dom";
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ThreeBody } from '@uiball/loaders'

import DashboardTable from '../components/DashboardTable'

const DashboardScreen = () => {
    
    const navigate = useNavigate();
    const params = useParams();
    const [data, setData] = useState([]);
    const [received, setReceived] = useState(false);
    console.log("RECEIVED BEGINING",received)
    const [dates, setDates] = useState(null);
    const [pageN, setPageN] = useState(1);
    const [totalPages, setTotalPages] = useState(null);

    const originalNumberOfScans=window.sessionStorage.getItem("originalNumberOfScans");
    const currentNumberOfScans=window.sessionStorage.getItem("numberOfScans");
    
    console.log("data begining",data)
    
    useEffect(async() => {
        const loggedIn = window.sessionStorage.getItem("LoggedIn")
        console.log("LOGGED IN ", loggedIn);
        if (!loggedIn || loggedIn === "false") {
            console.log("IN IF")
            alert("Please login to access this route")
            return navigate("/sign-in")
        }
        
        const pageNumber = params.pageNumber || 1;
        setPageN(pageNumber);
        console.log("PAGE NUMB", pageN)
        const numberData={
            "originalNumberOfScans":originalNumberOfScans,
            "currentNumberOfScans":currentNumberOfScans
        }
        if(!received){
            console.log("IN FETCH DATA")
            const res = await axios.post(process.env.REACT_APP_BASE_URL + '/scans/' + parseInt(pageNumber), numberData, { withCredentials: true });
            setData(res.data.scans);
            console.log("DATA", res.data)
            setTotalPages(res.data.totalPages)
            console.log("TOTAL PAGES", totalPages)
            window.sessionStorage.setItem('originalNumberOfScans', parseInt(currentNumberOfScans));
            console.log("data", res.data)
        }
        
        setReceived(true);
        console.log("RECEIVED",received)
        // console.log("dates", dateOrder)

        // console.log(res.data.scans);
       
        const dateOrder = [... new Set(data.map(x => x.timestamps["$date"].slice(0, 10)))]
        setDates(dateOrder)

        console.log(dateOrder)


        console.log(received)
        console.log("dates, data",dates,data)
        console.log("DATES",dates)
        console.log("PAGES", totalPages)
    },[received,navigate]);

    
    return(
    <>
        <Header />
           
            <h1 className="text-center text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl pb-3">
                <span className="block xl:inline ">Scan</span>
                <span className="block text-yellow-400 xl:inline "> History</span>

            </h1>
            
            
            {!received? 

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
                    <DashboardTable data={data} dates={dates}/>
                </div>
            }
            {received && <Pagination totalPages={totalPages} currentPage={pageN}/>}
        <Footer />
    </>
    )
}
    

export default DashboardScreen