import React, { useState, useEffect } from 'react';
import { axios } from 'axios';
import { useNavigate } from 'react-router-dom';
import './DoctorLogin.css'

const DoctorLogin = () => {
    const history = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitForm = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        // const { data } = await axios.post('/api/users/',
        //     { name, email, password },
        //     config
        // );
        // updateUserInfo(data);
        // localStorage.setItem("userInformation", JSON.stringify(data));

        // history('/notes');
    }

    const _loginRedirect = () => {
        history('/doctor-register')
    }

    return (
        <div className='mainContainer'>
            <div className='heading'>Login Screen</div>
            <form onSubmit={submitForm}>
                <div className='inputContainer'>
                    <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='inputContainer'>
                    <input type="password" placeholder='Password' onChange={e => setPassword(e.target.value)} />
                </div>
                <button className='button'>Submit</button>
            </form>
            <div className='alreadyAccount'>Not have an account ? <span onClick={_loginRedirect} className='login'>Register here</span> </div>
        </div>
    )
}

export default DoctorLogin
