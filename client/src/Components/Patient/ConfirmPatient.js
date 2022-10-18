import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const ConfirmPatient = () => {
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem("patientInformation"));
    const history = useNavigate();
    const navigate = useNavigate();
    

    var URL = window.location.href.split('/');

    const confirmationCode = URL[URL.length - 1]
    const apiCall = async () => {
        setLoading(true);
        const res = await axios.post('http://localhost:5000/login-pat/' + confirmationCode)
        localStorage.setItem('patientInformation', JSON.stringify(res.data));
        const userInfo = JSON.parse(localStorage.getItem("patientInformation"));
        setLoading(false);
        if (userInfo) {
            const email = res.data.email;
            navigate('/update-password-patient', { state: {email} });
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