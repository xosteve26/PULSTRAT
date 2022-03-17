import React from 'react'
import Header from '../components/Header'

const DashboardScreen = () => {
    return (
        <div>
            <Header />
                <div class="container w-full mx-auto pt-2">

                <div class="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
                    <h1 className="text-center text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl pb-3">
                            <span className="block xl:inline">Diagnostic</span>
                            <span className="block text-yellow-400 xl:inline"> Report</span>
                    </h1>
        

                <div class="flex flex-wrap">
                <div class="w-full md:w-1/2 xl:w-1/3 p-3">
                    
                    <div class="bg-white border rounded shadow p-2">
                        <div class="flex flex-row items-center">
                            <div class="flex-shrink pr-4">
                                <div class="rounded p-3 bg-green-600"><i class="fa fa-wallet fa-2x fa-fw fa-inverse"></i></div>
                            </div>
                            <div class="flex-1 text-right md:text-center">
                                <h5 class="font-bold uppercase text-gray-500">Infection Presence</h5>
                                        <h3 class="font-bold text-3xl"> YES<span class="text-green-500"><i class="fa-light fa-caret-up"></i></span></h3>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="w-full md:w-1/2 xl:w-1/3 p-3">
                    
                    <div class="bg-white border rounded shadow p-2">
                        <div class="flex flex-row items-center">
                            <div class="flex-shrink pr-4">
                                <div class="rounded p-3 bg-pink-600"><i class="fas fa-users fa-2x fa-fw fa-inverse"></i></div>
                            </div>
                            <div class="flex-1 text-right md:text-center">
                                <h5 class="font-bold uppercase text-gray-500">Diagnosed Infection</h5>
                                <h3 class="font-bold text-3xl">249 <span class="text-pink-500"><i class="fas fa-exchange-alt"></i></span></h3>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="w-full md:w-1/2 xl:w-1/3 p-3">
                    
                    <div class="bg-white border rounded shadow p-2">
                        <div class="flex flex-row items-center">
                            <div class="flex-shrink pr-4">
                                <div class="rounded p-3 bg-yellow-600"><i class="fas fa-user-plus fa-2x fa-fw fa-inverse"></i></div>
                            </div>
                            <div class="flex-1 text-right md:text-center">
                                <h5 class="font-bold uppercase text-gray-500"> Infection Magnitude </h5>
                                <h3 class="font-bold text-3xl">1 <span class="text-yellow-600"><i class="fas fa-caret-up"></i></span></h3>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="w-full md:w-1/2 xl:w-1/3 p-3">
                    
                    <div class="bg-white border rounded shadow p-2">
                        <div class="flex flex-row items-center">
                            <div class="flex-shrink pr-4">
                                <div class="rounded p-3 bg-blue-600"><i class="fas fa-server fa-2x fa-fw fa-inverse"></i></div>
                            </div>
                            <div class="flex-1 text-right md:text-center">
                                <h5 class="font-bold uppercase text-gray-500">No Of Infections</h5>
                                <h3 class="font-bold text-3xl">1</h3>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="w-full md:w-1/2 xl:w-1/3 p-3">
                    
                    <div class="bg-white border rounded shadow p-2">
                        <div class="flex flex-row items-center">
                            <div class="flex-shrink pr-4">
                                <div class="rounded p-3 bg-indigo-600"><i class="fas fa-tasks fa-2x fa-fw fa-inverse"></i></div>
                            </div>
                            <div class="flex-1 text-right md:text-center">
                                <h5 class="font-bold uppercase text-gray-500">Diagnosed Accuracy </h5>
                                <h3 class="font-bold text-3xl">97.47 %</h3>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="w-full md:w-1/2 xl:w-1/3 p-3">
                    
                    <div class="bg-white border rounded shadow p-2">
                        <div class="flex flex-row items-center">
                            <div class="flex-shrink pr-4">
                                <div class="rounded p-3 bg-red-600"><i class="fas fa-inbox fa-2x fa-fw fa-inverse"></i></div>
                            </div>
                            <div class="flex-1 text-right md:text-center">
                                <h5 class="font-bold uppercase text-gray-500">Diagnosed Infection</h5>
                                <h3 class="font-bold text-3xl">3 <span class="text-red-500"><i class="fas fa-caret-up"></i></span></h3>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
                

        </div>
        </div>
        </div>
    )
}

export default DashboardScreen
