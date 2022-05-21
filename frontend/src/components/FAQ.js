import React, { useEffect } from 'react'
import { useState } from 'react'

const FAQ = () => {
    const[faq, setFaq] = useState([
    {
        "id":0,
        "question":"How does it work?",
        "answer": "Our platform uses a heavily trained Dense Neural Network to scan through every pixel of a scanned x- ray to detect the presence of Pneumonia.",
        "open":false
    },
    {
        "id":1,
        "question":"How accurate is the model?",
        "answer":"Our model achieves a maximum accuracy of ~93% on the test set. This is a result of the model being trained on a dataset of ~5000 images.",
        "open": false
    },
    {
        "id":2,
        "question":"How long does it take to process an image?",
        "answer":"The model takes approximately a maximum of 30s minute to process an image.",
        "open": false
    },
    {
        "id":3,
        "question":"Can I view my history of scans?",
        "answer":"Yes, you can view your history of scans by clicking on the 'Dashboard' tab on the homepage."   ,
        "open": false
    },
    {
        "id":4,
        "question": "How do I send my report to my email id?",
        "answer": "You can send your report to your email id by clicking on the 'Email' button in the required scan report.",
        "open": false
    },
    ])
    
    const clickHandler= (divId)=>{
        if (divId < faq.length) {
            setFaq(faq.map(single => {
                if (single.id === divId) {
                    single.open = !single.open;
                }
                return single;
            }));
        } else {
            setFaq([...faq]);
        }
    };
    
    return (
        <>
            
            <section className="py-20 2xl:py-24" id="faq">
                <div className="container px-4 mx-auto">
                    <div className="mb-20 text-center">
                        <span className="text-lg font-bold text-yellow-400">Hey! Have any questions?</span>
                        <h2 className="mt-8 text-7xl font-bold font-heading ">FAQ's</h2>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        <ul>
                            {faq.map((item, index)=>{

                                return (

                                    
                                        item.open ?
                                        <li onClick={() => clickHandler(index)} className="mb-4 px-4 lg:px-12 py-8 bg-white rounded-2xl border-2">
                                            <div className="flex w-full text-left cursor-pointer">
                                                <div className="w-auto mr-8">
                                                    <span   className="flex items-center justify-center w-12 h-12 text-lg text-white font-bold bg-yellow-400 rounded-full">{index + 1}</span>
                                                    </div>
                                                <div  className="w-full mt-3">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-xl font-bold">{item.question}</h3>
                                                            <span className="ml-4">
                                                                <svg className="w-4 h-4" width={18} height={10} viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M1.18267 9.00018C0.910673 9.26818 0.473672 9.26818 0.203672 9.00018C-0.0663284 8.73218 -0.0673279 8.29918 0.203672 8.03118L8.11167 0.201183C8.38167 -0.0668173 8.81867 -0.0668173 9.09067 0.201183L16.9987 8.03118C17.2687 8.29918 17.2687 8.73218 16.9987 9.00018C16.7277 9.26818 16.2897 9.26818 16.0197 9.00018L8.60067 1.85918L1.18267 9.00018Z" fill="#1F40FF" />
                                                                </svg>
                                                            </span>
                                                        </div>
                                                        <div className="mt-6 border-l-2 border-gray-50 pl-10" id="first">
                                                        <p className="mb-5 text-xl text-gray-500">{item.answer}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            :
                                        <li onClick={() => clickHandler(index)} className="mb-4 px-4 lg:px-12 py-8 bg-white rounded-2xl border-2">
                                            <div className="flex w-full text-left cursor-pointer">
                                                    <div className="w-auto mr-8">
                                                        <span className="flex items-center justify-center w-12 h-12 text-lg text-white font-bold bg-yellow-400 rounded-full">{index + 1}</span>
                                                    </div>
                                                <div className="w-full mt-3">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-xl font-bold">{item.question}</h3>
                                                            <span className="ml-4">
                                                            <svg class="w-4 h-4" width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M16.0185 0.999999C16.2905 0.732 16.7275 0.732 16.9975 0.999999C17.2675 1.268 17.2685 1.701 16.9975 1.969L9.0895 9.799C8.8195 10.067 8.3825 10.067 8.1105 9.799L0.2025 1.969C-0.0675004 1.701 -0.0675004 1.268 0.2025 1C0.4735 0.732 0.9115 0.732 1.1815 1L8.6005 8.141L16.0185 0.999999Z" fill="#1F40FF"></path>
                                                            </svg>
                                                            </span>
                                                        </div>
                                                        <div className="hidden mt-6 border-l-2 border-gray-50 pl-10" id="first">
                                                        <p className="mb-5 text-xl text-gray-500">{item.answer}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                )
 
                            })}
                        
                        </ul>
                    </div>
                </div>
            </section>
            
        </>
    )
}

export default FAQ
