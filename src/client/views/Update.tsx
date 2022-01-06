import React from 'react'

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Books, Categories } from '../client_types';
import { APIService, TOKEN_KEY } from '../services/APIService';






const Update = () => {

    let params = useParams()
    const nav = useNavigate();

    const book_id = params.id

    // const [books, setBooks] = useState<Books[]>([])
    const [book, setBook] = useState<Books>();
    const [isloaded, setIsLoaded] = useState<boolean>(false);
    const [category, setCategory] = useState<Categories[]>([]);
    const [categoryId, setCategoryId] = useState<number>(0);
    const [selectedCategoryid, setSelectedCategoryid] = useState<number>(0)

    const [title, setTitle] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [author, setAuthor] = useState<string>('')


    //ue

    useEffect(() => {

        APIService(`/api/books/${book_id}`)
            .then(data => {
                setBook(data);
                console.log({ data });
                setTitle(data.title)
                setPrice(data.price)
                setAuthor(data.author)
                setCategoryId(data.categoryid)
                console.log({ categoryId });
                setIsLoaded(true);

                APIService('/api/categories')
                    .then(data => {
                        setCategory(data)
                    })
                    .catch(e => console.log(e))

                // APIService(`/api/categories/${book.categoryid}`)
                //     .then(data => {
                //         setCategory(data);
                //     })
                //     .catch(error => {
                //         console.log(error);
                //     });
            })
            .catch(error => {
                console.log(error);
                setIsLoaded(false);
            });



    }, [isloaded])

    // handle categoryid update
    const handleCategoryIdSelectUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {

        setSelectedCategoryid(Number(e.target.value))
        console.log({ setSelectedCategoryid });
    };

    const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (confirm('are you sure?')) {

        }

        if (!title || !author || !price || !selectedCategoryid) {
            return alert('please fill out all fields');
        }

        APIService(`/api/books/${book_id}`, 'PUT', {

            title: title,
            author: author,
            price: price,
            categoryid: selectedCategoryid,


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

    if (!book) { return <> Loading...</> }


    return (
        <div>
            <h1 className="display-3 m-3 text-center"> Update Here </h1>
            <div className="row m-5 justify-content-center">
                <div className="form-group col-6">

                    <label className='row'> Categories</label>

                    {/* select category */}
                    <select value={selectedCategoryid}
                        onChange={handleCategoryIdSelectUpdate}
                        className="form-control" >

                        {/* options - categoryid */}
                        <option value={0}> Update category - Selection option below </option>

                        {/* map through categoryid */}
                        {category.map(cat => (

                            <option key={`category-${cat.id}`} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    {/* Title */}
                    <label className='row'>title</label>
                    <input type="text" placeholder='title' value={title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />

                    {/* author */}
                    <label className='row'>author</label>

                    <input type="text" placeholder='author' value={author}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)} />


                    {/* price */}
                    <label className='row'>price</label>

                    <input type="text" placeholder='price' value={price}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value))}
                    />

                    <div className="mt-2">

                        <button className="btn btn-secondary mx-2" onClick={() => nav(-1)}>Go back?</button>
                        {/* <Link className='btn btn-success mx-2' to={`/books/${book_id}/update/`}>Update </Link> */}
                        <button className="btn btn-success mx-2" onClick={handleUpdate}>Update</button>
                    </div>

                </div>





            </div>
        </div>
    )
}

export default Update
