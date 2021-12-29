import * as React from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { APIService } from '../../../client/services/APIService';



const Template = (props: ITemplateProps) => {

    const [books, setBooks] =useState([]);
    const [isAuthed, setIsAuthed] = useState(null);
    let nav = useNavigate();
    const loc = useLocation()

    useEffect(() => {

        APIService(`/api/chirps`)

            .then(data => {
                setBooks(data);
            })
            .catch(error => {
                console.log(error);
            });

    }, [loc.pathname])

    return (
        <div>
            {books.map(book => (
                <p>{book.title}</p>
                <p>{book.author}</p>
                <p>{book.price}</p>


            ))}
            
        </div>
    )
}

interface ITemplateProps {}

export default Template
