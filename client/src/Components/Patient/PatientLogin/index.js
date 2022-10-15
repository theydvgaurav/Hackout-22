import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PatientLogin.css'

const PatientLogin = () => {
    const history = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(()=> {
        const userInfo = JSON.parse(localStorage.getItem("patientInformation"));
        if(userInfo)
            history('/patient-portal')
    },[history])

    const submitForm = async (e) => {
        e.preventDefault();

        const data = JSON.stringify({ email, password });

        const config = {
            method: 'post',
            url: 'http://localhost:5000/login-pat',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                localStorage.setItem("patientInformation", JSON.stringify(response.data));
                history('/patient-portal')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const _loginRedirect = () => {
        history('/doctor-login')
    }

    return (
        <div className='mainContainer'>
            <div className='heading'>Login Screen</div>
            <form onSubmit={submitForm}>
                <div className='inputContainer'>
                    <input 
                        type="email" 
                        placeholder='Email' 
                        required
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className='inputContainer'>
                    <input 
                        type="password" 
                        placeholder='Password' 
                        required
                        onChange={e => setPassword(e.target.value)} 
                    />
                </div>
                <button className='button'>Submit</button>
            </form>
            <div className='alreadyAccount'>Login as a Doctor <span onClick={_loginRedirect} className='login'>Login here</span> </div>
        </div>
    )
}

export default PatientLogin
