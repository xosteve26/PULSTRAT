import React from 'react'
import axios from 'axios'

const Header = () => {
    const userExists=window.sessionStorage.getItem('LoggedIn')

    const logoutHandler = async() =>{
        window.sessionStorage.clear()
        const res = await axios.get('http://74.220.18.176:5000/logout',{withCredentials:true})
        if (res.data.status){
            window.location.href = '/'
        }
        
    }
    return (
        <>
            <section className="w-full px-6 pb-12 antialiased bg-white">
                <div className="mx-auto max-w-7xl">

                    <nav className="relative z-50 h-24 select-none" x-data="{ showMenu: false }">
                        <div className="container relative flex flex-wrap items-center justify-between h-24 mx-auto overflow-hidden font-medium border-b border-gray-200 md:overflow-visible lg:justify-center sm:px-4 md:px-2">
                            <div className="flex items-center justify-start w-1/4 h-full pr-4">
                                <a href="#_" className="inline-block py-4 md:py-0">
                                    <span className="p-1 text-xl font-black leading-none text-gray-900"><span className="text-yellow-400">.</span><span>XMED</span><span className="text-yellow-400">.</span></span>
                                </a>
                            </div>
                            <div className="top-0 left-0 items-start hidden w-full h-full p-4 text-sm bg-gray-900 bg-opacity-50 md:items-center md:w-3/4 md:absolute lg:text-base md:bg-transparent md:p-0 md:relative md:flex">
                                <div className="flex-col w-full h-auto overflow-hidden bg-white rounded-lg md:bg-transparent md:overflow-visible md:rounded-none md:relative md:flex md:flex-row">
                                    <a href="#_" className="inline-flex items-center block w-auto h-16 px-6 text-xl font-black leading-none text-gray-900 md:hidden">tails<span className="text-yellow-400">.</span></a>
                                    <div className="flex flex-col items-start justify-center w-full space-x-6 text-center lg:space-x-8 md:w-2/3 md:mt-0 md:flex-row md:items-center">
                                        <a href="/" className="inline-block w-full py-2 mx-0 ml-6 font-medium text-left text-yellow-400 md:ml-0 md:w-auto md:px-0 md:mx-2 lg:mx-3 md:text-center">Home</a>
                                        <a href="#features" className="inline-block w-full py-2 mx-0 font-medium text-left text-gray-700 md:w-auto md:px-0 md:mx-2 hover:text-yellow-400 lg:mx-3 md:text-center">Features</a>
                                        <a href="#faq" className="inline-block w-full py-2 mx-0 font-medium text-left text-gray-700 md:w-auto md:px-0 md:mx-2 hover:text-yellow-400 lg:mx-3 md:text-center">FAQ</a>
                                        <a href="#_" className="inline-block w-full py-2 mx-0 font-medium text-left text-gray-700 md:w-auto md:px-0 md:mx-2 hover:text-yellow-400 lg:mx-3 md:text-center">Contact</a>
                                        {userExists&&<>
                                        {/* <a href="/dashboard" className="inline-block w-full py-2 mx-0 font-medium text-left text-gray-700 md:w-auto md:px-0 md:mx-2 hover:text-yellow-400 lg:mx-3 md:text-center">Dashboard</a> */}
                                        <a href="/upload" className="inline-block w-full py-2 mx-0 font-medium text-left text-gray-700 md:w-auto md:px-0 md:mx-2 hover:text-yellow-400 lg:mx-3 md:text-center">Upload</a> </>}
                                        <a href="#_" className="absolute top-0 left-0 hidden py-2 mt-6 ml-10 mr-2 text-gray-600 lg:inline-block md:mt-0 md:ml-2 lg:mx-3 md:relative">
                                            {/* <svg className="inline w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> */}
                                        </a>
                                    </div>
                                    <div className="flex flex-col items-start justify-end w-full pt-4 md:items-center md:w-1/3 md:flex-row md:py-0">
                                        {!userExists ? <><a href="/sign-in" className="w-full px-6 py-2 mr-0 text-gray-700 md:px-0 lg:pl-2 md:mr-4 lg:mr-5 md:w-auto">Sign In</a>
                                            <a href="/sign-up" className="inline-flex items-center w-full px-6 py-3 text-sm font-medium leading-4 text-white bg-yellow-400 md:px-3 md:w-auto md:rounded-full lg:px-5 hover:bg-yellow-300 focus:outline-none md:focus:ring-2 focus:ring-0 focus:ring-offset-2 focus:ring-yellow-400">Sign Up</a> </> 
                                            : <> <button onClick={logoutHandler} className="w-full px-6 py-2 mr-0 text-gray-700 md:px-0 lg:pl-2 md:mr-4 lg:mr-5 md:w-auto">Logout</button>  
                                            <a href="/dashboard" className="inline-flex items-center w-full px-6 py-3 text-sm font-medium leading-4 text-white bg-yellow-400 md:px-3 md:w-auto md:rounded-full lg:px-5 hover:bg-yellow-300 focus:outline-none md:focus:ring-2 focus:ring-0 focus:ring-offset-2 focus:ring-yellow-400">Dashboard</a> </> }
                                    </div>
                                </div>
                            </div>
                            <div  className="absolute right-0 flex flex-col items-center items-end justify-center w-10 h-10 bg-white rounded-full cursor-pointer md:hidden hover:bg-gray-100">
                                {/* <svg className="w-6 h-6 text-gray-700" x-show="!showMenu" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                                <svg className="w-6 h-6 text-gray-700" x-show="showMenu" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="display: none;">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg> */}
                            </div>
                        </div>
                    </nav>

                </div>
            </section>
</>
    )
}

export default Header
