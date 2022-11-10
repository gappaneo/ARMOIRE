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

//preview image
const reader = new FileReader;
let imgPreview = document.querySelector('#imgPreview');
const fileInput = document.querySelector('#photo');
reader.onload = e => {
    imgPreview.src = e.target.result;
}
fileInput.addEventListener('change', e => {
    const f = e.target.files[0];
    console.log(f);
    reader.readAsDataURL(f);
})

const form = document.getElementById("addOutfit")
function add(e){
    // e.preventDefault();
    console.log("adding")

    var outfitImg = document.querySelector("#photo").files[0];
    var date = new Date();
    const imgName = date.getTime() + outfitImg.name;
    console.log("IMG NAME:" + imgName);
    const task = storageRef.child(imgName).put(outfitImg);
    task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
        imgURL = url;
        console.log(url) //THIS IS WHAT I NEED TO CALL IMG 

        var outfitImg = url
        var outfitName = document.getElementById('outfitName').value
        var outfitStyle = document.getElementById('outfitStyle').value   

        //outfit data
        var outfitData = {
            url: outfitImg,
            name: outfitName,
            style: outfitStyle
            // date: date
        }

        console.log(outfitData)

        //retrieve user id
        auth.onAuthStateChanged(user => {
            console.log("authentication")
            if(user){
                //push to FB
                // var docName = date.getTime() + outfitIm
                db.collection('users').doc(user.uid).collection('outfits').doc(imgName, "-", user.uid).set({
                    outfitData
                })
                .then(()=> {
                    console.log(outfitData, " added")
                })
                .catch((error) => {
                    console.error("error adding outfit data", error);
                })
            }
        })
    })
    // window.location.assign("dashboard.html")
}


