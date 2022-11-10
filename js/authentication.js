// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseConfig = {
    apiKey: "AIzaSyDyTrrSfHCOqCQ_nEreJHzEDZRar1YrV2o",
    authDomain: "fitcheck-91d37.firebaseapp.com",
    databaseURL: "https://fitcheck-91d37-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fitcheck-91d37",
    storageBucket: "fitcheck-91d37.appspot.com",
    messagingSenderId: "962396261979",
    appId: "1:962396261979:web:20161107427c928bf6b97e",
    measurementId: "G-NP0PPTH0RB"
    };

let app = firebase.initializeApp(firebaseConfig)
let db = app.firestore()
let auth = app.auth()

//user database
let userDatabase = db.collection('users')

//user registration
const register = () => {
    const email = document.getElementById("regEmail").value
    const name = document.getElementById("regName").value
    const password = document.getElementById("regPassword").value

    auth.createUserWithEmailAndPassword(email, password)
        .then((res) => {
            var userId = res.user.uid
            console.log(userId)

            //user data
            var userData = {
                email: email,
            }

            //push to FB
            userDatabase.doc(userId).set(userData)
            .then(() => {
                console.log("Document written with ID: ", userId);
                openPopup()
            })
            .catch((err) => {
                console.error("Error addding document: ", err);
            })

            //add name field to document
            firebase.auth().currentUser.updateProfile({
                displayName: name
            })
        })
        .catch((err) => {
            alert(err.message)
            console.log(err.code)
            console.log(err.message)
        })
}

//user login
const login = () => {
    const email = document.getElementById("loginEmail").value
    const password = document.getElementById("loginPassword").value
    auth.signInWithEmailAndPassword(email, password)
    .then((res) => {
        console.log(res.user.id, "successfully logged in")
        window.location.href = "dashboard.html"
    })
    .catch((err) => {
        alert(err.message)
        console.log(err.code)
        console.log(err.message)
    })
}

