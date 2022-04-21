import React from 'react'
import Header from '../components/Header'
import { useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLungsVirus} from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import img from '../logo.png'
// import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
// import ReactPDF from '@react-pdf/renderer';

// import PDFFile from '../components/PDFFile.js';

const ReportScreen = () => {
    
    const location = useLocation();
    let ud=window.sessionStorage.getItem('userData')
    const userDataObject=JSON.parse(ud)
    console.log(userDataObject)
    console.log("location",location.state)

    return (
        <>
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
                                        <div class="rounded p-3 bg-green-600"><FontAwesomeIcon icon={faMagnifyingGlass} size="xl" inverse /></div>
                            </div>
                            <div class="flex-1 text-right md:text-center">
                                        <h5 class="font-bold uppercase text-gray-500">Infection Presence</h5>
                                        <h3 class={location.state.prediction == 'true' ? "font-bold text-3xl text-green-500" :"font-bold text-3xl text-red-500" }> {location.state.prediction.toString() == 'true' ? 'POSITIVE': "NEGATIVE"}</h3>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="w-full md:w-1/2 xl:w-1/3 p-3">
                    
                    <div class="bg-white border rounded shadow p-2">
                        <div class="flex flex-row items-center">
                            <div class="flex-shrink pr-4">
                                        <div class="rounded p-3 bg-pink-600"><FontAwesomeIcon icon={faLungsVirus} size="xl" inverse /></div>
                            </div>
                            <div class="flex-1 text-right md:text-center">
                                <h5 class="font-bold uppercase text-gray-500">Diagnosed Infection</h5>
                                <h3 class="font-bold text-3xl">{location.state.prediction == 'true' ? 'PNEUMONIA' : 'Null'} <span class="text-pink-500"><i class="fas fa-exchange-alt"></i></span></h3>
                            </div>
                        </div>
                    </div>
                    
                </div>
                {/* <div class="w-full md:w-1/2 xl:w-1/3 p-3">
                    
                    <div class="bg-white border rounded shadow p-2">
                        <div class="flex flex-row items-center">
                            <div class="flex-shrink pr-4">
                                        <div class="rounded p-3 bg-yellow-600"><FontAwesomeIcon icon={faLungsVirus} /></div>
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
                    
                </div> */}
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

            <div class="h-[297mm] w-[210mm] p-12 pl-32">
                <div class="flex justify-center border-2">
                    {/* <div>
                        <p class="pb-2 text-4xl">{location.state.name}</p>
                        <p class="text-sm text-gray-400">{userDataObject.email}</p>
                        <p class="text-sm text-gray-400">{location.state.userId}</p>
                    </div> */}
                    <div class="justify-center">
                        <img src={img}  width='180px' height='180px'/>
                    </div>
                </div>
                <div class="flex justify-between pt-16">
                    <div>
                        <p>{location.state.timestamps.slice(0,10)}</p>
                        <p class="pb-3 text-4xl font-bold">REPORT</p>
                        <p class="text-sm font-bold">SCAN ID. <span class="pl-1 font-normal">{location.state.id}</span></p>
                        <p class="text-sm font-bold">SCAN DATE: <span class="pl-1 font-normal">{location.state.timestamps}</span></p>
                    </div>
                    {/* <div class="pl-2 text-right">
                        <p class="text-gray-400">CLIENT</p>
                        <p class="font-bold">Tony Stark</p>
                        <p class="text-sm">Avengers Mansion</p>
                        <p class="text-sm">890 Fifth Avenue</p>
                        <p class="text-sm">Manhattan New York 10004</p>
                    </div> */}
                    <div class="pl-2 text-right">
                        <p class="pb-2 text-4xl">{location.state.name}</p>
                        <p class="text-sm text-black-400 font-bold">Email ID: <span class="font-normal">{userDataObject.email}</span> </p>
                        <p class="text-sm text-black-400 font-bold">User ID: <span class="font-normal">{location.state.userId}</span> </p>
                    </div>
                </div>
                <div class="pt-16">
                    <table class="w-full table-auto text-sm">
                        <thead class="border-b-2">
                            <tr class="h-10 text-left">
                                <th>Sl.No</th>
                                <th>Name</th>
                                <th>Disease</th>
                                <th>Email</th>
                                <th class="text-right">Prediction</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="h-10">
                                <td>1</td>
                                <td>{location.state.name}</td>
                                <td>PNEUMONIA</td>
                                <td>{userDataObject.email}</td>
                                <td class="text-right">{location.state.prediction == 'true' ? <span class="text-green-600">{'Positive'.toUpperCase()}</span> : <span class="text-red-600">{'Negative'.toUpperCase()}</span>}</td>
                                {/* <td class="text-right">360.00</td> */}
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
                <div class="flex justify-end">
                    {/* <p class="pt-6 text-xl font-bold">1860.00 €</p> */}
                </div>
                {/* <div class="pt-16 text-sm">
                    <p class="font-bold">PAYMENT ADVICE</p>
                    <p>Account name: MB Road apples</p>
                    <p>Bank name: Hello World</p>
                    <p>IBAN: GB95BARC20038428989175</p>
                </div> */}

            </div>
        </>
    )
}

// const styles = StyleSheet.create({
//     page: {
//         flexDirection: 'row',
//         backgroundColor: '#E4E4E4'
//     },
//     section: {
//         margin: 10,
//         padding: 10,
//         flexGrow: 1
//     }
// });

// const MyDocument = () => (
//     <Document>
//         <Page size="A4" style={styles.page}>
//             <View style={styles.section}>
//                 <Text>Section #1</Text>
//             </View>
//             <View style={styles.section}>
//                 <Text>Section #2</Text>
//             </View>
//         </Page>
//     </Document>
// );

export default ReportScreen
