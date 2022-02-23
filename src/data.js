import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword,  createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";

import firebaseConfig from "./config.js";
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


document.getElementById("log-out-btn").addEventListener('click', function(){
    signOut(auth).then(() => {
    /* document.getElementByClass("container").style.display="none";
        document.getElementById("infobox").style.display="inline"; */
        window.location.replace("form.html");
        /* setTimeout(function(){
            window.location.replace("form.html");}, 1000) */
    }).catch((error) => {
    document.getElementById("result").innerHTML="Sorry ! <br>"+errorMessage;
    });

});
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const ipcRenderer1 = electron.ipcRenderer;
ipcRenderer.on('cpu',(event,data) => {
document.getElementById('cpu').innerHTML = data.toFixed(2);
let progressBar = document.querySelector(".circular-progress");
let valueContainer = document.querySelector(".value-container");
let progressValue = data.toFixed(2);
let progressEndValue = data.toFixed(2);
let speed = 50;
let progress = setInterval(() => {
    valueContainer.textContent = `CPU\n${progressValue}%`;
    if(progressValue>80){
    progressBar.style.background = `conic-gradient(
    #ff8080 ${progressValue * 3.6}deg,
        #cadcff ${progressValue * 3.6}deg)`;
    }
    else{
    progressBar.style.background = `conic-gradient(
        #4d5bf9 ${progressValue * 3.6}deg,
        #cadcff ${progressValue * 3.6}deg)`;
    }
    if (progressValue == progressEndValue) {
    clearInterval(progress);
    }
}, speed);
});
ipcRenderer.on('sysload',(event,data) => {
document.getElementById('sysload').innerHTML = data.toFixed(2);

});
ipcRenderer1.on('mem',(event,data) => {
    document.getElementById('mem').innerHTML = data.toFixed(2);

    let progressBar = document.querySelector(".circular-progress1");
    let valueContainer = document.querySelector(".value-container1");
    let progressValue = data.toFixed(2);
    let progressEndValue = data.toFixed(2);
    let speed = 50;
    let progress = setInterval(() => {
    valueContainer.textContent = `Free-memory\n${progressValue}%`;
    if(progressValue<20){
    progressBar.style.background = `conic-gradient(
    #ff8080 ${progressValue * 3.6}deg,
        #cadcff ${progressValue * 3.6}deg)`;
    }
    else{
    progressBar.style.background = `conic-gradient(
        #4d5bf9 ${progressValue * 3.6}deg,
        #cadcff ${progressValue * 3.6}deg)`;
    }
    if (progressValue == progressEndValue) {
        clearInterval(progress);
    }
    }, speed);
});
ipcRenderer.on('total-mem',(event,data) => {
document.getElementById('total-mem').innerHTML = data.toFixed(2);

});
ipcRenderer.on('temp',(event,data) => {
document.getElementById('temp').innerHTML = data.toFixed(2);

let progressBar = document.querySelector(".circular-progress2");
let valueContainer = document.querySelector(".value-container2");
let progressValue = data.toFixed(2);
let progressEndValue = data.toFixed(2);
let speed = 50;
let progress = setInterval(() => {
    valueContainer.textContent = `${progressValue}°C`;
    if(progressValue>80){
    progressBar.style.background = `conic-gradient(
    #ff8080 ${progressValue * 3.6}deg,
        #cadcff ${progressValue * 3.6}deg)`;
    }
    else{
    progressBar.style.background = `conic-gradient(
        #4d5bf9 ${progressValue * 3.6}deg,
        #cadcff ${progressValue * 3.6}deg)`;
    }
    if (progressValue == progressEndValue) {
    clearInterval(progress);
    }
}, speed);
});