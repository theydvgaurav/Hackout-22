import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './PatientDashboard.css';

const PatientDashboard = () => {
    const history = useNavigate();
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("patientInformation"));

    const [doctorsArray, setDoctorsArray] = useState([]);
    
    const getDoctorsData = async () => {
        const config = {
            method: 'get',
            url: 'http://localhost:5000/get-docs',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        };

        axios(config).then(res => {
            setDoctorsArray(res.data.data)
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(()=> {
        const userInfo = JSON.parse(localStorage.getItem("patientInformation"));
        if(!userInfo)
            history('/')
    },[history])

    useEffect(() => {
        getDoctorsData()
    }, [])

    const _onSignOut = () => {
        localStorage.removeItem("patientInformation");
        history("/");
    };

    const _onPatientDetails = (id) => {
        history(`/prec-details/${id}`)
    }

    const _updatePasswordClick = (email) => {
        navigate('/update-password-patient', { state: {email} });
    }

    return (
        <div className='mainDashboardContainer'>
            <div className='mainHeader'>
                <div className='mainHeaderName'>Patient-Portal</div>
                <div className='mainHeaderSignOut' onClick={_onSignOut}>Sign Out</div>
                <div className='updatePassword' onClick={() => _updatePasswordClick('anuj11911013@gmail.com')}>Update Password</div>
            </div>
            <div className='doctorsContainer'>
                <div className='doctorListHeader'>Doctor Details</div>
                {
                    doctorsArray.map(curr => {
                        return (
                            <div className='patientDetailsDoctorContainer'>
                                <div onClick={() => _onPatientDetails(curr._id)} className='patientDetailsSubChildContainer'>
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

export default PatientDashboard
