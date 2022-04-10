import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getFirestore, doc,setDoc, getDoc, getDocs, collection,addDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { signInWithEmailAndPassword,  createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import firebaseConfig from "./config.js";
const {
  signInWithPopup,getAuth,signInWithRedirect
} =require('firebase/auth');

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("reg-btn").addEventListener('click', function(){
  document.getElementById("register-div").style.display="inline";
  document.getElementById("login-div").style.display="none";
});

document.getElementById("log-btn").addEventListener('click', function(){
 document.getElementById("register-div").style.display="none";
 document.getElementById("login-div").style.display="inline";

});

document.getElementById("login-btn").addEventListener('click', function(){
   const loginEmail= document.getElementById("login-email").value;
   const loginPassword =document.getElementById("login-password").value;
   //console.log(firebaseConfig);
   /* module.exports.email = async function() {
    await emailsend();
}
  var emailsend = async function() {
    console.log(loginEmail);
    return loginEmail;
  } */
   signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  .then((userCredential) => {
    const user = userCredential.user;
    document.getElementById("result-box").style.display="inline";
     document.getElementById("login-div").style.display="none";
     document.getElementById("result").innerHTML="Welcome Back<br>"+loginEmail;
     setTimeout(function(){
      window.location.replace("index.html");}, 1000)
  })

  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    document.getElementById("result-box").style.display="inline";
     document.getElementById("login-div").style.display="none";
     document.getElementById("result").innerHTML="Sorry ! <br>"+errorMessage;

  });
});


document.getElementById("register-btn").addEventListener('click', function(){
  const registerEmail= document.getElementById("register-email").value;
  const registerPassword =document.getElementById("register-password").value;
  createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
.then((userCredential) => {
  const user = userCredential.user;
  document.getElementById("result-box").style.display="inline";
    document.getElementById("register-div").style.display="none";
    document.getElementById("result").innerHTML="Welcome <br>"+registerEmail+" was Registered Successfully";
}).catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  document.getElementById("result-box").style.display="inline";
    document.getElementById("register-div").style.display="none";
    document.getElementById("result").innerHTML="Sorry ! <br>"+errorMessage;

});
});


document.getElementById("log-out-btn").addEventListener('click', function(){
  signOut(auth).then(() => {
     document.getElementById("result-box").style.display="none";
       document.getElementById("login-div").style.display="inline";
  }).catch((error) => {
     document.getElementById("result").innerHTML="Sorry ! <br>"+errorMessage;
  });

});
var email=document.getElementById("login-email").value;
console.log(email);
export default email;