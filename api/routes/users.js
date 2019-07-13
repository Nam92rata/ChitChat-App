import express from 'express';
import ChatCredential from '../models/chatCredential';

const router = express.Router();

router.get('/:username', (req, res, next) => {
    console.log(req.params.username)
    ChatCredential.find({ username: req.params.username })
    .select('username')
    .then(result=>{
        console.log("Result",result)
        if(result[0]==undefined){
            console.log("result", result);
        res.status(200).json({
            message: 'User does not exist'
        })
        }else{
            console.log("result", result);
            res.status(200).json({
                message: 'User exists'
            })
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            message: 'Could not connect',
            error: err
        })
    })  
})

export default router;