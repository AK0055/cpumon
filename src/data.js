import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword,  createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import firebaseConfig from "./config.js";
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,setDoc,
  query, where,
  orderBy, serverTimestamp,
  updateDoc,
  getDocs
} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js'

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

class Monitor {
    monitorsRef = db.collection("monitor");
  
    async addcpu(cpuval,time) {
  
        try {
            db.collection('monitor').doc(time).set({cpu: cpuval});
  
        } catch (error) {
            console.error('Error Adding cpu: ', error)
        }
  
    } 
    async addfmem(memval,time) {
  
        try {
            db.collection('monitor').doc(time).set({fmem: memval});
  
        } catch (error) {
            console.error('Error Adding mem: ', error)
        }
  
    } 
    async addtemp(tempval,time) {
  
        try {
            db.collection('monitor').doc(time).set({temp: tempval});
  
        } catch (error) {
            console.error('Error Adding temp: ', error)
        }
  
    } 
    async addAll(cpuval,fmemval,tempval,timeval) {
  
        try {
            console.log(cpuval);console.log(fmemval);console.log(tempval);console.log(timeval);
            db.collection('monitor2').doc(timeval).set({cpu:cpuval,fmem:fmemval,temp: tempval});
  
        } catch (error) {
            console.error('Error Adding', error)
        }

    } 
  
    async getAll() {
        const monitors = [];
        try {
            const snapshot = await this.monitorsRef.get()
            snapshot.forEach(doc => monitors.push({id: doc.id, ...doc.data()}))
        } catch (err) {
            console.error('Error Getting monitors: ', error);
        }
  
        return monitors;
    }
  
    async get(id) {
        let monitor;
  
        try {
            let doc = await this.monitorsRef.doc(id).get();
            if(doc.exists) 
                monitor = {id: doc.id, ...doc.data()};
            else
                console.log('No document found with id: ', id);
        } 
        catch (error) {
            console.error('Error in getting monitor: ', error);
        }
  
        return monitor;
    }
  
    async delete(id) {
        try {
            await this.monitorsRef.doc(id).delete();
            console.log('monitor is deleted with id: ', id);
        } catch (error) {
            console.error('Error in deleting monitor: ', error);
        }
    }
  }
  try {
    require('electron-reloader')(module, {
        debug: true,
        watchRenderer: true
    });
  } catch (_) { console.log('Error'); }  
  async function main() {
    const Obj = new Monitor();
    console.log(await Obj.getAll());
  }
document.getElementById("log-out-btn").addEventListener('click', function(){
    signOut(auth).then(() => {
        window.location.replace("form.html");
    }).catch((error) => {
    document.getElementById("result").innerHTML="Sorry ! <br>"+errorMessage;
    });

});
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const ipcRenderer1 = electron.ipcRenderer;
var usage={cpuusage:0,fmem:0,temp:0,dattime:""};
var all=[];


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
const Obj = new Monitor();
ipcRenderer.on('all',(event,data) => {
    all = data;
    console.log(all);
    usage.cpuusage=all[0].toFixed(2);usage.fmem=all[1].toFixed(2);usage.temp=all[2].toFixed(2);usage.dattime=all[3];
    console.log(usage);
    Obj.addAll(usage.cpuusage,usage.fmem,usage.temp,usage.dattime);
});
