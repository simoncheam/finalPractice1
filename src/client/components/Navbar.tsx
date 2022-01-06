import * as React from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { APIService } from '../services/APIService';



const Navbar = () => {

    let nav = useNavigate();
    const [isAuthed, setIsAuthed] = useState(false);
    const loc = useLocation()

    useEffect(() => {

        

        APIService(`/auth/validate`)
            .then(res => {
                const tokenStatus = res.one_user ? true : false;
                setIsAuthed(tokenStatus)
            })
            .catch(error => {
                setIsAuthed(false)
                console.log(error);
                // alert('bad token - NAVBAR error');
                nav('/login');
            });

    }, [loc.pathname])

    return (
        <div className='bg-warning'>

            <Link type='button' className='btn btn-primary m-2' to='/'> Home </Link>
            {isAuthed && (
                <Link type='button' className='btn btn-primary m-2' to='/books/new'> NewBook </Link>
            )}
            {!isAuthed && (
                <Link type='button' className='btn btn-primary m-2' to='/login'> Login </Link>
            )}
            {!isAuthed && (
                <Link type='button' className='btn btn-primary m-2' to='/register'> Register </Link>
            )}
            {isAuthed && (
                <Link type='button' onClick={()=>localStorage.removeItem('token')} className='btn btn-primary m-2' to='/login'> Sign Out </Link>
            )}


        </div>
    )
}

interface INavbarProps { }

export default Navbar
