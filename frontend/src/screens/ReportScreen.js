import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLungsVirus } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";
import logo from "../logo.png";
import { ThreeBody } from '@uiball/loaders'
import { useNavigate } from 'react-router-dom'
import moment from "moment";


import ReactToPrint from "react-to-print";
import axios from "axios";



const ReportComponent = React.forwardRef((props, ref) => {
  const location = useLocation();
  let ud = window.localStorage.getItem("userData");
  const userDataObject = JSON.parse(ud);


  return (
    <>
    
        <div className="h-[297mm] w-[210mm] p-12 pl-32" ref={ref}>
          <div className="flex justify-center border-2 border-yellow-400">

            <div className="justify-center">
              <img src={logo} width="180px" height="180px" />
            </div>
          </div>
          <div className="flex justify-between pt-16">
            <div>
              <p>{location.state['timestamps']['$date'].toString().slice(0, 10)}</p>
              <p className="pb-3 text-4xl font-bold">REPORT</p>
              <p className="text-sm font-bold">
                SCAN ID. <span className="pl-1 font-normal">{location.state['_id']['$oid']}</span>
              </p>
              <p className="text-sm font-bold">
                SCAN DATE: <span className="pl-1 font-normal">{moment(location.state['timestamps']['$date']).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}</span>
              </p>
            </div>


            <div className="pl-2 text-right">
              <p className="pb-2 text-4xl">{location.state['name']}</p>
              {/* <p className="text-sm text-black-400 font-bold">
              Email ID: <span className="font-normal">{userDataObject.email}</span>{" "}
            </p> */}
              <p className="text-sm text-black-400 font-bold">
                User ID: <span className="font-normal">{location.state['userId']['$oid']}</span>{" "}
              </p>
            <p className="text-sm text-black-400 font-bold">
              File Name: <span className="font-normal">{location.state['fileName'] ? location.state['fileName'] : 'N/A'}</span>{" "}
            </p>
            </div>
          </div>
          <div className="pt-16">
            <table className="w-full table-auto text-sm">
              <thead className="border-b-2">
                <tr className="h-10 text-left">
                  <th>Sl.No</th>
                  <th>Name</th>
                  <th>Disease</th>
                  <th>Email</th>
                  <th>Accuracy</th>
                  <th className="text-right">Prediction</th>
                </tr>
              </thead>
              <tbody>
                <tr className="h-10">
                  <td>1</td>
                  <td>{location.state['name']}</td>
                  <td>PNEUMONIA</td>
                  <td>{userDataObject.email}</td>
                  <td>93.15%</td>
                  <td className="text-right">
                    {location.state['result'] ? (
                      <span className="text-green-600">
                        {"Positive".toUpperCase()}
                      </span>
                    ) : (
                      <span className="text-red-600">{"Negative".toUpperCase()}</span>
                    )}
                  </td>

                  {/* <td className="text-right">360.00</td> */}
                </tr>
              </tbody>
            </table>

          </div>
          <div className="pt-6 flex justify-center ">
            <div>Original Scan<
              img src={"data:image/jpeg;base64," + location.state['originalImage']} />
            </div>

            <div className="pl-6">Localized Scan
            <img src={"data:image/jpeg;base64," + location.state['localizedImage']} /></div><br />
          </div>

          {/* <div className="flex justify-center ">
            <div>
            <img src={"data:image/jpeg;base64," + location.state['heatmapImage']} />
            </div>

          </div> */}

        </div>  
      
    </>
  );
});

const ReportScreen = () => {
  const componentRef = React.useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const ud=window.localStorage.getItem("userData");
  const userDataObject = JSON.parse(ud);
  
  const[ready, setReady]=useState(false)
  const params = useParams();
  const id = params.id;

  useEffect(async () => {
    
    const loggedIn = localStorage.getItem("LoggedIn")
    console.log("LOGGED IN ", loggedIn);
    if (!loggedIn || loggedIn === "false") {
      console.log("IN IF")
      alert("Please login to access this route")
      return navigate("/sign-in")
    }

    if(!window.sessionStorage.getItem(id)){
      if (!ready) {
        console.log("FETCH REPORT")
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/report/${id}`)
        window.sessionStorage.setItem(res.data.report["_id"]["$oid"], JSON.stringify(res.data.report))
        console.log(res.data.report)
        location.state = res.data.report
        setReady(true)
      }
    }else{
      if(!ready){
        console.log("IN ELSE CACHE REPORT")
        location.state = JSON.parse(window.sessionStorage.getItem(id))
        console.log(location)
        setReady(true)
      }
      
    }
    
    
  }, [location,ready])


  const emailHandler = async() => {
    const emailData={
      "userName":location.state.name,
      "userEmail":userDataObject.email,
      "scanId":location.state._id.$oid,
      "prediction": location.state.result,
      "scanTime":location.state.timestamps,
    }
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/email`, emailData);
    const data = await res.data;
    console.log(data)
    if (data.status){
      alert("Email sent successfully")
    }
    else{
      alert("Email not sent")
    }

  }

  return (
    <>
      <div>
        <Header />
        <div className="container w-full mx-auto pt-2">
          <div className="pt-32 w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
            <h1 className="text-center text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl pb-3">
              <span className="block xl:inline">Diagnostic</span>
              <span className="block text-yellow-400 xl:inline"> Report</span>
            </h1>
    {ready ?
    <>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 xl:w-1/3 p-3">
            <div className="bg-white border rounded shadow p-2">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded p-3 bg-green-600">
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      size="xl"
                      inverse
                    />
                  </div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h5 className="font-bold uppercase text-gray-500">
                    Infection Presence
                  </h5>
                  <h3
                    className={
                      location.state.result
                        ? "font-bold text-3xl text-green-500"
                        : "font-bold text-3xl text-red-500"
                    }
                  >
                    {location.state.result
                      ? "POSITIVE"
                      : "NEGATIVE"}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-3">
            <div className="bg-white border rounded shadow p-2">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded p-3 bg-pink-600">
                    <FontAwesomeIcon
                      icon={faLungsVirus}
                      size="xl"
                      inverse
                    />
                  </div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h5 className="font-bold uppercase text-gray-500">
                    Diagnosed Infection
                  </h5>
                  <h3 className="font-bold text-3xl">
                    {location.state.result
                      ? "PNEUMONIA"
                      : "Null"}{" "}
                    <span className="text-pink-500">
                      <i className="fas fa-exchange-alt"></i>
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 xl:w-1/3 p-3">
            <div className="bg-white border rounded shadow p-2">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                  <div className="rounded p-3 bg-red-600">
                    <FontAwesomeIcon
                      icon={faBullseye}
                      size="xl"
                      inverse
                    />
                  </div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h5 className="font-bold uppercase text-gray-500">
                    Diagnosed Accuracy
                  </h5>
                  <h3 className="font-bold text-3xl">
                    93.15%{" "}

                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      

        
      </>
    :
        <div className="grid place-items-center h-screen"><ThreeBody
          size={50}
          speed={1.1}
          color="black"
          style="content-center"
        /></div>
    }
          </div>
        </div>
      </div>

      
     
      {ready && 
      <>
        <ReactToPrint
          content={() => componentRef.current}
          documentTitle={location.state.name+"-"+location.state._id["$oid"]+"Scan"}
          trigger={() => <div className="h-[297mm] w-[210mm] p-2 pl-32"> <button className="bg-yellow-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
            <span>Download</span>
          </button></div>}
        />
        
        <div className="h-[297mm] w-[210mm] p-2 pl-32">
          <button onClick={emailHandler} className="ml-2 bg-yellow-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"><img className="fill-current w-6 h-6 mr-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAADGElEQVR4nO2cLW8VQRSGH9qkggCOJpAUhSsJKH5Fq6AGS4LiQ/IDQKAq+BBY/gACx4cHQwUWwUfAoHpbFKWL2Huh3LS7s3Nm9sze+z7JSSq203POOzPv3t25BSGEEEIIIYQQQgghhBBCiP9ZBu4DW8AuUCmoxr14D9wDTkd3t4UNYFRAsaXHNnAlssdHsgHsF1DcUGKfQBGOBVyzDHwEToYMKP4yAs4DP5ouWggY6DZqfgyngJttF4UIsGbPZW5Zb7sgZAvaAU7Yc5lLdqhXwpGErIBrwOck6cwX34HrqQY7DjwA9vC/wyg9fgNPyeSbl4B3BRRZamwBl6O7G8gCcIP6A4d3waXET+AusGjoa2fOAs8SFjHUeAGcM/bSxDrwCf9G9B3fqJ8QFME8mXRWk7Uy6ybdi8lO03WPm0WTjjHZM9QeaSY2gVkxaesENGNdgkM16RiTvQi8nRrHzHRiMSY0JJO21PfrkPHMNM2Qqx3HKt2kY1b4Gs0r3Exb0rNg0haTbRvbTK4CSjHp3BPITO4l7GXSqUy2KAEqyjfpvvMzY5lhpZl0DpMtVoBJlGDSOU22eAFiG5DKpL0ngJlUs7CiX5OONdnUW6CZlMlU5DfB0m4CzKROyDJD20y6xNtgM7kSm0SKPdrTZAcvQEV9jvIO3Rq4Ajwfx0qH31sc/62+Tnqb6SPJSeR+4+TxMNBMn8lW/DPRxiN9HfF8HG6m74QnkerUwTr10UqvOsx4JT6J2HM3pTxtNeNdQEW3u5zS3jeY8S7gYLSZdIlv3Mx4FzAdh5l0ye+cGwn5gkYSFTPwFbg1/vkR3T4L9Eljj4cswFBo7HHIN2RERiSAMxLAGQngjARwRgI4IwGckQDOSABnJIAzEsAZCeCMBHBGAjgjAZwJEWA3exazy6jtghABviRIZF5p7V2IAK8SJDKvvEwxyAXKfNldeuwBqxH9PpQnBRQ0tHgY1ekjWALeFFDUUOL1uGdJWQIeo+2oKfaoZ37y5h9kFdgEPlD/Y1Lvor1jZ9yLTRLu+UIIIYQQQgghhBBCCCGEmB3+AJUCj1SQZSlaAAAAAElFTkSuQmCC" />Email</button>
        </div>
          
        
        <ReportComponent ref={componentRef} />
        
        <Footer /> 
      </>
      }


    </>
  );
};


export default ReportScreen;
