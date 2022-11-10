//user authentication
var firebaseConfig = {
	apiKey: "AIzaSyDyTrrSfHCOqCQ_nEreJHzEDZRar1YrV2o",
	authDomain: "fitcheck-91d37.firebaseapp.com",
	databaseURL: "https://fitcheck-91d37-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "fitcheck-91d37",
	storageBucket: "fitcheck-91d37.appspot.com",
	messagingSenderId: "962396261979",
	appId: "1:962396261979:web:20161107427c928bf6b97e",
	measurementId: "G-NP0PPTH0RB"
	};

var app = firebase.initializeApp(firebaseConfig)
var db = app.firestore()
var auth = app.auth()
//set up cloud storage
var storage = firebase.storage();
var storageRef = storage.ref(); 
var votetitle = document.getElementById("voteTitle");
var voteoccasion = document.getElementById("voteOccasion");
var sbtBtn = document.getElementById("submitbtn")

//add user authentication here
auth.onAuthStateChanged((user) => {
	if(user) {
		const userId = user.uid;
		console.log(userId)
	} else {
		window.location.href = "index.html"		
		console.log("User not authenticated, sign in again.")
	}
	console.log("user: ", user)
})

//Insert Data functions
//generates random id;
let generateId = () => {
  let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
  }
  //return id of format 'aaaaaaaa'
  return s4() + s4();
}

// Add a new document in collection "Votes"
function createnewvote() {
	var temp_id = generateId();
	
	auth.onAuthStateChanged(user => {
		console.log("authentication")
		if(user){
			//push to FB
			db.collection('users').doc(user.uid).collection('votes').add({
				VoteTitle: votetitle.value,
				VoteOccasion: voteoccasion.value,
				VoteStatus: "Open",
				outfit1img : "outift 1 goes here",
				outfit2img : "outift 2 goes here",
				Votecount1 : 0,
				Votecount2 : 0,
			})
			.then(()=> {
				alert("Vote has been created!")
				window.location.replace("dashboard.html");
			})
			.catch((error) => {
				console.error("Error creating vote", error);
			})
		}
	})

}

// assign events to button
sbtBtn.addEventListener("click", createnewvote);