function submit(){
    pseudo = document.getElementById("pseudo").value
    password = document.getElementById("password").value

    document.location.href=`./index.html?pseudo=${pseudo}&password=${password}`;
}