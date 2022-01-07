import * as React from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { APIService } from '../services/APIService';



const Navbar = () => {

    let nav = useNavigate();
    const [isAuthed, setIsAuthed] = useState(false);
    const loc = useLocation()

    useEffect(() => {

        const publicPages = [ 'books', '/login', '/register']

        console.log(loc);
        APIService(`/auth/validate`)
            .then(res => {
                //const tokenStatus = res.ok;  // 
                const tokenStatus = res.message === 'valid'
                setIsAuthed(tokenStatus)
            })
            .catch(error => {


                
                setIsAuthed(false)
                console.log(error);
                // alert('bad token - NAVBAR error');
                //conditional path logic - check array of approved paths
               // nav('/login'); 
            });

            //! array of allowed paths

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
