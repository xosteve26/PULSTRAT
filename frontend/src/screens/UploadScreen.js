import React, {useState, useEffect} from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { LineWobble } from '@uiball/loaders'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { toast } from 'react-toastify';


const UploadScreen = () => {
    const navigate = useNavigate();
    
    
    const [file, setFile] = useState(null)
    const[fileName, setFileName] = useState('')
    const[loading,setLoading] = useState(false)
    const [error,setError] = useState(false)

    useEffect(() => {
        const loggedIn = window.localStorage.getItem("LoggedIn")
        
        if (!loggedIn || loggedIn === "false") {
        
            toast.error("Please login to access this route", {
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

    }, [navigate])
    
 
    const fileUploadHandler = (e) => {
  
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
 
    }
  
    const uploadHandler = async(e) => {
        e.preventDefault();
        setLoading(true)
        
        const data=new FormData()
        const baseURL=process.env.REACT_APP_BASE_URL
        const headers={
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
            'withCredentials' : true
        }
        if (!file) {
            toast.error("Kindly Upload an image", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
            setError(true)
            setLoading(false)
        }
        else{

            data.append('file', file)
            data.append('filename', fileName)
            const res = await axios.post(`${baseURL}/upload`, data, headers)
            
            setLoading(false)
            // const numberOfScans=window.sessionStorage.getItem('numberOfScans')
            // window.sessionStorage.setItem('numberOfScans',parseInt(numberOfScans)+1)
            // window.sessionStorage.setItem('cachingRequired',false)
            const cacheRecord=window.sessionStorage.getItem('cacheRecords')
            if(window.sessionStorage.getItem("cacheRecords") ){
                const cacheRecords=JSON.parse(cacheRecord)
                cacheRecords["1"]=false
                window.sessionStorage.setItem("cacheRecords",JSON.stringify(cacheRecords))
            }


            navigate(`/report/${res.data.id}`)
        }

    } 
   
    return (
        <>
        <HelmetProvider>
            <Helmet>
                <title>Pulstrat | Upload</title>
            </Helmet>
        </HelmetProvider>
        <Header />
    
        <section className="w-full px-8 py-16 bg-gray-100 xl:px-8">
            <div className="pt-28 max-w-5xl mx-auto">
                <div className="flex flex-col items-center md:flex-row">
                      
                    <div className="w-full space-y-5 md:w-3/5 md:pr-16">
                        
                        {file? <>
                                <h2 className="text-sm font-extrabold leading-none text-yellow-400 sm:text-3xl md:text-5xl">
                                    Preview
                                </h2>
                        </>:
                        <>
                        <p className="font-medium text-yellow-400 uppercase">Building Businesses</p>
                            <h2 className="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl">
                                        Kindly upload your scanned image on the right.
                            </h2>
                            <p className="text-xl text-gray-600 md:pr-16">Your data is secured with us, kindly attach an appropriate title along with the attachment for better understandability.</p>
                        </>}
    
                            {file && <img src={URL.createObjectURL(file)} alt="preview" width='400px' height='400px' />}
                    </div>
                
                   <div className="w-full mt-16 md:mt-0 md:w-2/5">
                    <form onSubmit={uploadHandler} encType='multipart/form-data'>
                        <div className="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 shadow-2xl px-7 rounded-3xl">
                            <h3 className="mb-6 text-2xl font-medium text-center">Upload Your Scanned Image</h3> 
                                    {error && <div className="flex justify-between items-center text-red-400"> <span>Kindly Upload An Image</span>  </div>}
                            <input type="text" name="email" className="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 focus:ring focus:ring-yellow-400 focus:outline-none rounded-full" placeholder="Title" />
                            <div className="mb-2"> <span>Attachments</span>
                                <div className="relative h-40 rounded-lg border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer">
                                    <div className="absolute">
                                        <div className="flex flex-col items-center "> <i className="fa fa-cloud-upload fa-3x text-gray-200"></i> <span className="block text-gray-400 font-normal">Attach you files here</span> <span className="block text-gray-400 font-normal">or</span> <span className="block text-blue-400 font-normal">Browse files</span> </div>
                                    </div> <input type="file" className="h-full w-full opacity-0" name="" onChange={fileUploadHandler}/>
                                </div>
                                <div className="flex justify-between items-center text-gray-400"> <span>Accepted file type:.jpeg only</span> <span className="flex items-center "><i className="fa fa-lock mr-1"></i> secure</span> </div>
                            </div>
                            <label>Chosen files</label>
                            <input type="text" name="email" className="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 focus:ring focus:ring-yellow-400 focus:outline-none rounded-full" placeholder={fileName} />
                            <div className="block">
                                        {!loading ? <button type='submit' className="w-full px-3 py-4 font-medium text-white bg-yellow-400 rounded-full"> Upload 
                                        </button> : <div className="flex justify-center"><div>

                                                <LineWobble
                                                    size={300}
                                                    lineWeight={8}
                                                    speed={1.25}
                                                    color="black"
                                                /> </div></div>}
                            </div>
                            <p className="w-full mt-4 text-sm text-center text-gray-500">Don't have an account? <a href="/sign-up" className="text-blue-500 underline">Sign up here</a></p>
                        </div>
                        </form>
                    </div>
                      
                </div>
            </div>
        </section>
        <Footer />
            
        </>
    )
}

export default UploadScreen
