import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { FileUploader } from "react-drag-drop-files";
import './PrescriptionDoctorDetails.css'
import DownloadFileDoctor from '../DownloadFileDoctor';

const PrescriptionDoctorDetails = () => {
  const params = useParams();

  const [prescriptionsArray, setPrescriptionsArray] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [filesArray, setFilesArray] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('')

  const doctorInfo = JSON.parse(localStorage.getItem("doctorInformation"));

  const fileTypes = ["JPEG", "PNG", "GIF", "PDF"];

  const handleChange = (file) => {
    setFilesArray([...filesArray, file[0]])
  };

  const _onUploadFiles = () => {
    const formData = new FormData();
    formData.append('category', 'prescriptions');
    filesArray.map(cur => (
      formData.append('files', cur)
    ));

    // const config = {
    //     method: 'post',
    //     url: 'http://localhost:5000/create-presc',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${doctorInfo.token}`
    //     },
    //     data: formData
    // };

    // axios(config)
    //     .then(function (response) {
    //         console.log(response.data);
    //         history('/doctor-portal')
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });

  }

  const getData = async () => {
    const config = {
      method: 'get',
      url: `http://localhost:5000/get-pat-presc/${params.id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${doctorInfo.token}`
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

  return (
    <div className='prescriptionDetailsMainContainer'>
      <div className='secondContainer'>
        <div className='newPatient' onClick={() => setOpenModal(!openModal)}>
          Add New Prescription +
        </div>
        {
          openModal ? <div className='fileUpload'>
            <form>
              <div className='inputNameBox'>
                <input
                  type="text"
                  onChange={e => setName(e.target.value)}
                  placeholder="Name"
                  required
                />
              </div>
              <div className='inputEmailBox'>
                <input
                  type="email"
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email"
                  value={prescriptionsArray ? prescriptionsArray[0].PatientId.Email : ''}
                  required
                />
              </div>

              <div className='inputDescriptionBox'>
                <textarea
                  type="text"
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Description"
                  required
                />
              </div>

              <FileUploader
                multiple={true}
                handleChange={handleChange}
                name="file"
                types={fileTypes}
                maxSize="5"
              />
            </form>

          </div> : null

        }
        {
          filesArray.length > 0 && email && description && openModal && <div className='buttonContainer'>
            <div className='uploadButton' onClick={_onUploadFiles}>Upload</div>
          </div>
        }

      </div>
      <div className='prescriptionDetailsMainContainer'>
        {
          prescriptionsArray.map((curr, i) =>
            <DownloadFileDoctor curr={curr} index={i} key={curr._id} />
          )
        }
      </div>
    </div>
  )
}

export default PrescriptionDoctorDetails
