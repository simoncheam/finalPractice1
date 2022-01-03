import * as jwt from 'jsonwebtoken'
import config, { jwt_config } from '../../config';
import userDB from '../../database/queries/users';
import { Router } from 'express';
import { generateHash } from '../../utils/passwords';
import { ReqUser } from '../../types';
import passport from 'passport';

const router = Router();

router.post('/', async ( req: ReqUser, res) => {

    const newUser = req.body;

    try {
        console.log('--- INSIDE REGISTER.TS  --- POST ROUTE!');


        //create new hash
        newUser.password = generateHash(newUser.password);

        //insert new user into db

        const result = await userDB.create(newUser);

        result.insertId

        console.log(result);

        //create new token
        const token = jwt.sign(
            {userid: result.insertId, email: newUser.email},
            config.jwt_config.secret,
            {expiresIn: jwt_config.expiration}
        );

        res.status(200).json( {message: 'successful registration', token});


    } catch (error) {

        console.log(error);
        res.status(500).json({ message: " registration broke!", error})
    }

});

export default router;