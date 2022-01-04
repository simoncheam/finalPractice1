import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { APIService } from '../services/APIService';

const Register = () => {

    let nav = useNavigate();

    const [userName, setUserName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>(null)

    const handleSubmitButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!userName || !email || password == null) {
            return alert('please fill out all fields');
        }

        APIService('/auth/register', 'POST', {

            name: userName,
            email: email,
            password: password
        })
            .then(data => {
                alert(`welcome, ${userName}`)
                localStorage.setItem('token', data.token);
                nav('/')  // !!! switch to create new book view?
            })
            .catch(e => {
                console.log(e);
            })

    };



    return (
        <div>
            <h1 className="display-3 m-3 text-center"> Register Here </h1>
            <div className="row justify-content-center">
                <div className="form-group col-6">

            {/* username */}
                    <input type='text' className='form-control' placeholder='your username' 
                    value={userName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setUserName(e.target.value)}
                    />
            {/* email */}
                    <input type='text' className='form-control' placeholder='your email'
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)}
                    />
            {/* password */}
                    <input type='password' className='form-control' placeholder='password'
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)}
                    />



                <button className="btn btn-primary" onClick={handleSubmitButton}>
                    Click here to Register!

                </button>



                </div>
            </div>


        </div>
    )
}

export default Register
