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

    const navigate = useNavigate();
    const params = useParams();
    const [data, setData] = useState([]);
    const [received, setReceived] = useState(false);
  
    const [dates, setDates] = useState(null);
    const [pageN, setPageN] = useState(1);
    const [totalPages, setTotalPages] = useState(null);


    const cacheRecords=JSON.parse(window.sessionStorage.getItem("cacheRecords"))

    

    
    useEffect(async() => {
        const loggedIn = window.localStorage.getItem("LoggedIn")
       
        if (!loggedIn || loggedIn === "false") {
      
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
      

        const numberData={
            "cacheRecords":cacheRecords
        }
        if(!received){
        
            try{
                const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/scans/${parseInt(pageNumber)}`, numberData, { withCredentials: true })
                setData(res.data.scans);
           
                setTotalPages(res.data.totalPages)

                cacheRecords[pageNumber] = true
                window.sessionStorage.setItem("cacheRecords", JSON.stringify(cacheRecords))
             
                setReceived(true);
            
            }
            catch(e){
                
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
        

        const dateOrder = [... new Set(data.map(x => x.timestamps["$date"].slice(0, 10)))]
        setDates(dateOrder)

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