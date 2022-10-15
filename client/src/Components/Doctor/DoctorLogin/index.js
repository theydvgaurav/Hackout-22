import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DoctorLogin.css'

const DoctorLogin = () => {
    const history = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(()=> {
        const userInfo = JSON.parse(localStorage.getItem("doctorInformation"));
        if(userInfo)
            history('/doctor-portal')
    },[history])

    const submitForm = async (e) => {
        e.preventDefault();

        const data = JSON.stringify({ email, password });

        const config = {
            method: 'post',
            url: 'http://localhost:5000/login-doc',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                localStorage.setItem("doctorInformation", JSON.stringify(response.data));
                history('/doctor-portal')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const _loginRedirect = () => {
        history('/doctor-register')
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
            <div className='alreadyAccount'>Not have an account ? <span onClick={_loginRedirect} className='login'>Register here</span> </div>
        </div>
    )
}

export default DoctorLogin
