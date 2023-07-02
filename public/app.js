
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getDatabase, push, ref, set, onValue, remove, child, update } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC_C50bAfhjggzImZlZCEikH4jSdMdmIos",
    authDomain: "todoapp-with-firebase-23fc4.firebaseapp.com",
    projectId: "todoapp-with-firebase-23fc4",
    storageBucket: "todoapp-with-firebase-23fc4.appspot.com",
    messagingSenderId: "509096236811",
    appId: "1:509096236811:web:004e457beb291355a1f40e",
    measurementId: "G-5ZVBXQHNP2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

var inp = document.getElementById('inp')
window.addtask = function () {
    var obj = {
        todo: inp.value,
    }
    // console.log(obj)
    var userref = push(ref(db, "todo/"))
    obj.id = userref.key;
    set(userref, obj)
    inp.value = '';
}
window.resevedvalue = function () {
    var userref = ref(db, "todo/")
    onValue(userref, function (data) {
        // console.log(data.val())
        if (data.val()) {
            var reseavedata = Object.values(data.val());
            // console.log(reseavedata);
            var ul = document.getElementById('ul')
            ul.innerHTML = ''
            // console.log(kuchaur);
            for (var i = 0; i < reseavedata.length; i++) {
                var kuchaur = reseavedata[i].id;
                // console.log(kuchaur)
                ul.innerHTML += `<li>${reseavedata[i].todo}<div class="listbtn"><button onclick="del('${kuchaur}')"><i class="fa-solid fa-trash"></i></button><button onclick="edit('${kuchaur}')"><i class="fa-solid fa-pen-to-square"></i></button></div></li></hr class="test">`
            }
        }
    })
}

window.del =  function(id) {
remove(ref(db, `todo/${id}`));
   window.location.reload()
    // alert('delete Todo')
}
// window.Edit = function () {
//     var promt = prompt("please Enter Your Edit Value");
//     var replace = {
//         todo: promt,
//     }
//     var userref = ref(db,)
//     var firebaseRef = firebase.database().ref("your_reference_path");
//     firebaseRef.set(replace);
//     // db.ref("todo/").id.set(replace);
// }
window.edit = function(userId) {
    set(ref(db, 'todo/' + userId), {
     todo : prompt('please Enter YOur edit Value'),
     id : userId,
      })
  }
resevedvalue();