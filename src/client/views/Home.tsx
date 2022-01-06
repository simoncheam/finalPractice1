import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {


    return (
        <div className="row m-5 justify-content-center">
            <h1 className="display-3 m-3 text-center"> Welcome to the Bookstore </h1>

            <Link type='button' className='btn btn-primary m-2' to='/login'> Login </Link>
            <Link type='button' className='btn btn-primary m-2' to='/register'> Register </Link>
            <Link type='button' className='btn btn-primary m-2' to='/books'>  Books </Link>

            {/* 
           - Show a page welcoming the user to your book store
            - Have a link to your book listing
            - Have a link to login/register views

           
           
           */}

        </div>
    )
}

export default Home
