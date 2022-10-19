import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
    const history = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [filesArray, setFilesArray] = useState([]);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')
    const [patientsArray, setPatientsArray] = useState([]);

    const handleChange = (e) => {
        setFilesArray([...filesArray, ...e.target.files])
    };

    const doctorInfo = JSON.parse(localStorage.getItem("doctorInformation"));

    const _onUploadFiles = () => {
        const formData = new FormData();
        filesArray.map(cur => {
            return (
                formData.append('files', cur)
            )
        });
        formData.append('name', name);
        formData.append('email', email);
        formData.append('description', description);

        console.log(name, email, description, formData);

        const config = {
            method: 'post',
            url: 'http://localhost:5000/create-presc',
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${doctorInfo.token}`
            },
            data: formData
        };

        axios(config)
            .then(function (response) {
                setOpenModal(!openModal)
                console.log(response.data);
                // history('/doctor-portal')
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const getPatientsData = async () => {
        const config = {
            method: 'get',
            url: 'http://localhost:5000/get-patients',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${doctorInfo.token}`
            },
        };

        axios(config).then(res => {
            setPatientsArray(res.data.data)
        }).catch(err => {
            console.log(err);
        })
    };

    console.log(patientsArray);

    useEffect(() => {
        if (!doctorInfo) {
            history("/doctor-login");
        }
    }, [history])

    useEffect(() => {
        getPatientsData()
    }, []);

    const _onLogOut = () => {
        localStorage.removeItem("doctorInformation");
        history("/doctor-login");
    }

    const _onPatientDetails = (id) => {
        history(`/prec-doctor-details/${id}`)
    }

    return (
        <div className='mainDashboardContainer'>
            <div className='mainHeader'>
                <div className='mainHeaderName'>Doctor-Portal</div>
                {doctorInfo && <div className='mainHeaderSignOut' onClick={_onLogOut}>Sign Out</div>}
            </div>
            <div className='secondContainer'>
                <div className='newPatient' onClick={() => setOpenModal(!openModal)}>
                    Add New Patient +
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

                            <input 
                                type="file" 
                                accept='application/pdf, image/png, image/jpg, image/jpeg'
                                onChange={handleChange}
                                multiple
                                className='fileInput'
                            />
                        </form>

                    </div> : null

                }
                {
                    filesArray.length > 0 && email && description && openModal && name && <div className='buttonContainer'>
                        <div className='uploadButton' onClick={_onUploadFiles}>Upload</div>
                    </div>
                }

            </div>
            <div className='clientDetails'>
                <div className='patientDetails'>Patient Details</div>
                {
                    patientsArray.map(curr => {
                        return (
                            <div onClick={() => _onPatientDetails(curr._id)} className='patientDetailsDoctorContainer' key={curr._id}>
                                <div className='patientDetailsSubChildContainer'>
                                    <div className='patientDetailsname'>{curr.Name}</div>
                                    <div className='patientDetailsname'>{curr.Email}</div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default DoctorDashboard
