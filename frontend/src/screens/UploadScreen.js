import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { LineWobble } from '@uiball/loaders'




const UploadScreen = () => {
    const [file, setFile] = useState(null)
    const[fileName, setFileName] = useState('')
    const [prediction, setPrediction] = useState(null)
    const[loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    const navigate = useNavigate();
    console.log(file)
 
    const fileUploadHandler = (e) => {
  
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
 
    }
  
    const uploadHandler = async(e) => {
        e.preventDefault();
        setLoading(true)
        
        const data=new FormData()
        const baseURL='http://localhost:5000'
        const headers={
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*'
        }
        if (!file) {
            setError(true)
            setLoading(false)
        }
        else{

            data.append('file', file)
            data.append('filename', fileName)
            const res = await axios.post(`${baseURL}/upload`, data, headers)
            console.log(res)
            setPrediction(res.data.prediction)
            setLoading(false)

            navigate('/report', { state: { prediction: res.data.prediction } })
        }
        

       
    } 
   
    return (
        <>
        <Header />
            
        <section class="w-full px-8 py-16 bg-gray-100 xl:px-8">
            <div class="max-w-5xl mx-auto">
                <div class="flex flex-col items-center md:flex-row">

                    <div class="w-full space-y-5 md:w-3/5 md:pr-16">
                        
                        {file? <>
                                <h2 class="text-sm font-extrabold leading-none text-yellow-400 sm:text-3xl md:text-5xl">
                                    Preview
                                </h2>
                        </>:
                        <>
                        <p class="font-medium text-yellow-400 uppercase">Building Businesses</p>
                            <h2 class="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl">
                                        Kindly upload your scanned image on the right.
                            </h2>
                            <p class="text-xl text-gray-600 md:pr-16">Your data is secured with us, kindly attach an appropriate title along with the attachment for better understandability.</p>
                        </>}
    
                            {file && <img src={URL.createObjectURL(file)} alt="preview" width='400px' height='400px' />}
                    </div>
                
                   <div class="w-full mt-16 md:mt-0 md:w-2/5">
                    <form onSubmit={uploadHandler} encType='multipart/form-data'>
                        <div class="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 shadow-2xl px-7 rounded-3xl">
                            <h3 class="mb-6 text-2xl font-medium text-center">Upload Your Scanned Image</h3> 
                                    {error && <div class="flex justify-between items-center text-red-400"> <span>Kindly Upload An Image</span>  </div>}
                            <input type="text" name="email" class="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 focus:ring focus:ring-yellow-400 focus:outline-none rounded-full" placeholder="Title" />
                            <div class="mb-2"> <span>Attachments</span>
                                <div class="relative h-40 rounded-lg border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer">
                                    <div class="absolute">
                                        <div class="flex flex-col items-center "> <i class="fa fa-cloud-upload fa-3x text-gray-200"></i> <span class="block text-gray-400 font-normal">Attach you files here</span> <span class="block text-gray-400 font-normal">or</span> <span class="block text-blue-400 font-normal">Browse files</span> </div>
                                    </div> <input type="file" class="h-full w-full opacity-0" name="" onChange={fileUploadHandler}/>
                                </div>
                                <div class="flex justify-between items-center text-gray-400"> <span>Accepted file type:.jpeg only</span> <span class="flex items-center "><i class="fa fa-lock mr-1"></i> secure</span> </div>
                            </div>
                            <label>Chosen files</label>
                            <input type="text" name="email" class="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 focus:ring focus:ring-yellow-400 focus:outline-none rounded-full" placeholder={fileName} />
                            <div class="block">
                                        <button type='submit' class="w-full px-3 py-4 font-medium text-white bg-yellow-400 rounded-full">{!loading == true ? 'Upload' : 
                                            <LineWobble
                                                className='block'
                                                size={315}
                                                lineWeight={5}
                                                speed={1.75}
                                                color="black"
                                            />}</button>
                            </div>
                            <p class="w-full mt-4 text-sm text-center text-gray-500">Don't have an account? <a href="#_" class="text-blue-500 underline">Sign up here</a></p>
                        </div>
                        </form>
                    </div>
                      
                </div>
            </div>
        </section>
            
        </>
    )
}

export default UploadScreen
