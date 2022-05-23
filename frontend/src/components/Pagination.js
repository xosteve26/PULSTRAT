import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Pagination = (props)=> {
    const navigate=useNavigate();
    console.log(props.totalPages)
    const pageNumber=parseInt(props.currentPage);
    const previousRedirect = ()=>{
        if(pageNumber>1){
            window.location.href=`/dashboard/${pageNumber-1}`
        }
    }

    const nextRedirect = ()=>{
        if(pageNumber<props.totalPages){
            window.location.href=`/dashboard/${pageNumber+1}`
        }
    }
    const regularRedirect = (e)=>{
        window.location.href=`/dashboard/${e.target.id}`

    }


    return (
        <>
            <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
                <div className="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200">
                    <div className="flex items-center pt-3 text-gray-600 hover:text-yellow-400 cursor-pointer">
                        <svg width={14} height={8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.1665 4H12.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1.1665 4L4.49984 7.33333" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1.1665 4.00002L4.49984 0.666687" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p id={pageNumber} className="text-sm ml-3 font-medium leading-none" onClick={previousRedirect}>Previous</p>
                    </div>
                    
                    <div className="sm:flex hidden">
                        {
                            [...Array(props.totalPages)].map((x, i) => {
                                if(i+1===pageNumber){
                                    console.log("IN IF")
                                    return (
                                        <p key={i} id={i + 1} onClick={regularRedirect} className="text-sm font-medium leading-none cursor-pointer text-yellow-400 border-t border-yellow-400 pt-3 mr-4 px-2">{i + 1}</p>
                                    )
                                    
                                }
                                else{
                                    console.log("IN ELSE")
                                    
                                    return (
                                        <p key={i} id={i + 1} onClick={regularRedirect} className="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-yellow-400 border-t border-transparent hover:border-yellow-400 pt-3 mr-4 px-2">{i + 1}</p>
                                    )
                                }
                                            
                                        }
                                    )
                                }
                        
                    </div>
                    <div className="flex items-center pt-3 text-gray-600 hover:text-yellow-400 cursor-pointer">
                        <p onClick={nextRedirect} className="text-sm font-medium leading-none mr-3">Next</p>
                        <svg width={14} height={8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.1665 4H12.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.5 7.33333L12.8333 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.5 0.666687L12.8333 4.00002" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Pagination;