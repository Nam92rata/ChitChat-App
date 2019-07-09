import mongoose from 'mongoose';

const chatCredentialSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true 
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    uid:{
        type: String,
        unique: true,
        required: true,
        trim: true
    }
})

module.exports = mongoose.model("ChatCredential", chatCredentialSchema);