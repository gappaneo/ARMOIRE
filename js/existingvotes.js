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

auth.onAuthStateChanged(user => {

  if(user){
    //push to FB
    console.log("im here")
    docRef = db.collection('users').doc(user.uid).collection('votes')
      //for loop through all votes in the "votes" collection
      docRef.get().then(snap => {
        snap.forEach((doc) => {
          console.log(doc.id);
          console.log(doc.data());
        //console.log here to visualise dataset
        if (doc.data().VoteStatus == "Open"){
          document.getElementById("votelist").innerHTML += `<li><a href=votepageowner.html?voteid=${doc.id}&userid=${user.uid}> ${doc.data().VoteTitle} </a></li>`;
        }
        });
      });      
  }

  else {
    console.log("this shit is not working")
  }
})

// retrieve created vote - need to make it dynamic

