const io=require('socket.io')(8000,{
    cors: {
      origin: 'http://127.0.0.1:5500',
      methods: ["GET", "POST"]
    }
  });

const users={};

io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        console.log(name);
        users[socket.id]=name;
        // socket.broadcast.emit('user-join',name);
    })
    socket.on('submitted',(newchange)=>{
        console.log(newchange,users[socket.id]);
        socket.broadcast.emit('submit',{newchang:newchange,name:users[socket.id]})
    })
    socket.on('won',(newchang)=>{
      console.log("winned");
      socket.broadcast.emit('winned',{newchange:newchang});
    })
})




// // Server-side code
// const io = require('socket.io')(8000);
// const users = []; // Array to store connected users
// const rooms = {}; // Object to store room data

// io.on('connection', (socket) => {
//   // Add new user to the users array
//   users.push(socket.id);

//   // Assign users to rooms when there are at least 2 users available
//   if (users.length >= 2) {
//     // Create a new room name
//     const roomName = `room-${Object.keys(rooms).length + 1}`;

//     // Assign the first two users in the users array to the new room
//     rooms[roomName] = [users.shift(), users.shift()];
//     io.to(rooms[roomName]).emit('roomCreated', roomName); // Notify the users that the room was created
//   }

//   // Listen for messages from users in the same room
//   socket.on('message', (data) => {
//     const userRoom = Object.keys(rooms).find((room) => rooms[room].includes(socket.id));
//     io.to(userRoom).emit('message', data);
//   });

//   // Remove user from the users array and their room when they disconnect
//   socket.on('disconnect', () => {
//     const userIndex = users.indexOf(socket.id);
//     if (userIndex !== -1) {
//       users.splice(userIndex, 1);
//     } else {
//       const userRoom = Object.keys(rooms).find((room) => rooms[room].includes(socket.id));
//       if (userRoom) {
//         rooms[userRoom].splice(rooms[userRoom].indexOf(socket.id), 1);
//         io.to(userRoom).emit('userLeft', socket.id);
//         if (rooms[userRoom].length === 0) {
//           delete rooms[userRoom];
//         }
//       }
//     }
//   });
// });
