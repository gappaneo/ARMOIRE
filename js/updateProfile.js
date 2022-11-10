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

//preview image
const reader = new FileReader;
let imgPreview = document.querySelector('#profilePreview');
const fileInput = document.querySelector('#updatePhoto');
reader.onload = e => {
    imgPreview.src = e.target.result;
}
fileInput.addEventListener('change', e => {
    const f = e.target.files[0];
    console.log(f);
    reader.readAsDataURL(f);
})

function updatePicture(){
    user = firebase.auth().currentUser;
    var profilePicture = document.querySelector("#updatePhoto").files[0];
    const imgName = user.uid+"_profilePicture";
    const task = storageRef.child("profile").child(imgName).put(profilePicture);
    // task
    // .then(snapshot => snapshot.ref.getDownloadURL())
    // .then(url => {
    //     imgURL = url;
    //     //retrieve user id
    //     auth.onAuthStateChanged(user => {
    //       console.log("authentication")
    //       if(user){
    //           user.updateProfile({photoURL: imgURL})
    //           //console.log (imgURL) //THIS IS WHAT I NEED TO CALL IMG              
    //           .then(()=> {
    //               console.log(user.photoURL, " added")
    //           })
    //           .catch((error) => {
    //               console.error("error adding outfit data", error);
    //           })
    //       }
    //   })
    // })
}

function updateProfile(){
    user = firebase.auth().currentUser;
    
    //update name
    var updateName = document.getElementById("updateName").value
    if (updateName == "") {
      updateName = this.user.displayName
    }
    user.updateProfile({displayName: updateName})

    //update email
    var email = document.getElementById("updateEmail").value
    if (email == "") {
      email = this.user.email
    } 
    user.updateEmail(email)

    db.collection("users").doc(user.uid).update({
      displayName: updateName,
      email: email
    })
};

function updatePassword(){
    user = firebase.auth().currentUser;

    //update password
    var updatePassword = document.getElementById("updatePassword").value
    user.updatePassword(updatePassword)
    .then(()=>{
        console.log("updated")
    })
};

function deleteProfile(){
    const user = firebase.auth().currentUser;
    user.delete(()=> {
        alert("Successfully deleted profile")
        window.location.href = "index.html"
    }).catch((error) => {
        alert("Error deleting profile")
    })
}