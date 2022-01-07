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
    const [categories, setCategories] = useState<Categories[]>([])


    //ue

    useEffect(() => {

        // Attaching category name to books array:

        // fetch all categories
        APIService(`/api/categories`)
            .then(data => {
               // setCategories(data);
               // console.log({ categories });

                APIService(`/api/books`)

                    .then(books => {
                        // setBooks(data);

                        // define books with category names = array of books, where each book is a regular book with a categoryName prop added
                        // map through books
                        const booksWithCatNames = books.map(book => {
                            // filter through categories
                            const [catName] = data.filter(

                                // Where categoryid matches book catID

                                // Map filtered array, and from the whole cat object, we return just the category name string(cat.name)
                                cat => cat.id === book.categoryid)
                                const name = catName.name; 
                                
                                //.map(cat => cat.name);

                            //then we return an object repreprenting a book with all book props spread out, PLUS categoryName added
                            return { ...book, categoryName: name }
                        })
                        setBooks(booksWithCatNames)
                        console.log({ booksWithCatNames });

                        /* 
                        
                        */
                    })
                    .catch(error => {
                        console.log(error);
                    });
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
                                <p>Category: {book.categoryName}</p>
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
