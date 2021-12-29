import * as express from 'express';
import { ReqUser } from '../../types';

const router = express.Router();


router.get('/', async (req, res) => {

    try {
       const all_books = await booksDB.get_all();
       res.status(200).json(all_books);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }

})

router.get('/:id', async (req, res) => {

    const id = Number(req.params.id);


    try {
       // const results = await DB.get_all();
       const [one_book] = await booksDB.get_one_by_id(id);

       if(!one_book){
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

router.put('/:id', async (req: ReqUser, res) => {

    const { title, author, price  } = req.body; //*tk
    const userid = req.user.id; //*tk


    if (!title || !author || !price) {
        return res.status(400).json({ message: "Fill out everything!" })
    }
    try {

        const id = Number(req.params.id); // *tk


       const bookUpdateResults = await booksDB.update({title, author, price}, id, userid); // *tk

        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
})

router.post('/', async (req, res) => {
    try {
       // const results = await DB.get_all();

        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
})

router.delete('/:id', async (req, res) => {
    try {
       // const results = await DB.get_all();

        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
})

export default router;