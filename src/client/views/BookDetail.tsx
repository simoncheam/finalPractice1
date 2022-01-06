import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Books, Categories } from '../client_types';
import { APIService } from '../services/APIService';

const BookDetail = () => {

    const nav = useNavigate();


    const [book, setBook] = useState<Books>();
    const [isloaded, setIsLoaded] = useState<boolean>(false);
    const [category, setCategory] = useState<Categories>();
    const [categoryId, setCategoryId] = useState<number>(null);

    let params = useParams()
    const book_id = params.id


    useEffect(() => {
        APIService(`/api/books/${book_id}`)
            .then(data => {
                setBook(data);
                setIsLoaded(true);

                APIService(`/api/categories/${book.categoryid}`)
                    .then(data => {
                        setCategory(data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
                setIsLoaded(false);
            });


    }, [isloaded])


    if (!book || !category) { return <> Loading...</> }


    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        if(confirm('are you sure?')){
            
        }

        APIService(`/api/books/${book_id}`, 'DELETE', {


        })
            .then(data => {
                nav('/books')
            })
            .catch(e => {
                console.log(e);
                alert('you must be logged in');
                nav('/login');
            })



    }





    return (
        <div className="row m-5 justify-content-center">
            <h1 className="display-3 m-3 text-center"> Book Detail Here </h1>
            <div className="card col-12 col-md-6 m-2">

                <div className="card-header">
                    {book.title}
                </div>

                <div className="card-body">
                    <p>author: {book.author}</p>

                    <p>
                        price: {book.price.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        })}
                    </p>

                    <p>category id: {book.categoryid}</p>
                    <p>category name: {category.name}</p>
                </div>



                {/* links for edit and delete */}
                <div className="m-2">

                    <button className="btn btn-secondary mx-2" onClick={()=>nav(-1)}>Go back?</button>
                    <Link className='btn btn-success mx-2' to={`/books/${book_id}/update/`}>Update </Link>
                    <button className="btn btn-danger mx-2" onClick={handleDelete}>Delete</button>
                </div>
            </div>

        </div>
    )
}

export default BookDetail
