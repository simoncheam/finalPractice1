import * as React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home';


const App = (props: AppProps) => {
	
	return (
<>
		<BrowserRouter>
				<Navbar />

				<div className="container">
					<Routes>


						{/* Home */}
						<Route path="/" element={<Home />}></Route>

						{/* Register */}
						<Route path="/register" element={<Register />}></Route>
						
						{/* Login */}
						<Route path="/login" element={<Login/>}></Route>

						{/* books */}
						<Route path="/books" element={< Books />}></Route>

						{/* books/new */}
						<Route path="/books/new" element={<NewBook />}></Route>

						{/* books/:id/update */}
						<Route path="/books/:id/update" element={<Update />}></Route>

						{/* books/:id */}
						<Route path="/books/:id" element={<BookDetail />}></Route>





						{/* NotFound */}
						<Route path="*" element={<NotFound />}></Route>



					</Routes>



				</div>
			</BrowserRouter>
			
		<main className="container my-5">
			<h1 className="text-primary text-center">Hello </h1>
		</main>
</>
	);
};

interface AppProps {}



export default App;
