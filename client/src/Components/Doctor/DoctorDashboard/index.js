import React, { useState } from 'react';
import { FileUploader } from "react-drag-drop-files";
import PatientDetailsCard from '../PatientDetailsCard';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
    const [openModal, setOpenModal] = useState(false);
    const [filesArray, setFilesArray] = useState([]);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')

    const fileTypes = ["JPEG", "PNG", "GIF", "PDF"];

    const handleChange = (file) => {
        setFilesArray([...filesArray, file[0]])
    };
    console.log(filesArray);

    const _onUploadFiles = () => {
        const formData = new FormData();
        filesArray.map(cur => (
            formData.append('files', cur)
        ));

        console.log(description);
    }

    return (
        <div className='mainDashboardContainer'>
            <div className='mainHeader'>
                Doctor-Portal
            </div>
            <div className='secondContainer'>
                <div className='newPatient' onClick={() => setOpenModal(!openModal)}>
                    Add New Patient +
                </div>
                {
                    openModal ? <div className='fileUpload'>
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
                    </div> : null
                }
                {
                    filesArray.length > 0 && email && description && openModal && <div className='buttonContainer'>
                        <div className='uploadButton' onClick={_onUploadFiles}>Upload</div>
                    </div>
                }
            </div>
            <div className='clientDetails'>
                <div className='patientDetails'>Patient Details</div>
                <div className='patientDetailsContainer'>
                    <PatientDetailsCard />
                </div>
            </div>
        </div>
    )
}

export default DoctorDashboard
