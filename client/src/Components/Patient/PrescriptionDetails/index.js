import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './PrescriptionDetails.css'
import DownloadFile from '../../DownloadFile';

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

  useEffect(() => {
    getData()
  }, [params.id])

  return (
    <div className='prescriptionDetailsMainContainer'>
      <div className='doctorNameInPatientDashboard'>{prescriptionsArray.length > 0 && <div>Dr. {prescriptionsArray[0].DoctorId.Name}</div>}</div>
      {
        prescriptionsArray.map((curr, i) =>
          <DownloadFile curr={curr} index={i} key={curr._id} />
        )
      }
    </div>
  )
}

export default PrescriptionDetails
