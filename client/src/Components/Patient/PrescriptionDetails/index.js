import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import DownloadLink from "react-download-link";
import './PrescriptionDetails.css'
import DownloadFile from '../../DownloadFile';

const PrescriptionDetails = () => {
  const params = useParams();

  const [prescriptionsArray, setPrescriptionsArray] = useState([]);
  const [url, setUrl] = useState('https://hackout-prescription-22.079c7abdeddc5c7f2ee2777df63625d6.r2.cloudflarestorage.com/634b088a9689df61037d7e9e/1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=e93b99ee3452b271e1ec2696de3aaa86%2F20221015%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20221015T202809Z&X-Amz-Expires=518400&X-Amz-Signature=22f6967a3e4220e31e7791bafea9837b7c2fc3d84a43120b87d812cb0000f4b8&X-Amz-SignedHeaders=host');
  const [downloadUrl, setDownloadUrl] = useState();
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


  // useEffect(() => {
  //   if (url) {
  //     fetch(url)
  //       .then(response => response.blob())
  //       .then(blob => {
  //         const url = window.URL.createObjectURL(new Blob([blob]));
  //         setDownloadUrl(url);
  //       });
  //   }

  // }, [url]);

  // const getFileExtension = fileName => {
  //   const fileIndex = fileName.indexOf('.');
  //   const name = fileName.substring(fileIndex);
  //   const check = ['.pdf', '.jpg', '.png', '.jpeg'].includes(name);
  //   if (check) return name;
  //   return '.pdf';
  // };

  return (
    <div className='prescriptionDetailsMainContainer'>
      {
        prescriptionsArray.map(curr => {
          console.log(curr.presignedURL[0], "URL");
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

                <DownloadFile
                  curr={curr.presignedURL[0]}
                />

                {/* <a
                  href='https://hackout-prescription-22.079c7abdeddc5c7f2ee2777df63625d6.r2.cloudflarestorage.com/634b088a9689df61037d7e9e/1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=e93b99ee3452b271e1ec2696de3aaa86%2F20221015%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20221015T202809Z&X-Amz-Expires=518400&X-Amz-Signature=22f6967a3e4220e31e7791bafea9837b7c2fc3d84a43120b87d812cb0000f4b8&X-Amz-SignedHeaders=host'
                  download
                >
                  Click to download
                </a> */}
                {/* <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  download="syllabus.jpg"
                  className='patientDetailsDownload'
                >
                  Download Syllabus
                </a> */}

              </div>
            </div>
          );
        })
      }
    </div>
  )
}

export default PrescriptionDetails
