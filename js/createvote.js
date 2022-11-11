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
var imgarr = []
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


auth.onAuthStateChanged(user => {

	if(user){
	  //push to FB
	  console.log("im here")
	  docRef = db.collection('users').doc(user.uid).collection('outfits')
		//for loop through all votes in the "votes" collection
		docRef.get().then(snap => {
		  snap.forEach((doc) => {
			console.log(doc.id);
			console.log(doc.data());
			document.getElementById("imagegallery").innerHTML += `<label class="card outfitSelCard">
			<input type="checkbox" class="outfitCheckBox" name="outfitSel" value="${doc.data().outfitData.url}" onclick="return voteLimit()"/>
			<div class="card-content">
			  <img src="${doc.data().outfitData.url}"/>
			  <div class="content outfitSelContent">
				<h4>${doc.data().outfitData.name}</h4>
			  </div>
			</div>
		  </label>`
		  //console.log here to visualise dataset
		  });
		});      
	}
  
	else {
	  console.log("this shit is not working")
	}
  })

//Insert Data functions
  //Limit the number of votes
  function voteLimit() {
	var a = document.getElementsByName('outfitSel');
	var newvar = 0;
	var count;
	for(count=0;count<a.length;count++){
		if(a[count].checked==true){
			newvar = newvar + 1;
		}
	}

	if(newvar>=3){
		document.getElementById('notvalid').innerHTML="Please only select two images"
		return false;
	}

}

function getimages() {

	let checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
	for (let i = 0; i < checkboxes.length; i++) {
	imgarr.push(checkboxes[i].value)
	}
	// Converted array to string & alert
	console.log(imgarr.toString())
	}

// Add a new document in collection "Votes"
function createnewvote() {
	
	auth.onAuthStateChanged(user => {
		console.log("authentication")
		if(user){
			//push to FB
			db.collection('users').doc(user.uid).collection('votes').add({
				VoteTitle: votetitle.value,
				VoteOccasion: voteoccasion.value,
				VoteStatus: "Open",
				outfit1img : imgarr[0],
				outfit2img : imgarr[1],
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
sbtBtn.addEventListener('click',() => {    
	getimages();
	createnewvote();    
});





