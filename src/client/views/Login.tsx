import React from 'react'

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { APIService } from '../services/APIService';




const Login = () => {

    let nav = useNavigate();


    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>(null)

    const handleLoginButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!email || password == null) {
            return alert('please fill out all fields');
        }

        APIService('/auth/login', 'POST', {

            email: email,
            password: password
        })
            .then(data => {
                alert(`welcome back!`)
                localStorage.setItem('token', data.token);
                nav('/')  // !!! switch to create new book view?
            })
            .catch(e => {
                console.log(e);
            })

    };




    return (
        <div>
            <h1 className="display-3 m-3 text-center"> Login Here </h1>

            <div className="row justify-content-center">
                <div className="form-group col-6">


                    {/* email */}
                    <label>Email</label>
                    <input type='text' className='form-control' placeholder='your email'
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />
                    {/* password */}
                    <label>Password</label>
                    <input type='password' className='form-control' placeholder='password'
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />



                    <button className="btn btn-primary" onClick={handleLoginButton}>
                        Click here to Login!

                    </button>



                </div>
            </div>


        </div>
    )
}

export default Login
