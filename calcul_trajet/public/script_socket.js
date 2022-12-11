// SERVER GET USER
let userInfo = [];
let userId = undefined;

// MAP
let map = L.map('map').setView([48.85539, 2.34501], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// ICONS
let restaurantIcon = L.icon({ iconUrl: './images/marker_restaurant.png', iconSize: [245/8, 452/8], iconAnchor: [(245/8)/2, 452/8] });
let endPointIcon = L.icon({ iconUrl: './images/marker_end.png', iconSize: [245/8, 452/8], iconAnchor: [(245/8)/2, 452/8], });
let userIcon = L.icon({ iconUrl: './images/marker_user.png', iconSize: [245/8, 452/8], iconAnchor: [(245/8)/2, 452/8], });
let myUserIcon = L.icon({ iconUrl: './images/marker_my_user.png', iconSize: [245/8, 452/8], iconAnchor: [(245/8)/2, 452/8], });

// DATA
let endPoint = L.marker([48.84974, 2.35249], {icon: endPointIcon}).addTo(map);

let users = [
    [(L.marker([48.85539, 2.34501], {icon: userIcon}).addTo(map)), "theo"],
    [(L.marker([48.85759, 2.35106], {icon: userIcon}).addTo(map)), "nico"],
    [(L.marker([48.85877, 2.34740], {icon: userIcon}).addTo(map)), "alex"],
]

let restaurants = [
    ["La Brasserie de l'Isle Saint-Louis", (L.marker([48.85303, 2.35342], {icon: restaurantIcon}).addTo(map))],
    ["Allard", (L.marker([48.85332, 2.34101], {icon: restaurantIcon}).addTo(map))],
    ["Pizzawawa", (L.marker([48.86071, 2.34560], {icon: restaurantIcon}).addTo(map))],
    ["Le Bistro du Perigord", (L.marker([48.84986, 2.34517], {icon: restaurantIcon}).addTo(map))],
    ["Bar Sotto", (L.marker([48.86172, 2.36130], {icon: restaurantIcon}).addTo(map))]
]

let paths = [
    ([users[0][0].getLatLng(), restaurants[0][1].getLatLng(), endPoint.getLatLng()]),
    ([users[1][0].getLatLng(), restaurants[3][1].getLatLng(), endPoint.getLatLng()]),
    ([users[2][0].getLatLng(), restaurants[4][1].getLatLng(), endPoint.getLatLng()])
]

let polylinesColors = ['crimson', 'green', 'blue']

let polylines = [
    (L.polyline(paths[0], {color: polylinesColors[0]}).addTo(map)),
    (L.polyline(paths[1], {color: polylinesColors[1]}).addTo(map)),
    (L.polyline(paths[2], {color: polylinesColors[2]}).addTo(map))
]

// BUTTONS
let stateMyPosition = false;
let stateEndPosition = false;
document.getElementById("changeMyPosition").addEventListener("click", changeMyPosition);
document.getElementById("changeEndPosition").addEventListener("click", changeEndPosition);
document.getElementById("sendMessage").addEventListener("click", sendMessage);

function sendMessage(){
    getMessage = document.getElementById("message").value;

    document.getElementById("messageList").insertAdjacentHTML("beforeend", `
    <div class="message_bubble message_user">
        <div><i><b>${userInfo[0]}</b></i></div>
        <div>
            ${getMessage}
        </div>
    </div>
    `)
    document.getElementsByClassName("message_bubble")[document.getElementsByClassName("message_bubble").length - 1].scrollIntoView({behavior: "smooth"});
    document.getElementById("message").value = "";
    socket.emit("getMessage", [userInfo[0], getMessage]);
}

/*function sendMessage(){
    getMessage = document.getElementById("message").value;
    user = "Moi"

    document.getElementById("messageList").insertAdjacentHTML("beforeend", `
    <div class="message_bubble message_user">
        <div><i><b>Moi</b></i></div>
        <div>
            ${getMessage}
        </div>
    </div>
    `)
    document.getElementsByClassName("message_bubble")[document.getElementsByClassName("message_bubble").length - 1].scrollIntoView({behavior: "smooth"});
    document.getElementById("message").value = "";
    socket.emit("getMessage", [user, getMessage]);
}*/

function changeMyPosition() {
    let myPosition = document.getElementById("changeMyPosition");
    let infos = document.getElementById("buttonInfos");

    if (stateMyPosition === false) {
        if (stateEndPosition === false) {
            myPosition.classList.remove('button_my_position');
            myPosition.classList.add('button_my_position_clicked');
            infos.innerHTML = '<span class="blue_color">Cliquez sur la carte pour déplacer votre point de départ</span>';
            stateMyPosition = !stateMyPosition;
        }
    } else {
        myPosition.classList.remove('button_my_position_clicked');
        myPosition.classList.add('button_my_position');
        infos.innerHTML = "Cliquez sur un bouton pour voir les informations liées apparaître";
        stateMyPosition = !stateMyPosition;
    }
}

function changeEndPosition() {
    let endPosition = document.getElementById("changeEndPosition");
    let infos = document.getElementById("buttonInfos");

    if (stateEndPosition === false) {
        if (stateMyPosition === false) {
            endPosition.classList.remove('button_end_point');
            endPosition.classList.add('button_end_point_clicked');
            infos.innerHTML = '<span class="green_color">Cliquez sur la carte pour déplacer le point de d\'arrivé</span>';
            stateEndPosition = !stateEndPosition;
        }
    } else {
        endPosition.classList.remove('button_end_point_clicked');
        endPosition.classList.add('button_end_point');
        infos.innerHTML = "Cliquez sur un bouton pour voir les informations liées apparaître";
        stateEndPosition = !stateEndPosition;
    }
}

/*
// MARKERS
let marker1 = L.marker([48.85539, 2.34501], {icon: userIcon}).addTo(map);
let marker2 = L.marker([48.85759, 2.35106], {icon: userIcon}).addTo(map);
let marker3 = L.marker([48.85877, 2.34740], {icon: userIcon}).addTo(map);
let restaurants = [
    L.marker([48.85303, 2.35342], {icon: restaurantIcon}).addTo(map),
    L.marker([48.85332, 2.34101], {icon: restaurantIcon}).addTo(map),
    L.marker([48.86071, 2.34560], {icon: restaurantIcon}).addTo(map),
    L.marker([48.84986, 2.34517], {icon: restaurantIcon}).addTo(map),
    L.marker([48.86172, 2.36130], {icon: restaurantIcon}).addTo(map),
]
let endPoint = L.marker([48.84974, 2.35249], {icon: endPointIcon}).addTo(map);

// POLYLINES
var pathUser1 = [marker1.getLatLng(), restaurants[0].getLatLng(), endPoint.getLatLng()];
var polylineUser1 = L.polyline(pathUser1, {color: 'crimson'}).addTo(map);

var pathUser2 = [marker2.getLatLng(), restaurants[3].getLatLng(), endPoint.getLatLng()];
var polylineUser2 = L.polyline(pathUser2, {color: 'green'}).addTo(map);

var pathUser3 = [marker3.getLatLng(), restaurants[4].getLatLng(), endPoint.getLatLng()];
var polylineUser3 = L.polyline(pathUser3, {color: 'blue'}).addTo(map);
*/

// GENERATE LIST RESTAURANTS

generateListRestaurants()
function generateListRestaurants() {
    restaurants.forEach((element, index) => {
        document.getElementById("divListRestaurants").insertAdjacentHTML("beforeend", `
            <div class="restaurant_container">
                <div class="restaurant_container_img"></div>
                <div class="restaurant_container_div">
                    <div class="restaurant_container_title">${element[0]}</div>
                    <div class="restaurant_container_coords">
                        Coordonnées: <br>
                        (<span id="latidute">${element[1]._latlng.lat}</span>, <span class="longitude">${element[1]._latlng.lng}</span>)
                    </div>
                    <input type="button" value="Planifier" class="restaurant_container_button" onclick="setPositionRestaurant(${index})"/>
                    <input type="button" value="Voir" class="restaurant_container_button_2" onclick="SeePositionRestaurant(${element[1]._latlng.lat}, ${element[1]._latlng.lng})"/>
                </div>
            </div>
        `)
    })
}

function setPositionRestaurant(index){
    paths[userId][1] = restaurants[index][1].getLatLng()
    map.removeLayer(polylines[userId])
    polylines[userId] = L.polyline(paths[userId], {color: polylinesColors[userId]}).addTo(map);
    socket.emit("sendRestaurantLatLng", index);
    calculateDistance()
}

function SeePositionRestaurant(lat, lng){
    map.setView([lat, lng], 16)
}






























// DATA
/*
let endPoint = L.marker([48.84974, 2.35249], {icon: endPointIcon}).addTo(map);

let users = [
    (L.marker([48.85539, 2.34501], {icon: userIcon}).addTo(map)),
    (L.marker([48.85759, 2.35106], {icon: userIcon}).addTo(map)),
    (L.marker([48.85877, 2.34740], {icon: userIcon}).addTo(map)),
]

let restaurants = [
    ["La Brasserie de l'Isle Saint-Louis", (L.marker([48.85303, 2.35342], {icon: restaurantIcon}).addTo(map))],
    ["Allard", (L.marker([48.85332, 2.34101], {icon: restaurantIcon}).addTo(map))],
    ["Pizzawawa", (L.marker([48.86071, 2.34560], {icon: restaurantIcon}).addTo(map))],
    ["Le Bistro du Perigord", (L.marker([48.84986, 2.34517], {icon: restaurantIcon}).addTo(map))],
    ["Bar Sotto", (L.marker([48.86172, 2.36130], {icon: restaurantIcon}).addTo(map))]
]

let paths = [
    ([users[0].getLatLng(), restaurants[0][1].getLatLng(), endPoint.getLatLng()]),
    ([users[1].getLatLng(), restaurants[3][1].getLatLng(), endPoint.getLatLng()]),
    ([users[2].getLatLng(), restaurants[4][1].getLatLng(), endPoint.getLatLng()])
]

let polylinesColors = ['crimson', 'green', 'blue']

let polylines = [
    (L.polyline(paths[0], {color: polylinesColors[0]}).addTo(map)),
    (L.polyline(paths[1], {color: polylinesColors[1]}).addTo(map)),
    (L.polyline(paths[2], {color: polylinesColors[2]}).addTo(map))
]*/

// EVENT MAP CLICK
map.on('click', onMapClick);

/*
socket.on("receiveUserLatLng", (usersLatLngAndId) => {
    let getLatLng = usersLatLngAndId[0];
    let getUserId = usersLatLngAndId[1];
    users[getUserId][0].setLatLng(getLatLng);
    
    paths[getUserId][0] = users[getUserId][0].getLatLng();
    map.removeLayer(polylines[getUserId]);
    polylines[getUserId] = L.polyline(paths[getUserId], {color: polylinesColors[getUserId]}).addTo(map);
    calculateDistance();
})*/

function onMapClick(event) {
    if (stateMyPosition === true){
        users[userId][0].setLatLng(event.latlng)
        paths[userId][0] = users[userId][0].getLatLng()
        map.removeLayer(polylines[userId])
        polylines[userId] = L.polyline(paths[userId], {color: polylinesColors[userId]}).addTo(map);
        let usersLatLngAndId = [users[userId][0].getLatLng(), userId];
        socket.emit("sendUserLatLng", (usersLatLngAndId));
        calculateDistance()
    }
    if (stateEndPosition === true){
        endPoint.setLatLng(event.latlng)
        socket.emit("sendEndPointLatLng", endPoint.getLatLng());

        users.forEach((element, index) => {
            paths[index][2] = endPoint.getLatLng()
            map.removeLayer(polylines[index])
            polylines[index] = L.polyline(paths[index], {color: polylinesColors[index]}).addTo(map);
            calculateDistance()
        })
    }
}

// CALCULATE DISTANCE

if (userId !== "undefined"){
    calculateDistance()
}
function calculateDistance() {
    let usersDistances = [0, 0, 0]; // m
    let vitesse = 4 // km/h

    users.forEach((user, userIndex) => {
        document.getElementsByClassName('set_user')[userIndex].innerHTML = `<b>${user[1]}</b>`;
        paths[userIndex].forEach ((path, pathIndex) => {
            if (paths[userIndex][pathIndex + 1] !== undefined) {
                usersDistances[userIndex] += Math.floor(path.distanceTo(paths[userIndex][pathIndex + 1]));
            }
        })
    })

    const userDitancesKm = usersDistances.map(element => (element / 1000));
    const userDitancesHPercent = userDitancesKm.map(element => element / 4);
    const userTravelTimeMin = userDitancesKm.map(element => (((element / 4) * 60)).toFixed(0));

    /*console.log(userDitancesKm)
    console.log(userDitancesHPercent)
    console.log(userTravelTimeMin)*/

    polylines.forEach((element, index) => {
        polylines[index].bindTooltip(`
            <b>Utilisateur ${(index + 1)}</b></br>Distance: ${usersDistances[index]}m </br>
            Durée: ${userTravelTimeMin[index]}min`,
            {permanent: true}
        );
        document.getElementsByClassName("distance_time")[index].innerHTML = `
            Distance : <b style="color:purple">${usersDistances[index]}m</b><br>
            Durée : <b style="color:crimson">${userTravelTimeMin[index]}min</b><br>
            Vitesse : <b style="color:green">${vitesse}Km/h</b>
        `;
    })
}






























/*let users = [
    [(L.marker([48.85539, 2.34501], {icon: userIcon}).addTo(map)), "theo"],
    [(L.marker([48.85759, 2.35106], {icon: userIcon}).addTo(map)), "nico"],
    [(L.marker([48.85877, 2.34740], {icon: userIcon}).addTo(map)), "alex"],
]*/



//________________________________SERVER_TO_CLIENT__________________________________//

// USER GET PROFIL / CONNEXION

socket.on('clientConnection', function(authorizedUser) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pseudo = urlParams.get('pseudo');
    const password = urlParams.get('password');
    let userInfos = [pseudo, password]
    socket.emit("attributionUser", userInfos);

    //let accessMap = false;

    /*
    authorizedUser.forEach((element, index) => {
        if (pseudo === element[0] && password === element[1]) {
            accessMap = true;
            socket.emit("attributionUser", element[0]);
        }
    });*/

    /*if (accessMap === false) {
        document.location.href = "./connexion.html";
    }*/
});

socket.on("connectionValidate", (myUserInfo) => {
    userInfo = myUserInfo;
    userId = myUserInfo[3];
    users[userId][0].setIcon(myUserIcon)
});

socket.on("sendListMessage", (messages) => {
    let messageClass; 

    messages.forEach((element, index) => {
        if (userInfo[0] === messages[index][0]) messageClass = "message_user"
        else messageClass = ""

        document.getElementById("messageList").insertAdjacentHTML("beforeend", `
        <div class="message_bubble ${messageClass}">
            <div><i><b>${element[0]}</b></i></div>
            <div>
                ${element[1]}
            </div>
        </div>
        `)
    })
    document.getElementsByClassName("message_bubble")[document.getElementsByClassName("message_bubble").length - 1].scrollIntoView({behavior: "smooth"});
});

socket.on("redirectConnection", () => {
    document.location.href = "./connexion.html";
});

// GET MESSAGE AND DISPLAY IT
socket.on("receiveMessage", (message, socketId) => {
    let receivedMessage = message;
    let getMessage = receivedMessage[1];
    let user = socketId;

    document.getElementById("messageList").insertAdjacentHTML("beforeend", `
    <div class="message_bubble">
        <div><i><b>${user}</b></i></div>
        <div>
            ${getMessage}
        </div>
    </div>
    `)
    document.getElementsByClassName("message_bubble")[document.getElementsByClassName("message_bubble").length - 1].scrollIntoView({behavior: "smooth"});
});


// GET USER START POINT
socket.on("receiveUserLatLng", (usersLatLngAndId) => {
    let getLatLng = usersLatLngAndId[0];
    let getUserId = usersLatLngAndId[1];
    users[getUserId][0].setLatLng(getLatLng);

    paths[getUserId][0] = users[getUserId][0].getLatLng();
    map.removeLayer(polylines[getUserId]);
    polylines[getUserId] = L.polyline(paths[getUserId], {color: polylinesColors[getUserId]}).addTo(map);
    calculateDistance();
})

// GET END POINT
socket.on("receiveEndPointLatLng", (endPointLatLng) => {
    endPoint.setLatLng(endPointLatLng);
    users.forEach((element, index) => {
        paths[index][2] = endPoint.getLatLng();
        map.removeLayer(polylines[index]);
        polylines[index] = L.polyline(paths[index], {color: polylinesColors[index]}).addTo(map);
        calculateDistance();
    })
})

// GET RESTAURANTS
socket.on("receiveRestaurantLatLng", (restaurantsLatLng) => {
    paths[0][1] = restaurants[restaurantsLatLng][1].getLatLng()
    map.removeLayer(polylines[0]);
    polylines[0] = L.polyline(paths[0], {color: polylinesColors[0]}).addTo(map);
    calculateDistance();
})