import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState } from 'react'
import axios from 'axios'
import { Ripples } from '@uiball/loaders'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const SignUpScreen = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [Loading, setLoading] = useState(false)
    const [Message, setMessage] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        const baseURL = process.env.REACT_APP_BASE_URL
        const res = await axios.post(`${baseURL}/register`, { email, password, name })
        console.log(res.data.status)
        if (res.data.status) {
            window.localStorage.setItem('LoggedIn', false)
            toast.success("Registered Successfully, Kindly Login", {
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
        else {
            toast.error(res.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
            setError(true)
            setLoading(false)
            setMessage(res.data.message)
        }

    }
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Pulstrat | Registration</title>
                </Helmet>
            </HelmetProvider>
            <Header />
            <section className="w-full bg-white">

                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col lg:flex-row">
                        <div className="relative w-full bg-cover lg:w-6/12 xl:w-7/12 bg-gradient-to-r from-white via-white to-gray-100">
                            <div
                                className="relative flex flex-col items-center justify-center w-full h-full px-10 my-20 lg:px-16 lg:my-0">
                                <div className="flex flex-col items-start space-y-8 tracking-tight lg:max-w-3xl">
                                    <div className="relative">
                                        <p className="mb-2 font-medium text-yellow-400 uppercase">Welcome</p>
                                        <h2 className="text-5xl font-bold text-gray-900 xl:text-6xl">You've Made The <span className="text-5xl font-bold text-yellow-400 xl:text-6xl">Right Choice</span>
                                        </h2>
                                    </div>
                                    <p className="text-2xl text-gray-700">Enter You Authentication Details To Gain Access To Full Functionality Of Our Product.</p>
                                    {/* <a href="#_"
                                        className="inline-block px-8 py-5 text-xl font-medium text-center text-white transition duration-200 bg-yellow-400 hover:bg-yellow-500 ease rounded-full">Get
                                        Started Today</a> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                </div>
                            </div>
                        </div>

                        <div className="w-full bg-white lg:w-6/12 xl:w-5/12">
                            <div className="flex flex-col items-start justify-start w-full h-full p-10 lg:p-16 xl:p-24">
                                <h4 className="w-full text-3xl font-bold">Signup</h4>
                                <form onSubmit={submitHandler}>
                                <p className="text-lg text-gray-500">or, if you have an account you can <a href="/sign-in"
                                        className="text-yellow-400 underline">sign in</a></p>
                                <div className="relative w-full mt-10 space-y-8">
                                    <div className="relative">
                                        <label className="font-medium text-gray-900">Name</label>
                                        <input type="text"
                                            className="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-100 focus:outline-none focus:ring-4 focus:ring-black-400 focus:ring-opacity-50 rounded-full"
                                            placeholder="Enter Your Name" onChange={(e)=> setName(e.target.value)}/>
                                    </div>
                                    <div className="relative">
                                        <label className="font-medium text-gray-900">Email</label>
                                        <input type="email"
                                            className="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-100 focus:outline-none focus:ring-4 focus:ring-black-400 focus:ring-opacity-50 rounded-full"
                                                placeholder="Enter Your Email Address" onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                    <div className="relative">
                                        <label className="font-medium text-gray-900">Password</label>
                                        <input type="password"
                                            className="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-100 focus:outline-none focus:ring-4 focus:ring-black-400 focus:ring-opacity-50 rounded-full"
                                                placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                    <div className="relative">
                                        {!Loading && <button type='submit'
                                            className="inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-yellow-400 hover:bg-yellow-500 ease rounded-full">Create
                                            Account</button>}
                                            {Loading && <div className="flex justify-center"><div><Ripples
                                                size={45}
                                                speed={2}
                                                color="black"
                                                className='items-center'
                                            /> </div></div>}
                                        {error && <div className="pt-6 flex justify-between items-center text-red-400"> <span>{Message}</span>  </div>}
                                    </div>
                                  
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                
            </section>
            <Footer />
            
        </>
    )
}

export default SignUpScreen
