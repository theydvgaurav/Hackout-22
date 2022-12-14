import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResetPassword.css'

const ResetPassword = () => {
    const {state} = useLocation();
    const history = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState('');

    const userInfo = JSON.parse(localStorage.getItem("patientInformation"));
    
    const {email} = state;

    const submitForm = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Password not match')
        }

        const data = JSON.stringify({ email, password });

        const config = {
            method: 'post',
            url: 'http://localhost:5000/update-password',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                history('/patient-portal')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className='mainContainer'>
            <div className='heading'>Reset Password Screen</div>
            <form onSubmit={submitForm}>
                <div className='inputContainer'>
                    <input
                        type="password"
                        placeholder='Password'
                        required
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className='inputContainer'>
                    <input
                        type="password"
                        placeholder='Confirm Password'
                        required
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>
                {
                    message && <div className='error'>{message}</div>
                }
                <button className='button'>Submit</button>
            </form>
        </div>
    )
}

export default ResetPassword
