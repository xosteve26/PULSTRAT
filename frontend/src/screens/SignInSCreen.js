import React from 'react'
import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'
import { Ripples } from '@uiball/loaders'


const SignInSCreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [Loading, setLoading] = useState(false)

    const submitHandler = async(e) => {
        e.preventDefault()
        setLoading(true)
        const baseURL = process.env.REACT_APP_BASE_URL
        console.log("ENV VAR",baseURL)
        const res = await axios.post(`${baseURL}/login`, {email,password}, {withCredentials:true})
        console.log(res.data.status)
        if(res.data.status){
            window.sessionStorage.setItem('LoggedIn', true)
            window.sessionStorage.setItem("userData", res.data.userData)
            localStorage.setItem('LoggedIn', true)
            localStorage.setItem("userData", res.data.userData)
            window.location.href = '/'
            
        }
        else{
            window.sessionStorage.setItem('LoggedIn', false)
            setError(true)
            setLoading(false)
        }

    }
    return (
        <>
        <Header />
        <section className="w-full px-8 py-16 bg-gray-100 xl:px-8">
            <div className="max-w-5xl mx-auto mt-20">
                <div className="flex flex-col items-center md:flex-row">

                    <div className="w-full space-y-5 md:w-3/5 md:pr-16">
                        <p className="font-medium text-yellow-400 uppercase">Welcome</p>
                        <h2 className="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl">
                            Enter Your Login Credentials.
                        </h2>
                        <p className="text-xl text-gray-600 md:pr-16">Upon logging in you can upload your scans and obtain access to your personalized dashboard.</p>
                    </div>

                    <div className="w-full mt-16 md:mt-0 md:w-2/5">
                        <div className="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 shadow-2xl px-7 rounded-3xl">
                            <form onSubmit={submitHandler}>
                                    <h3 className="mb-6 text-2xl font-medium text-center">Sign in to your Account</h3>
                                    <input type="text" name="email" className="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 focus:ring focus:ring-yellow-400 focus:outline-none rounded-full" placeholder="Email address" onChange={(e)=>setEmail(e.target.value)}/>
                                    <input type="password" name="password" className="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 focus:ring focus:ring-yellow-400 focus:outline-none rounded-full" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                    <div className="block flex justify-center">
                                        {!Loading  && !error &&<button type='submit' className="w-full px-3 py-4 font-medium text-white bg-yellow-400 rounded-full">Log Me In</button>}
                                        {!Loading && error && <button type='submit' className="w-full px-3 py-4 font-medium text-white bg-yellow-400 rounded-full">Log Me In</button>}
                                        
                                        {Loading && <div><Ripples
                                            size={45}
                                            speed={2}
                                            color="black"
                                            className='items-center'
                                        /></div>}
                                        
                                    </div>
                            </form>
                                {error && <div className="flex justify-between items-center text-red-400"> <span>Invalid Credentials</span>  </div>}
                            <p className="w-full mt-4 text-sm text-center text-gray-500">Don't have an account? <a href="/sign-up" className="text-blue-500 underline">Sign up here</a></p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
        <Footer />
 
        </>
    )
}

export default SignInSCreen
