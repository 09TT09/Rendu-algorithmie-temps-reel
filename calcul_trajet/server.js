const express = require('express')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

let authorizedUser = [
  ["theo", "pass", "unused", 0],
  ["nico", "pass", "unused", 1],
  ["alex", "pass", "unused", 2]
]

let stockageMessage = [

]

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {

  let usersId = []
  let myUserInfo = []

  // CONNEXION USER
  const socketId = socket.id
  usersId.push(socketId)
  //console.log(usersId)

  // RECUPERATION DU PROFIL
  socket.emit('clientConnection', (authorizedUser))
  socket.on("attributionUser", (userInfos) => {
    authorizedUser.forEach((element, index) => {
      if (authorizedUser[2] !== "used") {
        if (userInfos[0] === element[0] && userInfos[1] === element[1]) {
          element[2] = "used"
          myUserInfo = element /* ERREUR : VAR MODIFIEE POUR TOUS LES USERS */
        }
      }
    })

    if (myUserInfo.length !== 0) {
      socket.emit("connectionValidate", myUserInfo);
      socket.emit('sendListMessage', stockageMessage)
    }
    else socket.emit("redirectConnection", myUserInfo);
  });



  // GET MESSAGE
  socket.on("getMessage", (message) => {
    console.log(message)
    stockageMessage.push(message)
    //console.log(stockageMessage)
    //console.log(myUserInfo);
    socket.broadcast.emit("receiveMessage", message, myUserInfo[0])
  });

  // MODIFY POSITION USER
  socket.on("sendUserLatLng", (usersLatLngAndId) => {
    socket.broadcast.emit("receiveUserLatLng", usersLatLngAndId)
  });

  // MODIFY POSITION END POINT
  socket.on("sendEndPointLatLng", (endPointLatLng) => {
    socket.broadcast.emit("receiveEndPointLatLng", endPointLatLng)
  });

  // MODIFY POSITION RESTAURANT
  socket.on("sendRestaurantLatLng", (restaurantsLatLng) => {
    socket.broadcast.emit("receiveRestaurantLatLng", restaurantsLatLng)
  });


  // DECONNEXION USER
  socket.on('disconnect', () => {
    if (myUserInfo.length !== 0) authorizedUser[myUserInfo[3]][2] = "unused"
    myUserInfo = []
    console.log(`l\'utilisateur avec l\'id ${socketId} vient de partir !`)
    usersId.splice(usersId.indexOf(socketId), 1)
  })
})

http.listen(3000, function(){
  console.log(`listening on port: 3000`)
})