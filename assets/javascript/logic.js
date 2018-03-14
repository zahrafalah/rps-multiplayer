
var config = {
    apiKey: "AIzaSyBX26FMjCavYa5gMAOnURuKE0ow979rdQQ",
    authDomain: "rps-multiplayer-8c4cd.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-8c4cd.firebaseio.com",
    projectId: "rps-multiplayer-8c4cd",
    storageBucket: "rps-multiplayer-8c4cd.appspot.com",
    messagingSenderId: "393729561069"
  };
  firebase.initializeApp(config);

var player1 = "";
var player2 = "";
var player1Name = "";
var player2Name = "";
// var yourPlayerName = "";
var player1Choice = "";
var player2Choice = "";

var turn = 1;

var database = firebase.database();

database.ref().set({
    player1: player1,
    player2: player2,
    player1Name: player1Name,
    player2Name: player2Name,

  });

database.ref().on("value", function(snapshot) {
    if (snapshot.child("player1").exists()) {
        console.log("player1 exist");

        // player1 = snapshot.val().player1;
        // player1Name = player1.name;

        // $("#playerOneName").text(player1Name);

    }    
    // console.log(snapshot.val());
    // console.log(snapshot.val());

    
        
});