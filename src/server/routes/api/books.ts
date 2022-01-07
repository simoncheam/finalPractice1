import * as express from 'express';
import { tokenCheck } from '../../middleware/tokenCheck.mw';
import { ReqUser } from '../../types';
import booksDB from '../../database/queries/books'

const router = express.Router();

//✅ OK
router.get('/', async (req, res) => {

    try {
        const all_books = await booksDB.get_all();
        res.status(200).json(all_books);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }

})

// ✅ OK
router.get('/:id', async (req, res) => {

    const id = Number(req.params.id);


    try {
        // const results = await DB.get_all();
        const [one_book] = await booksDB.get_one_by_id(id);

        if (!one_book) {
            res.status(404).json({ message: "Book not found" })

        } else {
            console.log(one_book);
            res.status(200).json(one_book);
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
})

// ✅ OK
router.put('/:id', async (req: ReqUser, res) => {

    const { title, author, price, categoryid } = req.body; 

    
    if (!title || !author || !price || !categoryid) {
        return res.status(400).json({ message: "Fill out everything!" })
    }

 

    try {

        const id = Number(req.params.id); 


        const bookUpdateResults = await booksDB.update({ title, author, price, categoryid }, id); 

        if (bookUpdateResults.affectedRows) {

            res.status(201).json({ message: "Updated Book!" }); 

        } else {
            res.status(401).json({ message: "Not authorized!" })    
        }




    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
})


// ✅ OK
router.post('/', async (req: ReqUser, res) => {

    console.log('INSIDE Book POST REQ');

    const { categoryid, title, author, price  } = req.body;
    
        if(!title || !author || !price || !categoryid ) { 
            return res.status(400).json({ message: "Fill out everything!" })
        }

    try {

    console.log('INSIDE Book POST REQ ---- TRY BLOCK');

        // const results = await DB.get_all();
        const bookResults = await booksDB.create({title, author, price, categoryid})

        res.status(201).json({ message: "Book created!", bookResults });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
})

router.delete('/:id', async (req:ReqUser, res) => { 

    const id = Number(req.params.id); // 
    //const userid = req.user.id;

    


    try {
        
        const one_book = await booksDB.get_one_by_id(Number(id))
        // const results = await DB.get_all();

        await booksDB.destroy(id);
        res.status(200).json({message: "Book Deleted" } );




    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
})

export default router;