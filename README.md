# chitchat-backend
socket.io, node JS, Express, Webrt

Make a nodemon.json file in root with content:

{
    "env": {
        "MONGO_ATLAS_PW": "mongo-password",
        "MONGO_ATLAS_USERNAME": "mongo-username"
    }
}

sign In : POST("http://localhost:4000/signIn", {
	"password": "",
	"uid": ""
})


sign Up : POST("http://localhost:4000/signUp", {
	"username": "",
	"password": "",
	"uid": "",
	"name":""
})

# ChitChat-App
