import React from 'react';
import { saveAs } from "file-saver";

const DownloadFile = props => {
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

    const handleChange = event => {
        saveAs(event.target.value, `image_${getFileExtension(event.target.value)}`);
    };

    return (
        <div className='patientDetailsContainer' >
            <div className='patientDetailsChildContainer'>
                <div className='patientDetailsname'>
                    <div>Patient Name: {curr.PatientName}</div>
                    <div>Doctor Name: {curr.DoctorId.Name}</div>
                    <div>Description: {curr.Description}</div>
                </div>
            </div>
            <div className='selectDiv'>
                <select
                    onChange={handleChange}
                    name="prescription"
                    id="prescription-select"
                    className='select'
                >
                    <option value="none" selected disabled hidden>Select a File to download</option>
                    {curr.presignedURL.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default DownloadFile;
