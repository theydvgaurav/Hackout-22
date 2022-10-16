import React, { useState, useEffect } from 'react';
import { saveAs } from "file-saver";
import axios from 'axios'

const DownloadFile = props => {
    const url = props.curr;

    console.log(url, props,"test-url");

    const [downloadUrl, setDownloadUrl] = useState('');

    const downDoc = (docId) => async dispatch => {
    
        const res = await axios({ url: url, method: 'GET', responseType: 'blob' })
        .then((response) => {
          console.log(response)
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${docId.originalName}`);
          document.body.appendChild(link);
          link.click();
        });
    }

    useEffect(() => {
        console.log(downDoc("it"))
        // fetch(url, { 
        //     mode: 'no-cors',
        //     })
        // .then(response => {
        //     console.log(response, "response");
        //     response.blob().then(data =>)
        // })
        // .then(blob => {
        //     console.log(blob, "blob");
        //   const url = window.URL.createObjectURL(new Blob([blob]));
        //   console.log(url);
        //   setDownloadUrl(url);
        // });
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

    // const saveFile = () => {
    //     saveAs(
    //       url,
    //       "abc.pdf"
    //     );
    //   };

    return (
        <div>
            {/* <button onClick={saveFile}>download</button> */}
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