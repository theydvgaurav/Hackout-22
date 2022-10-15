import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DoctorRegistration.css'

const DoctorRegistration = () => {
    const history = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState('');

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("doctorInformation"));
        if (userInfo)
            history('/doctor-portal')
    }, [history])

    const submitForm = async (e) => {
        e.preventDefault();

        const data = JSON.stringify({ name, email, phone, password });

        const config = {
            method: 'post',
            url: 'http://localhost:5000/register-doc',
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
        history('/doctor-login')
    }

    return (
        <div className='mainContainer'>
            <div className='heading'>Registration Screen</div>
            <form onSubmit={submitForm}>
                <div className='inputContainer'>
                    <input
                        type="type"
                        required
                        placeholder='Name'
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='inputContainer'>
                    <input
                        type="email"
                        required
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='inputContainer'>
                    <input
                        type="tel"
                        required
                        placeholder='Phone Number'
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className='inputContainer'>
                    <input
                        type="password"
                        required
                        placeholder='Password'
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button className='button'>Submit</button>
            </form>
            <div className='alreadyAccount'>Have an account ? <span onClick={_loginRedirect} className='login'>Login here</span> </div>
        </div>
    )
}

export default DoctorRegistration;