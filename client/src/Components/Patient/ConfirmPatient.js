import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ConfirmPatient = () => {
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem("patientInformation"));

    const history = useNavigate();

    var URL = window.location.href.split('/');

    const confirmationCode = URL[URL.length - 1]
    const apiCall = async () => {
        setLoading(true);
        const res = await axios.post('http://localhost:5000/login-pat/' + confirmationCode)
        localStorage.setItem('patientInformation', JSON.stringify(res));
        console.log(localStorage.getItem('patientInformation', JSON.stringify(res)))
        const userInfo = JSON.parse(localStorage.getItem("patientInformation"));
        setLoading(false);
        if (userInfo) {
            history("/patient-portal");
        }
    }
    useEffect(() => {
        if (user == null) {
            apiCall();
        }
        else {
            history("/patient-portal");
        }
    }, [confirmationCode])
    return (
        <div>
            {loading ? <div>Loading</div> : null}
        </div>
    )
}

export default ConfirmPatient;