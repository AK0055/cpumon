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
var cpucount = 0;
var memcount = 0;
var tempcount = 0;

class Monitor {
    monitorsRef = db.collection("monitor3");
  
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
            db.collection('monitor3').doc(timeval).set({cpu:parseFloat(cpuval),fmem:parseFloat(fmemval),temp: parseFloat(tempval)});
  
        } catch (error) {
            console.error('Error Adding', error)
        }

    } 
    async dispcpu(){
    db.collection("monitor3").where("cpu", ">", 80.0)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            cpucount++;
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    }
    async dispmem(){
        db.collection("monitor3").where("fmem", "<", 20.0)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", doc.data());
                memcount++;
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    
        }async disptemp(){
            db.collection("monitor3").where("temp", ">", 80.0)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    tempcount++;
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        
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
  
    async delete() {
        try {
            await this.monitorsRef.delete();
            console.log('monitor is deleted with id: ', id);
        } catch (error) {
            console.error('Error in deleting monitor: ', error);
        }
    }
    async updateCollection() {
        //const ref = firestore.collection(this.monitorsRef);
        const collection = await db
                .collection("monitor3")
                .get()
                collection.forEach(doc=> {
                doc.ref
                .update({
                    cpu: 0,fmem:100,temp:0})
            })
      }
    
  }
  const Obj = new Monitor();
  try {
    require('electron-reloader')(module, {
        debug: true,
        watchRenderer: true
    });
  } catch (_) { console.log('Error'); }  
  
  document.getElementById("reset").addEventListener('click', function(){
    tempcount=cpucount=memcount=0;console.log(cpucount);
    Obj.updateCollection();

  });
  
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
var usage={cpuusage:0.0,fmem:0.0,temp:0.0,dattime:""};
var all=[];
Obj.updateCollection();

ipcRenderer.on('cpu',(event,data) => {
document.getElementById('cpu').innerHTML = data.toFixed(2);
if(cpucount>5){document.getElementById('cpuS').innerHTML = "HIGH";}
else document.getElementById('cpuS').innerHTML = "Normal";
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
    if(memcount>5){document.getElementById('memS').innerHTML = "LOW";}
else document.getElementById('memS').innerHTML = "Normal";
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
if(tempcount>5){document.getElementById('tempS').innerHTML = "HIGH";}
else document.getElementById('tempS').innerHTML = "Normal";
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

ipcRenderer.on('all',(event,data) => {
    all = data;
    console.log(all);
    usage.cpuusage=all[0].toFixed(2);
    usage.fmem=all[1].toFixed(2);
    usage.temp=all[2].toFixed(2);
    usage.dattime=all[3];
    console.log(usage);
    Obj.addAll(parseFloat(all[0]),parseFloat(all[1]),parseFloat(all[2]),all[3]);
    Obj.dispcpu();
    Obj.dispmem();
    Obj.disptemp();
    Obj.getAll();
});
    const nodemailer = require('nodemailer');
    var email = require('./form.js');
    console.log(email);
    nodemailer.createTestAccount((err, account) => {
        if (err) {
            console.error('Failed to create a testing account. ' + err.message);
            return process.exit(1);
        }
        console.log('Credentials obtained, sending message...');
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'urthatha05@gmail.com',
                pass: 'Ajay@2001'
            }
        });
        let cpumessage = {
            from: 'CPUmonAssist <urthatha05@gmail.com>',
            to: 'User <grrreat0055@gmail.com>',
            subject: 'CPU Usage alert !',
            text: 'Test message',
            html: 'Hello User,<br/>Your CPU usage is HIGH. Please check your machine soon'
        };
        let memmessage = {
            from: 'CPUmonAssist <urthatha05@gmail.com>',
            to: 'User <grrreat0055@gmail.com>',
            subject: 'Memory Usage alert !',
            text: 'Test message',
            html: 'Hello User,<br/>Your memory is LOW. Please check your machine soon'
        };
        let tempmessage = {
            from: 'CPUmonAssist <urthatha05@gmail.com>',
            to: 'User <grrreat0055@gmail.com>',
            subject: 'Temperature alert !',
            text: 'Test message',
            html: 'Hello User,<br/>Your temperature is HIGH. Please check your machine soon'
        };
        if(document.getElementById('cpuS').innerHTML == "HIGH"){
        transporter.sendMail(cpumessage, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }
            console.log('Message sent: %s', info.messageId);
        });
        }
        else if(document.getElementById('tempS').innerHTML == "HIGH"){
            transporter.sendMail(tempmessage, (err, info) => {
                if (err) {
                    console.log('Error occurred. ' + err.message);
                    return process.exit(1);
                }
                console.log('Message sent: %s', info.messageId);
            });
        }
        else if(document.getElementById('memS').innerHTML == "LOW"){
            transporter.sendMail(memmessage, (err, info) => {
                if (err) {
                    console.log('Error occurred. ' + err.message);
                    return process.exit(1);
                }
                console.log('Message sent: %s', info.messageId);
            });
        }
    });
