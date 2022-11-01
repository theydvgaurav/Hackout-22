import React from 'react';
import { saveAs } from "file-saver";

const DownloadFileDoctor = props => {
    const { curr } = props;

    const getFileExtension = fileName => {
        if (fileName.includes('.pdf')) {
            return '.pdf';
        } else if (fileName.includes('.jpg')) {
            return '.jpg';
        } else if (fileName.includes('.jpeg')) {
            return '.jpeg';
        } else if (fileName.includes('.png')) {
            return '.png';
        }
    };

    const handleSelectChange = event => {
        fetch(event.target.value)
        .then(res => res.blob())
        .then((blob) => {
            saveAs(blob, `image_${getFileExtension(event.target.value)}`);
        })
    };


    return (
        <div className='patientDetailsContainer' >
            <div className='patientDetailsChildContainer'>
                <div className='patientDetailsname'>
                    <div>Patient Name: {curr.PatientName}</div>
                    <div>Description: {curr.Description}</div>
                </div>
            </div>
            <div className='selectDiv'>
                <select
                    onChange={handleSelectChange}
                    name="prescription"
                    id="prescription-select"
                    className='select'
                >
                    <option value="none" selected disabled hidden>Select a File to download</option>
                    {curr.presignedURL.map((option, index) => (
                        <option key={index} value={option}>
                           Prescription No.{`${index+1}`}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default DownloadFileDoctor;
