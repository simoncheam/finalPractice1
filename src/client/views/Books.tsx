import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Books, Categories } from '../client_types';
import { APIService } from '../services/APIService';

const Books = () => {

    const nav = useNavigate();

    // set state books
    const [books, setBooks] = useState<Books[]>([])


    //ue

    useEffect(() => {

        APIService(`/api/books`)

            .then(data => {
                setBooks(data);
            })
            .catch(error => {
                console.log(error);
            });

    }, [])


    return (
        <div>
            <h1 className="display-3 m-3 text-center"> Book Listing  </h1>

            {/* map cards */}
            <div className="">
                {books.map(book => (
                    <div className="row m-2 justify-content-center" key={`book-${book.id}`}>
                        <div className="card col-12 col-md-6">

                            {/* header */}
                            <div className="card-header">
                                <p>{book.title}</p>
                            </div>

                            {/* body */}
                            <div className="card-body">

                                <p>Author: {book.author}</p>
                                <p>Price: {book.price.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })}</p>
                            </div>

                            {/* read more link */}
                            <Link to={`/books/${book.id}`} className='btn btn-primary m-2'>
                                Read More
                            </Link>

                        </div>
                    </div>


                ))}


            </div>


        </div>
    )
}

export default Books
