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

//set up cloud storage
var storage = firebase.storage();
var storageRef = storage.ref();

//get document id
var vars = {}; 
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) { 
   vars[key] = value; 
});
console.log("hello")
console.log(vars.id)

auth.onAuthStateChanged((user) => {
	if(user) {
        var docRef = db.collection('users').doc(user.uid).collection('outfits').doc(vars.id);
        docRef.get()
        .then((doc) => {
            var outfitData = doc.data().outfitData
            console.log(outfitData)
                // console.log(doc.data())
                document.getElementById('outfitName').defaultValue = outfitData.name
                document.getElementById('outfitStyle').defaultValue = outfitData.style
                document.getElementById('outfitDescription').defaultValue = outfitData.description
                document.getElementById('outfitImg').src = outfitData.url
            })
            .catch((error) => {
                console.error("error adding outfit data", error);
            })
    }
})

function updateOutfitData(){
    console.log("helllo")
    var user = firebase.auth().currentUser;
    console.log(user)
    db.collection('users').doc(user.uid).collection('outfits').doc(vars.id)
    .update({
        "outfitData.name": document.getElementById('outfitName').value,
        "outfitData.style": document.getElementById('outfitStyle').value,
        "outfitData.description": document.getElementById('outfitDescription').value
    
        ///image update
    })
    .then(() => {
        console.log("document successfully updated")
    })
}

function showUpdatedOutfit(){
    window.location.href = "showOutfit.html?id=" + vars.id
}