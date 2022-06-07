import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Helmet, HelmetProvider } from 'react-helmet-async'

const AboutUsScreen = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Pulstrat | About</title>
        </Helmet>
      </HelmetProvider>
      <Header />
      <h1 className="pt-32 text-center text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl pb-3">
        <span className="block xl:inline ">About</span>
        <span className="block text-yellow-400 xl:inline "> Us</span>
      </h1>

      <section class="text-gray-600 body-font">
        <div class="container px-5 py-20 mx-auto">
          <div class="flex flex-col text-center w-full mb-20">
            <h2 class="text-xs text-yellow-500 tracking-widest font-medium title-font mb-1">PULSTRAT</h2>
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">A Pneumonia Detecting Application</h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              Healthcare image classification is crucial in
              anomaly diagnosis. The disease Pneumonia is a form of acute
              respiratory infection that affects either one or both the lungs.
              It is one of the most life-threatening diseases and is the leading
              cause of death among children. Conventional methods of
              detection have reached their performance limits. Radiologists
              on average observe hundreds of chest x-rays per day.
              Furthermore, the use of the conventional methods requires
              significant time and effort to extract and select categorical
              features. In image classification, deep neural networks
              dominate the field with efficient results using convolutional
              neural network architectures. Given the need and the technology made available, we, the founders of "Pulstrat",felt the need to develop an application that could be used by radiologists to detect pneumonia in the image at a much faster rate. Moreover, the application is not limited to just radiologists, the general public, especially the ones in poverty sticken areas, where access to radiologists may not be freely available or accessible, could avail our services to get an instant diagnosis.
              
            </p>
       
          </div>
        </div>
        </section>
      <h1 className="text-center text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl ">
        <span className="block text-yellow-400 xl:inline">Meet </span>
        <span className="block xl:inline ">The</span>
        <span className="block text-yellow-400 xl:inline"> Team</span>
      </h1>
      <section className="w-full py-12 bg-white lg:py-22">
        <div className="max-w-6xl px-12 mx-auto text-center">
           {/* <div className="space-y-12 md:text-center">
            <div className="max-w-3xl mb-20 space-y-5 sm:mx-auto sm:space-y-4">
              <p className="text-xl text-gray-500">We take pride in the people we work with. This is because we all collectively help each other become more awesome every day.</p>
            </div>
          </div> */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="w-full border border-gray-200 rounded-lg shadow-sm">
              <div className="flex flex-col items-center justify-center p-10">
                
                <img className="w-32 h-32 mb-6 rounded-full" src="https://avatars.githubusercontent.com/u/39564496?v=4" />
                <h2 className="text-lg font-medium">Syed Saifullah</h2>
                <p className="font-medium text-yellow-400">Founder</p>
                <p className="text-gray-400">Member as of 2021
                </p></div>
              <div className="flex border-t border-gray-200 divide-x divide-gray-200">
                
                <a href="https://github.com/syed-saif" target="_blank" className="flex-1 block p-5 text-center text-gray-300 transition duration-200 ease-out hover:bg-gray-100 hover:text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-auto fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </a>
                <a href="https://www.linkedin.com/in/syed--saif/" target="_blank" className="flex-1 block p-5 text-center text-gray-300 transition duration-200 ease-out hover:bg-gray-100 hover:text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-auto fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
              </div>
            </div>
            <div className="w-full border border-gray-200 rounded-lg shadow-sm">
              <div className="flex flex-col items-center justify-center p-10">
                <img className="w-32 h-32 mb-6 rounded-full" src="https://avatars.githubusercontent.com/u/41387473?v=4" />
                <h2 className="text-lg font-medium">Naveen G</h2>
                <p className="font-medium text-yellow-400">Founder</p>
                <p className="text-gray-400">Member as of 2021
                </p></div>
              <div className="flex border-t border-gray-200 divide-x divide-gray-200">
               
                <a href="https://github.com/AquamanRanda" target="_blank" className="flex-1 block p-5 text-center text-gray-300 transition duration-200 ease-out hover:bg-gray-100 hover:text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg"  className="w-6 h-6 mx-auto fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </a>
                <a href="https://www.linkedin.com/in/naveenthelol/" target="_blank" className="flex-1 block p-5 text-center text-gray-300 transition duration-200 ease-out hover:bg-gray-100 hover:text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-auto fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
              </div>
            </div>
            <div className="w-full border border-gray-200 rounded-lg shadow-sm">
              <div className="flex flex-col items-center justify-center p-10">
                <img className="w-32 h-32 mb-6 rounded-full" src="https://res.cloudinary.com/xzen/image/upload/v1651934424/1615018469277_hiseea.jpg" />
                <h2 className="text-lg font-medium">Stephen George</h2>
                <p className="font-medium text-yellow-400">Founder</p>
                <p className="text-gray-400">Member as of 2021
                </p></div>
              <div className="flex border-t border-gray-200 divide-x divide-gray-200">
               
                <a href="https://github.com/xosteve26" target="_blank" className="flex-1 block p-5 text-center text-gray-300 transition duration-200 ease-out hover:bg-gray-100 hover:text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-auto fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </a>
                <a href="https://www.linkedin.com/in/stephen-george-17a190208/" target="_blank" className="flex-1 block p-5 text-center text-gray-300 transition duration-200 ease-out hover:bg-gray-100 hover:text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-auto fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default AboutUsScreen