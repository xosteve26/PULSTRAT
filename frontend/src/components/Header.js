import React from 'react'
import axios from 'axios'

const Header = () => {
    const userExists=window.localStorage.getItem('LoggedIn')
    console.log(typeof(userExists))

    const logoutHandler = async() =>{
        window.sessionStorage.clear()
        window.localStorage.clear()
        const res=await axios.get(process.env.REACT_APP_BASE_URL+'/logout',{withCredentials:true})
        if (res.data.status){
            window.location.href = '/'
        }  
    }
    return (
        <>
            <section className="fixed w-full px-8 antialiased bg-white bg-opacity-80 bg-clip-padding backdrop-filter backdrop-blur-lg z-50" style={{"backdrop-filter": "blur(10px)"}}>
                <div className="mx-auto max-w-7xl">

                    <nav className="relative z-50 h-24 select-none" x-data="{ showMenu: false }">
                        <div className="container relative flex flex-wrap items-center justify-between h-24 mx-auto overflow-hidden font-medium border-b border-gray-200 md:overflow-visible lg:justify-center sm:px-4 md:px-2">
                            <div className="flex items-center justify-start w-1/4 h-full pr-4">
                                <a href="/" className=" relative z-10 flex items-center w-auto text-2xl font-extrabold leading-none text-black select-none">
                                    <span className="p-1 text-xl font-black leading-none text-gray-900"><span className="text-yellow-400">.</span><span>PULSTRAT</span><span className="text-yellow-400">.</span></span>
                                </a>
                            </div>
                            <div className="top-0 left-0 items-start hidden w-full h-full p-4 text-sm bg-gray-900 bg-opacity-50 md:items-center md:w-3/4 md:absolute lg:text-base md:bg-transparent md:p-0 md:relative md:flex">
                                <div className="flex-col w-full h-auto overflow-hidden bg-white rounded-lg md:bg-transparent md:overflow-visible md:rounded-none md:relative md:flex md:flex-row">
                                    <a href="#_" className="inline-flex items-center block w-auto h-16 px-6 text-xl font-black leading-none text-gray-900 md:hidden">tails<span className="text-yellow-400">.</span></a>
                                    <div className="flex flex-col items-start justify-center w-full space-x-6 text-center lg:space-x-8 md:w-2/3 md:mt-0 md:flex-row md:items-center">
                                        <a href="/" className="relative font-medium leading-6 text-gray-900 transition duration-150 ease-out hover:text-yellow-400" x-data="{ hover: false }" >
                                            <span className="block">Home</span>
                                            {/* <span class="absolute bottom-0 left-0 inline-block w-full h-0.5 -mb-1 overflow-hidden">
                                                <span x-show="hover" class="absolute inset-0 inline-block w-full h-1 h-full transform bg-gray-900" xTransitionEnter="transition ease duration-200" xTransitionEnterStart="scale-0" xTransitionEnterEnd="scale-100" xTransitionLeave="transition ease-out duration-300" xTransitionLeaveStart="scale-100" xTransitionLeaveEnd="scale-0"></span>
                                            </span> */}
                                        </a>
                                        <a href="/#features" className="relative font-medium leading-6 text-gray-700 transition duration-150 ease-out hover:text-yellow-400" x-data="{ hover: false }" >
                                            <span className="block">Features</span>
                                            {/* <span class="absolute bottom-0 left-0 inline-block w-full h-0.5 -mb-1 overflow-hidden">
                                                <span x-show="hover" class="absolute inset-0 inline-block w-full h-1 h-full transform bg-gray-900" xTransitionEnter="transition ease duration-200" xTransitionEnterStart="scale-0" xTransitionEnterEnd="scale-100" xTransitionLeave="transition ease-out duration-300" xTransitionLeaveStart="scale-100" xTransitionLeaveEnd="scale-0"></span>
                                            </span> */}
                                        </a>
                                        <a href="/#faq" className="relative font-medium leading-6 text-gray-600 transition duration-150 ease-out hover:text-yellow-400" x-data="{ hover: false }" >
                                            <span className="block">FAQ</span>
                                            {/* <span class="absolute bottom-0 left-0 inline-block w-full h-0.5 -mb-1 overflow-hidden">
                                                <span x-show="hover" class="absolute inset-0 inline-block w-full h-1 h-full transform bg-gray-900" xTransitionEnter="transition ease duration-200" xTransitionEnterStart="scale-0" xTransitionEnterEnd="scale-100" xTransitionLeave="transition ease-out duration-300" xTransitionLeaveStart="scale-100" xTransitionLeaveEnd="scale-0"></span>
                                            </span> */}
                                        </a>
                                        <a href="/about" className="relative font-medium leading-6 text-gray-600 transition duration-150 ease-out hover:text-yellow-400" x-data="{ hover: false }" >
                                            <span className="block">About Us</span>
                                            {/* <span class="absolute bottom-0 left-0 inline-block w-full h-0.5 -mb-1 overflow-hidden">
                                                <span x-show="hover" class="absolute inset-0 inline-block w-full h-1 h-full transform bg-gray-900" xTransitionEnter="transition ease duration-200" xTransitionEnterStart="scale-0" xTransitionEnterEnd="scale-100" xTransitionLeave="transition ease-out duration-300" xTransitionLeaveStart="scale-100" xTransitionLeaveEnd="scale-0"></span>
                                            </span> */}
                                        </a>
                                        {userExists === 'true' &&<>
                                        {/* <a href="/dashboard" className="inline-block w-full py-2 mx-0 font-medium text-left text-gray-700 md:w-auto md:px-0 md:mx-2 hover:text-yellow-400 lg:mx-3 md:text-center">Dashboard</a> */}
                                        <a href="/upload" className="inline-block w-full py-2 mx-0 font-medium text-left text-gray-700 md:w-auto md:px-0 md:mx-2 hover:text-yellow-400 lg:mx-3 md:text-center">Upload</a> </>}
                                        <a href="#_" className="absolute top-0 left-0 hidden py-2 mt-6 ml-10 mr-2 text-gray-600 lg:inline-block md:mt-0 md:ml-2 lg:mx-3 md:relative">
                                            {/* <svg className="inline w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> */}
                                        </a>
                                        
                                    </div>
                                    <div className="flex flex-col items-start justify-end w-full pt-4 md:items-center md:w-1/3 md:flex-row md:py-0">
                                        {userExists === 'true' ? <> 
                                        <button onClick={logoutHandler} className="w-full px-6 py-2 mr-0 text-gray-700 md:px-0 lg:pl-2 md:mr-4 lg:mr-5 md:w-auto">Logout</button>
                                            <a href="/dashboard/1" className="inline-flex items-center w-full px-6 py-3 text-sm font-medium leading-4 text-white bg-yellow-400 md:px-3 md:w-auto md:rounded-full lg:px-5 hover:bg-yellow-300 focus:outline-none md:focus:ring-2 focus:ring-0 focus:ring-offset-2 focus:ring-yellow-400">Dashboard</a> </>
                                            : <><a href="/sign-in" className="w-full px-6 py-2 mr-0 text-gray-700 md:px-0 lg:pl-2 md:mr-4 lg:mr-5 md:w-auto">Sign In</a>
                                                <a href="/sign-up" className="inline-flex items-center w-full px-6 py-3 text-sm font-medium leading-4 text-white bg-yellow-400 md:px-3 md:w-auto md:rounded-full lg:px-5 hover:bg-yellow-300 focus:outline-none md:focus:ring-2 focus:ring-0 focus:ring-offset-2 focus:ring-yellow-400">Sign Up</a> </> }
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </nav>

                </div>
            </section>
</>
    )
}

export default Header
