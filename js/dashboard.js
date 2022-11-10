//user authentication
var firebaseConfig = {
  apiKey: "AIzaSyDyTrrSfHCOqCQ_nEreJHzEDZRar1YrV2o",
  authDomain: "fitcheck-91d37.firebaseapp.com",
  databaseURL:
    "https://fitcheck-91d37-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fitcheck-91d37",
  storageBucket: "fitcheck-91d37.appspot.com",
  messagingSenderId: "962396261979",
  appId: "1:962396261979:web:20161107427c928bf6b97e",
  measurementId: "G-NP0PPTH0RB",
};

var app = firebase.initializeApp(firebaseConfig);
var db = app.firestore().collection("users");
var auth = app.auth();
var outfits = [];


function filterSelection(query){
  //clear existing elements
  // console.log("before", e)
  //e.firstElementChild can be used.
  var e = document.getElementById("load");
  e.innerHTML = "";
  // document.getElementById("query")
  console.log("query = " + query) 
  loadImages(query)
  
}


function loadImages(query){
  var container = document.getElementById('load');
  var docFrag = document.createDocumentFragment();
  var count = 0
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const userId = user.uid;
      console.log("uid=", userId);
      const userDB = db.doc(userId).collection("outfits")
        userDB.get()
        .then((querySnapshot) => {          

          ////////////////////////////////////////////////////////////////
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, "=", doc.data());
            var outfitStyle = doc.data().outfitData.style;
            console.log(outfitStyle, query)     //query 
            
            //if query ALL
            if (query == 'all'){
              count = querySnapshot.size
              imgURL = doc.data().outfitData.url
              // console.log(doc.data().outfitData.url);
              // outfits.push(doc.data().outfitData.url);
    
              // images for dashboard
              //create image tag
              var img = document.createElement('img');
              img.src = imgURL
//               img.width = '100'
              console.log(img)
              
              //create inner dig tag
              var iDiv = document.createElement('div');
              iDiv.setAttribute("class","gallery-links d-flex align-items-center justify-content-center")
              //create link tag
              var link = document.createElement('a');
              link.href = "showOutfit.html?id=" + doc.id
              link.setAttribute("class","glightbox preview-link")
              //create i tag
              var i = document.createElement('i');
              i.setAttribute("class","bi bi-arrows-angle-expand")
              //insert i into link 
              link.appendChild(i)
    
              //insert link into inner div tag
              iDiv.appendChild(link);
    
              //create outer div box tag
              var oDiv = document.createElement('div')
              oDiv.setAttribute("class", 'container-fluid gallery-item mb-4')
              //insert img and inner div box
              oDiv.appendChild(img)
              oDiv.appendChild(iDiv)
              docFrag.appendChild(oDiv);
    
              //add to docFrag 
              console.log("docFrag", docFrag)
              console.log(container)
              container.appendChild(docFrag);
              //show # results
              document.getElementById("countResults").innerHTML = count + " results found";
            }
            else if (outfitStyle == query){
              count ++
              imgURL = doc.data().outfitData.url
              console.log(imgURL);
              // outfits.push(doc.data().outfitData.url);

              // images for dashboard
              //create image tag
              var img = document.createElement('img');
              img.src = imgURL
//               img.width = '100'
              // console.log(img)
              
              //create inner dig tag
              var iDiv = document.createElement('div');
              iDiv.setAttribute("class","gallery-links d-flex align-items-center justify-content-center")
              //create link tag
              var link = document.createElement('a');
              link.href = "showOutfit.html?id=" + doc.id
              link.setAttribute("class","glightbox preview-link")
              //create i tag
              var i = document.createElement('i');
              i.setAttribute("class","bi bi-arrows-angle-expand")
              //insert i into link 
              link.appendChild(i)

              //insert link into inner div tag
              iDiv.appendChild(link);

              //create outer div box tag
              var oDiv = document.createElement('div')
              oDiv.setAttribute("class", 'container-fluid gallery-item mb-4')
              //insert img and inner div box
              oDiv.appendChild(img)
              oDiv.appendChild(iDiv)

              //add to docFrag 
              docFrag.appendChild(oDiv);
              console.log("docFrag", docFrag);

              // console.log(outfits);
              console.log(container)
              container.appendChild(docFrag);
              // console.log(doc.data()) 
            } else {
            console.log("query not found")
            }
          });          
          
          //show # results
          document.getElementById("countResults").innerHTML = count + " results found";

        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    } else {
      window.location.href = "index.html";
      console.log("User not authenticated, sign in again.");
    }
  });
};
// }


//load all before query
firebase.auth().onAuthStateChanged((user) => {
  var container = document.getElementById('load');
  var docFrag = document.createDocumentFragment();
  if (user) {
    const userId = user.uid;
    console.log("uid=", userId);
    const userDB = db
      .doc(userId)
      .collection("outfits")
      .get()
      .then((querySnapshot) => {
        count = querySnapshot.size
        querySnapshot.forEach((doc) => {
          console.log(doc.id, "=", doc.data());
          imgURL = doc.data().outfitData.url
          // console.log(doc.data().outfitData.url);
          // outfits.push(doc.data().outfitData.url);

          // images for dashboard
          //create image tag
          var img = document.createElement('img');
          img.src = imgURL
//           img.width = '100'
          console.log(img)
          
          //create inner dig tag
          var iDiv = document.createElement('div');
          iDiv.setAttribute("class","gallery-links d-flex align-items-center justify-content-center")
          //create link tag
          var link = document.createElement('a');
          link.href = "showOutfit.html?id=" + doc.id
          link.setAttribute("class","glightbox preview-link")
          //create i tag
          var i = document.createElement('i');
          i.setAttribute("class","bi bi-arrows-angle-expand")
          //insert i into link 
          link.appendChild(i)

          //insert link into inner div tag
          iDiv.appendChild(link);

          //create outer div box tag
          var oDiv = document.createElement('div')
          oDiv.setAttribute("class", 'container-fluid gallery-item mb-4')
          //insert img and inner div box
          oDiv.appendChild(img)
          oDiv.appendChild(iDiv)
          docFrag.appendChild(oDiv);

          //add to docFrag 
          console.log("docFrag", docFrag)
        });
        // console.log(outfits);
        console.log(container)
        container.appendChild(docFrag);
        //show # results
        document.getElementById("countResults").innerHTML = count + " results found";

      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  } else {
    window.location.href = "index.html";
    console.log("User not authenticated, sign in again.");
  }
});

// //link to showOutfit
// document.getElementById("open").onclick = function(e){
// 	e.preventDefault();
// 	window.open(this.href+"?id=0ZC8f6jkX7qiQrWItEyl")
// }

//user logout
var logout = () => {
  auth
    .signOut()
    .then(() => {
      window.location.href = "index.html";
      console.log("Sign-out successful");
    })
    .catch((error) => {
      // An error happened.
      console.log(error.message);
    });
};