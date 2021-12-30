/*


import * as express from 'express';

// users
import { Users } from '../../types'
import { ReqUser } from '../../types'
import usersDB from '../../database/queries/users'
import booksDB from '../../database/queries/books'



const router = express.Router();


router.get('/', async (req, res) => {

    try {
       // const results = await DB.get_all();

       // *tk
       all_users.forEach(u => {
            delete u.password;
        })

        res.status(200).json(all_users) // *tk

        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }

})

router.get('/:id', async (req, res) => {

    // *tk
    const id = req.params.user_id;


    try {
       // const results = await DB.get_all();

       // *tk
       const [one_user] = await userDB.get_one_by_id(Number(id));
       delete one_user.password;

       
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
})

router.put('/:id', async (req, res) => {
    try {
       // const results = await DB.get_all();

        
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



// auth/login.ts       ------------------------

import * as jwt from 'jsonwebtoken'
import * as passport from 'passport';
import config from '../../config';
import { Router } from 'express';
import { ReqUser} from '../../types'

const router = Router();

router.post('/', passport.authenticate('local'), async ( req: ReqUser, res) => {

    try {
        
        const token = jwt.sign(
            { id: req.user.id, email: req.user.email},
            config.jwt_config.secret,
            {expiresIn: config.jwt_config.expiration}
            );
            
        console.log('--- INSIDE LOGIN.TS POST ROUTE!');
        console.log(`token : ${token}`);

        res.status(200).json({message: "successful login!", token});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: " login broke!", error})
    }

});






//        ------------------------


export default router;
*/
