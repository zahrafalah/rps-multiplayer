
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
var numberOfPlayers = 0 ;

var turn = 1;

var database = firebase.database();



player1Name = $("#first-name").val().trim();
player2Name = $("#first-name").val().trim();

// database.ref().set({
//     player1: player1,
//     player2: player2,
//     player1Name: player1Name,
//     player2Name: player2Name,

//   });

  $("#add-name").on("click" ,function(event){
      console.log(event);
    event.preventDefault();
    
    
    if ( ($("#first-name").val().trim() !== "") && !(player1 && player2) ) {
        if (player1 === ""){
            console.log("Adding player1");       

            yourPlayerName = $("#first-name").val().trim();
            player1 = {
                name: yourPlayerName,
                win: 0,
                loss: 0,
                tie: 0,
                choice: "",                
            }

            database.ref().child("/players/player1").set(player1);
            database.ref().child("/turn").set(1);

        }
      
    else if( (player1 !== "") && (player2 === "") ) {           
        console.log("adding player2");      

        yourPlayerName = $("#first-name").val().trim();
        player2 = {
            name: yourPlayerName,
            win: 0,
            loss: 0,
            tie: 0,
            choice: "",
        };
        database.ref().child("/players/player2").set(player2);
       
    }
}
    // $("#first-name").val("")
})




database.ref("players").on("value", function(snapshot) {
    
    if (snapshot.child("player1").exists()) {
        console.log("player1 exists");

        player1 = snapshot.val().player1;
        player1Name = player1.name;
        $("#playerOneName").text(player1Name);
        $("#player1Stats").html("Win: " + player1.win + ", Loss: " + player1.loss + ", Tie: " + player1.tie);
    }
    else {
        console.log("player1 does not exist");
    }  
    
    if (snapshot.child("player2").exists()) {
		console.log("Player2 exists");

		player2 = snapshot.val().player2;
		player2Name = player2.name;

		$("#playerTwoName").text(player2Name);
		$("#player2Stats").html("Win: " + player2.win + ", Loss: " + player2.loss + ", Tie: " + player2.tie);
    } 
    else {
		console.log("Player2 does NOT exist");
    }
         
    });

database.ref("/chat/").on("child_added", function(snapshot) {

	var chatMsg = snapshot.val();
    var chatEntry = $("<div>").html(chatMsg);

    console.log(chatEntry);

    $("#chat-input").append(chatEntry);	
    $("#chat-input").scrollTop("#chat-input");
    
});


$("#chat-send").on("click", function(event) {
	event.preventDefault();

		var msg = yourPlayerName + ": " + $("#chat").val().trim();
		// $("#chat-input").val("");

        console.log(msg);
        
		var chatKey = database.ref().child("/chat/").push().key;
		    database.ref("/chat/" + chatKey).set(msg);
        
});

$("#playerCard1").on("click", ".cardOption", function(event) { 
        event.preventDefault();

    var choice = $(this).text();
        player1Choice = choice
        console.log(player1Choice);
        database.ref().child("/players/player1/choice").set(choice);
        turn = 2;
        database.ref().child("/turn").set(2);
        
});

$("#playerCard2").on("click", ".cardOption", function(event) { 
        event.preventDefault();

    var choice = $(this).text();
        player2Choice = choice
        console.log(player2Choice);
        database.ref().child("/players/player2/choice").set(choice);               

		
});
