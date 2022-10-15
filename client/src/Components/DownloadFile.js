import React, { useState, useEffect } from 'react';

const DownloadFile = props => {
    const {
        url, index
    } = props;

    const [downloadUrl, setDownloadUrl] = useState('');

    useEffect(() => {
        fetch(url)
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          console.log(url);
          setDownloadUrl(url);
        });
    }, []);

    // const onButtonClick = () => {
    //     // using Java Script method to get PDF file
    //     fetch(url).then(response => {
    //         response.blob().then(blob => {
    //             // Creating new object of PDF file
    //             const fileURL = window.URL.createObjectURL(blob);
    //             // Setting various property values
    //             let alink = document.createElement('a');
    //             alink.href = fileURL;
    //             alink.download = 'SamplePDF.pdf';
    //             alink.click();
    //         })
    //     })
    // }

    const getFileExtension = fileName => {
        console.log(fileName);
        const fileIndex = fileName.indexOf('.');
        const name = fileName.substring(fileIndex);
        const check = ['.pdf', '.jpg', '.png', '.jpeg'].includes(name);
        if (check) return name;
        return '.pdf';
    };

    return (
        <div>
            <a
                href={downloadUrl}
                // download={`abc_${getFileExtension(url)}`}
                download='abc.pdf'
            >
                <div>Download</div>

            </a>
            {/* <button onClick={onButtonClick}>
                Download PDF
            </button> */}
        </div>
    );
};

export default DownloadFile;