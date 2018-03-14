
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
var yourPlayerName = "";
var player1Choice = "";
var player2Choice = "";

var turn = 1;

var database = firebase.database();



player1Name = $("#first-name").val().trim();
player2Name = $("#first-name").val().trim();

database.ref().set({
    player1: player1,
    player2: player2,
    player1Name: player1Name,
    player2Name: player2Name,

  });

  $("#add-name").on("click" ,function(event){
      console.log(event);
    event.preventDefault();

    player1Name = $("#first-name").val().trim();
    console.log(player1Name);
    $("#playerOneName").text(player1Name);
    $("#player1Stats").html("Win: " + player1.win + ", Loss: " + player1.loss + ", Tie: " + player1.tie);
    

    player2Name = $("#first-name").val().trim();
    console.log(player2Name);
    $("#playerTwoName").text(player2Name);
    $("#player2Stats").html("Win: " + player2.win + ", Loss: " + player2.loss + ", Tie: " + player2.tie);

    yourPlayerName = $("#first-name").val().trim();
			player1 = {
				name: yourPlayerName,
				win: 0,
				loss: 0,
				tie: 0,
				choice: ""
            };
    database.ref().child("/players/player1").set(player1);
    database.ref().child("/turn").set(1);

    yourPlayerName = $("#first-name").val().trim();
			player2 = {
				name: yourPlayerName,
				win: 0,
				loss: 0,
				tie: 0,
				choice: ""
			};
    database.ref().child("/players/player2").set(player2);
    
})




database.ref().on("value", function(snapshot) {
   
    player1 = snapshot.val().player1;
    player1Name = player1.name;
    
    console.log(snapshot.val());
    console.log(player1Name);
    $("#playerOneName").text(snapshot.val().player1Name);

    // console.log(snapshot.val().age);
    // console.log(snapshot.val().comment);
    // console.log(snapshot.val());
     
        
});

$("#chat-send").on("click", function(event) {
	event.preventDefault();

		var msg = yourPlayerName + ": " + $("#chat").val().trim();
		$("#chat-input").val("");

		console.log(msg);

});