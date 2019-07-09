import express from 'express';
import ChatCredential from '../models/chatCredential';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "handling get request at /signUp"
    })
})

router.post('/', (req, res, next) => {

    const chatCredential = new ChatCredential({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        name: req.body.name,
        password: req.body.password,
        uid: req.body.uid
    })

    chatCredential.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "credential posted successfully",
                credential: chatCredential
            })
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                message: "credential could not be posted",
                error: error
            })
        });
})

export default router;
