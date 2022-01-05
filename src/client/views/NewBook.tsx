import React from 'react'

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Categories } from '../client_types';
import { APIService, TOKEN_KEY } from '../services/APIService';


const NewBook = () => {

    const nav = useNavigate();
    // set state
    const [title, setTitle] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [author, setAuthor] = useState<string>('')
    const [category, setCategory] = useState<Categories[]>([])
    const [selectedCategoryid, setSelectedCategoryid] = useState<number>(0)

    // load categories
    useEffect(() => {

        APIService('/api/categories')
            .then(data => {
                setCategory(data)
            })
            .catch(e => console.log(e))

    }, [])


    // handle categoryid update
    const handleCategoryIdSelectUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {

        setSelectedCategoryid(Number(e.target.value))
        console.log({ setSelectedCategoryid });
    };

    const handleSubmitButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const token = localStorage.getItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, token)
        console.log({ token });

        if (!title || !author || !price || !selectedCategoryid) {
            return alert('please fill out all fields');
        }

        APIService('/api/books', 'POST', {

            title: title,
            author: author,
            price: price,
            categoryid: selectedCategoryid,

        })
            .then(data => {
                localStorage.setItem('token', data.token);
                nav('/books')
            })
            .catch(e => {
                console.log(e);
                alert('you must be logged in');
                nav('/login');
            })

    };



    return (
        <div>
            <h1 className="display-3 m-3 text-center"> Create New Book Here </h1>
            <div className="row m-5 justify-content-center">
                <div className="form-group col-6">

                    <label className='row'> Categories</label>

                    {/* select category */}
                    <select value={selectedCategoryid} onChange={handleCategoryIdSelectUpdate} className="form-control m-2" >

                        {/* options - categoryid */}
                        <option value={0}> Select category </option>

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
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) =>setTitle(e.target.value)} />

                    {/* author */}
                    <label className='row'>author</label>

                    <input type="text" placeholder='author' value={author}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) =>setAuthor(e.target.value)}/>


                    {/* price */}
                    <label className='row'>price</label>

                    <input type="text" placeholder='price' value={price}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) =>setPrice(Number(e.target.value))}
                    />
                    <button onClick={handleSubmitButton} className='btn btn-success m-2'>
                        Click to Create new Book

                    </button>





                </div>

            </div>

            {/* need select menu */}


        </div>
    )
}

export default NewBook
