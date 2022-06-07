import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import { useParams } from "react-router-dom";
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ThreeBody } from '@uiball/loaders'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import DashboardTable from '../components/DashboardTable'
import { toast } from 'react-toastify';

const DashboardScreen = () => {
    console.log(window.location)
    const navigate = useNavigate();
    const params = useParams();
    const [data, setData] = useState([]);
    const [received, setReceived] = useState(false);
    console.log("RECEIVED BEGINING",received)
    const [dates, setDates] = useState(null);
    const [pageN, setPageN] = useState(1);
    const [totalPages, setTotalPages] = useState(null);


    const cacheRecords=JSON.parse(window.sessionStorage.getItem("cacheRecords"))

    
    console.log("data begining",data)
    
    useEffect(async() => {
        const loggedIn = window.localStorage.getItem("LoggedIn")
        console.log("LOGGED IN ", loggedIn);
        if (!loggedIn || loggedIn === "false") {
            console.log("IN IF")
            toast.error("Please login to access this route", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
            return navigate("/sign-in")
        }
        
        const pageNumber = params.pageNumber || 1;
        setPageN(pageNumber);
        console.log("PAGE NUMB", pageN)

        const numberData={
            "cacheRecords":cacheRecords
        }
        if(!received){
            console.log("IN FETCH DATA")
            try{
                const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/scans/${parseInt(pageNumber)}`, numberData, { withCredentials: true })
                setData(res.data.scans);
                console.log("DATA", res.data)
                setTotalPages(res.data.totalPages)
                console.log("TOTAL PAGES", totalPages)

                console.log("IN IF")
                cacheRecords[pageNumber] = true
                window.sessionStorage.setItem("cacheRecords", JSON.stringify(cacheRecords))
                console.log("CACHE RECORDS", cacheRecords)

                console.log("data", res.data)
                setReceived(true);
                console.log("RECEIVED", received)

            }
            catch(e){
                console.log("IN CATCH")
                toast.error(e.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                })
                return navigate("/")
            }
            
        }
        
        
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
            <HelmetProvider>
                <Helmet>
                    <title>Pulstrat | Dashboard</title>
                </Helmet>
            </HelmetProvider>
        <Header />
           
            <h1 className="pt-32 text-center text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl pb-3">
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