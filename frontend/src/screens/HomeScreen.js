import React from 'react'
import FAQ from '../components/FAQ'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import axios from 'axios'

const HomeScreen = () => {
    const userExists=window.localStorage.getItem('LoggedIn');
    const userData=JSON.parse(window.localStorage.getItem('userData'));
    

    useEffect(async() => {
        if(userExists){
            const id={id:userData["id"]["$oid"]}
            // const data =await axios.post(process.env.REACT_APP_BASE_URL + '/' ,id,{ withCredentials: true });
            // const numberOfScans = data.data.nScan;
            // console.log(numberOfScans)
            console.log(window.sessionStorage.getItem('cacheAvailable'))
            !window.sessionStorage.getItem('cacheRecords') && window.sessionStorage.setItem("cacheRecords",JSON.stringify({}))
            // window.sessionStorage.setItem('originalNumberOfScans',numberOfScans);
            // window.sessionStorage.setItem('numberOfScans',numberOfScans);
        }
    } , [])
    return (
        <>
        <Header />
            <section className="px-2 py-20 bg-white md:px-0">
                <div className="container items-center max-w-6xl px-8 mt-20 mx-auto xl:px-5">
                    <div className="pt-8 flex flex-wrap items-center sm:-mx-3">
                    <div className="w-full md:w-1/2 md:px-3">
                            {userExists === 'true' ? <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                                    <span className="block xl:inline">Welcome to Pulstrat, </span>
                                    <span className="block text-yellow-400 xl:inline">{userData.name}</span>
                                </h1>
                                <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">You can get started by clicking on either of the buttons below to upload a new image or access your past scans.</p>
                                <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                                    <a href="/upload" className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-yellow-400 rounded-md sm:mb-0 hover:bg-yellow-500 sm:w-auto">
                                        Upload
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </a>
                                    <a href="/dashboard/1" className="flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600">
                                        Dashboard
                                    </a>
                                </div>
                            </div> :
                        <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                            <span className="block xl:inline">Why risk waiting?</span>
                            <span className="block text-yellow-400 xl:inline">Leave it to us!</span>
                        </h1>
                        <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">Time is the fine line between life & death, we are here to make sure that they never merge.</p>
                        <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                            <a href="/sign-in" className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-yellow-400 rounded-md sm:mb-0 hover:bg-yellow-500 sm:w-auto">
                            Get Started
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </a>
                            <a href="/about" className="flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600">
                            Learn More
                            </a>
                        </div>
                        </div>}
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
                            <img src="images/medical_hero_2.svg" />
                        </div>
                    </div>
                    </div>
                </div>
            </section>

            <section className=" w-full bg-white pt-7 pb-7 md:pt-20 md:pb-24" id="features">
                    <p className="pt-8 text-xs font-bold text-left text-yellow-400 uppercase sm:mx-6 sm:text-center sm:text-normal sm:font-bold">
                        Wondering what we do ?
                    </p>
                <h3
                    className="mt-1 text-2xl font-bold text-left text-gray-800 sm:mx-6 sm:text-3xl md:text-4xl lg:text-5xl sm:text-center sm:mx-0">
                    What We Offer ?
                </h3>
                
                <div className="box-border flex flex-col items-center content-center px-8 mx-auto mt-2 leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl lg:px-16">

                
                    <div className="box-border w-full text-black border-solid md:w-1/2 md:pl-6 xl:pl-32">
                        <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                            Automated Diagnostic Model
                        </h2>
                        <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-10 lg:text-lg">
                            An assistant to help verify your prognosis, to ensure assurity of your results.
                        </p>
                        <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
                            <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                                <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white rounded-full bg-yellow-300"><span className="text-sm font-bold">✓</span></span> Automated diagnosis process
                            </li>
                            <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                                <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white rounded-full bg-yellow-300"><span className="text-sm font-bold">✓</span></span> Reduction in diagnostic delay
                            </li>
                            <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                                <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-300 rounded-full"><span className="text-sm font-bold">✓</span></span> Obtain detailed analytics
                            </li>
                        </ul>
                    </div>
                

                    <div className="box-border relative w-full max-w-md px-4 mt-10 mb-4 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2">
                        <img src="https://cdn.devdojo.com/images/december2020/settings.png" className="pl-4 sm:pr-10 xl:pl-10 lg:pr-32" />
                    </div>
                </div>
                <div
                    className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">
                
                    
                    <div
                        className="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10">
                        <img src="images/features_1.svg" className="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20" />
                    </div>
                
            
                    <div className="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none">
                        <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                            Instant Diagnosis
                        </h2>
                        <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
                            Obtain almost instant results at your table through our fast delivery model.
                        </p>
                        <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
                            <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                                <span
                                    className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-300 rounded-full"><span
                                        className="text-sm font-bold">✓</span></span> Localization Of Anomaly
                            </li>
                            <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                                <span
                                    className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-300 rounded-full"><span
                                        className="text-sm font-bold">✓</span></span> Downloadable Reports
                            </li>
                            <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                                <span
                                    className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-300 rounded-full"><span
                                        className="text-sm font-bold">✓</span></span> Accessability of past scans
                            </li>
                        </ul>
                    </div>
            
                </div>
            </section>
            <FAQ />
            <Footer />
        </>
    )
}

export default HomeScreen
