import React from 'react'
import Header from '../components/Header'

const SignInSCreen = () => {
    return (
        <>
        <Header />
        <section class="w-full px-8 py-16 bg-gray-100 xl:px-8">
            <div class="max-w-5xl mx-auto">
                <div class="flex flex-col items-center md:flex-row">

                    <div class="w-full space-y-5 md:w-3/5 md:pr-16">
                        <p class="font-medium text-yellow-400 uppercase">Building Businesses</p>
                        <h2 class="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl">
                            Changing The Way People Do Business.
                        </h2>
                        <p class="text-xl text-gray-600 md:pr-16">Learn how to engage with your visitors and teach them about your mission. We're revolutionizing the way customers and businesses interact.</p>
                    </div>

                    <div class="w-full mt-16 md:mt-0 md:w-2/5">
                        <div class="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 shadow-2xl px-7 rounded-3xl">
                            <h3 class="mb-6 text-2xl font-medium text-center">Sign in to your Account</h3>
                            <input type="text" name="email" class="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 focus:ring focus:ring-yellow-400 focus:outline-none rounded-full" placeholder="Email address" />
                            <input type="password" name="password" class="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 focus:ring focus:ring-yellow-400 focus:outline-none rounded-full" placeholder="Password" />
                            <div class="block">
                                <button class="w-full px-3 py-4 font-medium text-white bg-yellow-400 rounded-full">Log Me In</button>
                            </div>
                            <p class="w-full mt-4 text-sm text-center text-gray-500">Don't have an account? <a href="#_" class="text-blue-500 underline">Sign up here</a></p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
 
        </>
    )
}

export default SignInSCreen
