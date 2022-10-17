import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './PrescriptionDetails.css'
import DownloadFile from '../../DownloadFile';
// import { saveAs } from "file-saver";

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
      setPrescriptionsArray(res.data.data)
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    getData()
  }, [params.id])

  // const getFileExtension = fileName => {
  //   if (fileName.includes('.pdf')) {
  //     return '.pdf';
  //   } else if (fileName.includes('.jpg')) {
  //     return '.jpg';
  //   } else if (fileName.includes('.jpeg')) {
  //     return '.jpeg';
  //   } else if (fileName.includes('.png')) {
  //     return '.png';
  //   }
  // };

  // const downloadImage = (newUrl) => {
  //   console.log(newUrl);
  //   saveAs(newUrl, `image_${getFileExtension(newUrl)}`);
  // }

  //   useEffect(() => {
  //     setUrl(curr.presignedURL[0])
  // }, [curr.index])

  return (
    <div className='prescriptionDetailsMainContainer'>
      {
        prescriptionsArray.map((curr, i) =>
          <DownloadFile curr={curr} index={i} key={curr._id} />
        )
      }
    </div>
  )
}

export default PrescriptionDetails
