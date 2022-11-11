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

// const form = document.getElementById("addOutfit")
function add(e){
    // e.preventDefault();
    console.log("adding")

    var outfitImg = document.querySelector("#photo").files[0];
    cleanedName = outfitImg.name.replaceAll(' ', '')
    var date = new Date();
    const imgName = date.getTime() + cleanedName;
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
        var outfitDescription = document.getElementById( 'description').value

        //outfit data
        var outfitData = {
            url: outfitImg,
            name: outfitName,
            style: outfitStyle,
            description: outfitDescription
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
}

/*  ==========================================
    SHOW UPLOADED IMAGE
* ========================================== */
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imageResult')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

$(function () {
    $('#upload').on('change', function () {
        readURL(input);
    });
});

/*  ==========================================
    SHOW UPLOADED IMAGE NAME
* ========================================== */
var input = document.getElementById( 'photo' );
var infoArea = document.getElementById( 'photo-label' );

console.log(infoArea)

input.addEventListener( 'change', showFileName );
function showFileName( event ) {
  var input = event.srcElement;
  var fileName = input.files[0].name;
  infoArea.textContent = 'File name: ' + fileName;
  console.log(infoArea.textContent)
}

  /**
   * Scroll top button
   */
   const addOutfit = document.querySelector('.add-outfit');
   if (addOutfit) {
     const togglescrollTop = function() {
       window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
     }
     window.addEventListener('load', togglescrollTop);
     document.addEventListener('scroll', togglescrollTop);
     scrollTop.addEventListener('click', window.scrollTo({
       top: 0,
       behavior: 'smooth'
     }));
   }

