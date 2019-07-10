import http from 'http';
import app from './app';
import socketIo from "socket.io";
const port = process.env.PORT || 4000
const server = http.createServer(app);

server.listen(port, ()=>{
    console.log("Server is running on port "+ port);
});


const io = socketIo.listen(server);



let users = {};

const getUsers = () => {
    return Object.keys(users).map(function (key) {
        return users[key].username
    });
};

io.on('connection', (socket) => {
    let query = socket.request._query,
        user = {
            username: query.username,
            uid: query.uid,
            socket_id: socket.id
        };

    if (users[user.uid] !== undefined) {
        console.log("user1")
        createSocket(user);
        socket.emit('updateUsersList', getUsers());
    }
    else {
        console.log("user2")
        createUser(user);
        io.emit('updateUsersList', getUsers());
    }

    socket.on('message', (data) => {
        console.log(data)
        console.log(data.username)
        io.emit('message', {
            username: data.username,
            message: data.message,
            uid: data.uid
        });
    });

    socket.on('disconnect', () => {
        removeSocket(socket.id);
        io.emit('updateUsersList', getUsers());
    });
});

const createSocket = (user) => {
    let cur_user = users[user.uid],
        // update existing user socket
        updated_user = {
            [user.uid]: Object.assign(cur_user, { sockets: [...cur_user.sockets, user.socket_id] })
        };
    users = Object.assign(users, updated_user);
};

const createUser = (user) => {
    users = Object.assign({
        // create a new user on users object with uid
        [user.uid]: {
            username: user.username,
            uid: user.uid,
            sockets: [user.socket_id]
        }
    }, users);
};

const removeSocket = (socket_id) => {
    let uid = '';
    Object.keys(users).map(function (key) {
        let sockets = users[key].sockets;
        if (sockets.indexOf(socket_id) !== -1) {
            uid = key;
        }
    });
    let user = users[uid];
    if (user.sockets.length > 1) {
        // Remove socket only
        let index = user.sockets.indexOf(socket_id);
        let updated_user = {
            [uid]: Object.assign(user, {
                sockets: user.sockets.slice(0, index).concat(user.sockets.slice(index + 1))
            })
        };
        users = Object.assign(users, updated_user);
    } else {
        // Remove user by key
        let clone_users = Object.assign({}, users);
        delete clone_users[uid];
        users = clone_users;
    }
};

