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
var useruid = tempuserid.slice(7, length.tempuserid)
var voteurl = temparr[0].slice(8,length.tempvoteurl)
var votestr = "voted" + voteurl
var hasVoted = localStorage.getItem(votestr);
console.log(window.location.pathname)

// check if the person using the machine has voted before 
if (hasVoted){
  document.getElementById("likebutton1").innerHTML = "Voted 🤝";
  document.getElementById("likebutton2").innerHTML = "Voted 🤝";
}



//set path
var docRef = db.collection('users').doc(useruid).collection('votes').doc(voteurl)

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





LikeBtn1.addEventListener('click', () => {
  // 👇 hide button
  alert("Vote has been placed!")
  document.getElementById("likebutton1").innerHTML = "Voted 🤝";
  document.getElementById("likebutton2").innerHTML = "Voted 🤝";
  localStorage.setItem(votestr , true);
});

LikeBtn2.addEventListener('click', () => {
  // 👇 hide button
  alert("Vote has been placed!")
  document.getElementById("likebutton1").innerHTML = "Voted 🤝";
  document.getElementById("likebutton2").innerHTML = "Voted 🤝";
  localStorage.setItem(votestr, true);
});




//functions to add a like to outfit

function likeoutfit1(){
  var numlikes = document.getElementById("input1").innerText
  numlikes++
  document.getElementById("input1").innerHTML = numlikes


      // to check that im entering the correct part of the function
      console.log("vote placed")
      //set path
      var Ref = db.collection('users').doc(useruid).collection('votes').doc(voteurl);
      return Ref.update({
        Votecount1: numlikes
    })

}

function likeoutfit2() {
  var numlikes = document.getElementById("input2").innerText
  numlikes++
  document.getElementById("input2").innerHTML = numlikes


      // to check that im entering the correct part of the function
      console.log("vote placed")
      //set path
      var Ref = db.collection('users').doc(useruid).collection('votes').doc(voteurl);
      return Ref.update({
        Votecount2: numlikes
    })

}
