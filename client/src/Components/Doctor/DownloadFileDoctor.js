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

    const downloadImage = (newUrl) => {
        saveAs(newUrl, `image_${getFileExtension(newUrl)}`);
    }

    return (
        <div className='patientDetailsContainer' >
            <div className='patientDetailsChildContainer'>
                <div className='patientDetailsname'>
                    <div>Patient Name: {curr.PatientName}</div>
                    <div>Description: {curr.Description}</div>
                </div>
            </div>
            <div
                className='patientDetailsDownload'
                onClick={() => downloadImage(curr.presignedURL[0])}
            >
                Download
            </div>
        </div>
    );
};

export default DownloadFileDoctor;
