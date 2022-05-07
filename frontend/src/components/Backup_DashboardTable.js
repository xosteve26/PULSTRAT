import React from 'react'
import moment from "moment";
import { useNavigate } from 'react-router-dom'

const Backup_DashboardTable = (props) => {
  const navigate = useNavigate();
  const received=props.received
  const dates=props.dates
  const data=props.data
  return (
    <>
      <table className="w-full text-md text-left text-gray-500 dark:text-gray-400">
               {received && <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Scan ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
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
                </thead> }
                <tbody>
                   
                    
                    {received  && data.map(item => (
                        
                        <tr key={item._id.$oid.toString()} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                {item._id.$oid.toString()}
                            </td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                {item.name}
                            </td>
                            <td className="px-6 py-4">
                                {item.result == false ? <span className="text-red-600">Negative</span> : <span className="text-green-600">Positive</span>}
                            </td>
                            <td className="px-6 py-4">
                                PNEUMONIA
                            </td>
                            <td className="px-6 py-4">
                                {item.timestamps['$date']}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button type='button' onClick={() => navigate('/report', { state: { prediction: item.result, name: item.name, id: item._id.$oid.toString(), timestamps: item.timestamps['$date'], userId: item.userId.$oid.toString(), img: item.originalImage, heatmap: item.heatmapImage, localized: item.localizedImage } })} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</button>
                            </td>
                        </tr>
                    ))
                             

                        } 

                </tbody>
            </table>
    </>
  )
}

export default Backup_DashboardTable