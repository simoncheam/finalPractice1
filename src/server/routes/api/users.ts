import * as express from 'express';
import { Users } from '../../types'
import { ReqUser } from '../../types'
import usersDB from '../../database/queries/users'
import booksDB from '../../database/queries/books'

//import {tokenCheck}

const router = express.Router();

//get all ✅ OK
router.get('/', async (req, res) => {

    try {
       // const results = await DB.get_all();
       const all_users = await usersDB.get_all();

       all_users.forEach(u => {
           delete u.password;
       })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }

})


// get one ✅ OK
router.get('/:id', async (req: ReqUser, res) => {

    const id = req.params.user_id; // *tk

    try {
       // const results = await DB.get_all();
       const [one_user] = await usersDB.get_one_by_id();
       delete one_user.password; // *tk

       // *tk validation
       if(one_user){
        res.status(404).json({ message: "User not found" })

       }else{
        res.status(200).json({message:  `User found!`, one_user} ); // *tk
       }


        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
})

/// create ✅ OK
router.post('/', async (req: ReqUser, res) => {

    const { name, email, password }: Users = req.body; // *tk

    if (!name || !email || !password) {  // input validation // *tk
        return res.status(400).json({ message: "Fill out everything!" })
    }


    try {
       // const results = await DB.get_all();
       const userResults = await usersDB.create({name, email, password}) // *tk
       res.status(201).json({ message: "User create!", id: userResults.insertId }); // *tk

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
})

// update - need this?

// delete ✅ OK

router.delete('/:id', async (req, res) => {

    const id = Number(req.params.id); // *tk

    try {
       // const results = await DB.get_all();
        await usersDB.destroy(id) // *tk
        res.status(200).json({message: "User Deleted!"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
})

export default router;