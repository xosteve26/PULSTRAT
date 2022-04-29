import React from 'react'
import Header from '../components/Header'
import { useState, useEffect } from 'react'
import axios from 'axios'

const SignUpScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()
        const baseURL = process.env.REACT_APP_BASE_URL
        const data = JSON.stringify({ email, password, name })
        const res = await axios.post(`${baseURL}/register`, { email, password, name })
        console.log(res.data.status)
        if (res.data.status) {
            window.sessionStorage.setItem('LoggedIn', false)
            window.location.href = '/sign-in'
        }
        else {
            alert('Invalid Credentials')
        }

    }
    return (
        <>
            <Header />
            <section class="w-full bg-white">

                <div class="mx-auto max-w-7xl">
                    <div class="flex flex-col lg:flex-row">
                        <div class="relative w-full bg-cover lg:w-6/12 xl:w-7/12 bg-gradient-to-r from-white via-white to-gray-100">
                            <div
                                class="relative flex flex-col items-center justify-center w-full h-full px-10 my-20 lg:px-16 lg:my-0">
                                <div class="flex flex-col items-start space-y-8 tracking-tight lg:max-w-3xl">
                                    <div class="relative">
                                        <p class="mb-2 font-medium text-gray-700 uppercase">Work smarter</p>
                                        <h2 class="text-5xl font-bold text-gray-900 xl:text-6xl">Features to help you work smarter
                                        </h2>
                                    </div>
                                    <p class="text-2xl text-gray-700">We've created a simple formula to follow in order to gain more
                                        out of your business and your application.</p>
                                    <a href="#_"
                                        class="inline-block px-8 py-5 text-xl font-medium text-center text-white transition duration-200 bg-yellow-400 hover:bg-yellow-500 ease rounded-full">Get
                                        Started Today</a>
                                </div>
                            </div>
                        </div>

                        <div class="w-full bg-white lg:w-6/12 xl:w-5/12">
                            <div class="flex flex-col items-start justify-start w-full h-full p-10 lg:p-16 xl:p-24">
                                <h4 class="w-full text-3xl font-bold">Signup</h4>
                                <form onSubmit={submitHandler}>
                                <p class="text-lg text-gray-500">or, if you have an account you can <a href="#_"
                                        class="text-yellow-400 underline">sign in</a></p>
                                <div class="relative w-full mt-10 space-y-8">
                                    <div class="relative">
                                        <label class="font-medium text-gray-900">Name</label>
                                        <input type="text"
                                            class="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-100 focus:outline-none focus:ring-4 focus:ring-black-400 focus:ring-opacity-50 rounded-full"
                                            placeholder="Enter Your Name" onChange={(e)=> setName(e.target.value)}/>
                                    </div>
                                    <div class="relative">
                                        <label class="font-medium text-gray-900">Email</label>
                                        <input type="text"
                                            class="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-100 focus:outline-none focus:ring-4 focus:ring-black-400 focus:ring-opacity-50 rounded-full"
                                                placeholder="Enter Your Email Address" onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                    <div class="relative">
                                        <label class="font-medium text-gray-900">Password</label>
                                        <input type="password"
                                            class="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-100 focus:outline-none focus:ring-4 focus:ring-black-400 focus:ring-opacity-50 rounded-full"
                                                placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                    <div class="relative">
                                        <button type='submit'
                                            class="inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-yellow-400 hover:bg-yellow-500 ease rounded-full">Create
                                            Account</button>
                                        <a href="#_"
                                            class="inline-block w-full px-5 py-4 mt-3 text-lg font-bold text-center text-gray-900 transition duration-200 bg-white border border-gray-300 hover:bg-gray-100 ease rounded-full">Sign
                                            up with Google</a>
                                    </div>
                                  
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                
            </section>
            
        </>
    )
}

export default SignUpScreen
