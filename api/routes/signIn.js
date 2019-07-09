import express from 'express';
import ChatCredential from '../models/chatCredential';

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "handling get request at /signIn"
    })
})

router.post('/', (req, res, next) => {
    ChatCredential.find({ uid: req.body.uid, password: req.body.password })
        .then(result => {
            console.log("Login Successful", result);
            res.status(200).json({
                message: "Login Successful",
                token: {
                    username: result[0].username,
                    uid: result[0].uid,
                    name: result[0].name
                }
            })
        }).catch(error => {
            console.log("Login Unsuccessful", error);
            res.status(500).json({
                message: "Login Unsuccessful"
            })
        })
})

export default router;