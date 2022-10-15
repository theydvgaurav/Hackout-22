import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './PrescriptionDetails.css'

const PrescriptionDetails = () => {
  const params = useParams();

  const [prescriptionsArray, setPrescriptionsArray] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("patientInformation"));
  
  const getData = async () => {
    const config = {
      method: 'get',
      url: `http://localhost:5000/get-doc-presc/${params.id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    axios(config).then(res => {
      // console.log(res.data.data);
      setPrescriptionsArray(res.data.data)
    }).catch(err => {
      console.log(err);
    })
  }

  console.log(prescriptionsArray);

  useEffect(() => {
    getData()
  }, [params.id])

  return (
    <div className='prescriptionDetailsMainContainer'>
      {
        prescriptionsArray.map(curr => {
          return (
            <div className='patientDetailsContainer' key={curr._id}>
              <div
                // onClick={() => _onPatientDetails(curr._id)} 
                className='patientDetailsSubContainer'
              >
                <div className='patientDetailsname'>
                  <div>Patient Name: {curr.PatientName}</div>
                  <div>Doctor Name: {curr.DoctorId.Name}</div>
                  <div>Description: {curr.Description}</div>
                </div>

                <div className='patientDetailsDownload'>Download Report</div>
              </div>
            </div>
          );
        })
      }
    </div>
  )
}

export default PrescriptionDetails
