import React from 'react'
import moment from "moment";
import { useNavigate } from 'react-router-dom'
const DashboardTable = (props) => {
    const navigate = useNavigate();
    const data= props.data
    const dates=props.dates

  return (
      <>
              {dates && dates.map(date => {
                  const filtered = data.filter(x => x.timestamps["$date"].slice(0, 10) === date)
                  filtered.reverse()
                  console.log("FILTERED", filtered)
                  return (
                      <>
                          <h1 className="px-6 py-4 text-left text-1xl font-extrabold tracking-tight text-gray-900 sm:text-md md:text-lg lg:text-1xl xl:text-2xl pb-3">
                              <span className="block text-yellow-400 md:inline">{moment(date).format("MMMM Do YYYY")}</span>
                          </h1>
                          
                          <table className="w-full text-md text-left text-gray-500 dark:text-gray-400">
                              <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                  <tr>
                                      <th scope="col" className="px-6 py-3">
                                          Scan ID
                                      </th>
                                      <th scope="col" className="px-6 py-3">
                                          File Name
                                      </th>
                                      <th scope="col" className="px-6 py-3">
                                          Diagnosis
                                      </th>
                                      <th scope="col" className="px-6 py-3">
                                          Category
                                      </th>
                                      <th scope="col" className="px-6 py-3">
                                          Date
                                      </th>

                                      <th scope="col" className="px-6 py-3">
                                          <span className="sr-only">View</span>
                                      </th>
                                  </tr>
                              </thead>
                          <tbody>
                              {filtered.map(item => (
                                  <tr key={item._id.$oid.toString()} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                      <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                          {item._id.$oid.toString().slice(0,10)}
                                      </td>
                                      <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                          {item.fileName ? item.fileName : "N/A"}
                                      </td>
                                      <td className="px-6 py-4">
                                          {item.result == false ? <span className="text-red-600">Negative</span> : <span className="text-green-600">Positive</span>}
                                      </td>
                                      <td className="px-6 py-4">
                                          PNEUMONIA
                                      </td>
                                      <td className="px-6 py-4">
                                          {moment(item.timestamps['$date']).format("MMMM Do YYYY, h:mm:ss a")}
                                      </td>
                                      <td className="px-6 py-4 text-right">

                                          <button type='button' onClick={() => navigate(`/report/${item._id.$oid.toString()}`)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</button>

                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                          </table>
                      </>

                  )
              })}

          
      </>
    
  )
}

export default DashboardTable