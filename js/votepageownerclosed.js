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

// global variables 
var app = firebase.initializeApp(firebaseConfig)
var db = app.firestore()
var auth = app.auth()
var storage = firebase.storage();
var storageRef = storage.ref(); 
var LikeBtn1 = document.getElementById("likebtn1");
var LikeBtn2 = document.getElementById("likebtn2")
let temp = window.location.search
var temparr = temp.split("&")
let tempvoteurl = temparr[0]
let tempuserid = temparr[1]
var voteurl = temparr[0].slice(8,length.tempvoteurl)
var votestr = "voted" + voteurl
var hasVoted = localStorage.getItem(votestr);
console.log(voteurl)

auth.onAuthStateChanged(user => {
  if(user){
    // to check that im entering the correct part of the function
    console.log("im here")
    //set path
    var docRef = db.collection('users').doc(user.uid).collection('votes').doc(voteurl)

    docRef.get().then((doc) => {
        if (doc.exists) {
            // console.log here just for me to see that im getting the correct data
            console.log("Document data:", doc.data().Votecount2);
            //set vote title in html page
            document.getElementById("votetitle").innerHTML = doc.data().VoteTitle
            //retrieves number of likes from variables Votecount1 & Votecount2 and sets it in the html page
            document.getElementById("input1").innerHTML = doc.data().Votecount1
            document.getElementById("input2").innerHTML = doc.data().Votecount2
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    });
  }
  else {
    console.log("this shit is not working")
  }
})
