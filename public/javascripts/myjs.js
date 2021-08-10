

const onDelete = async (id) => {
    var r=confirm("Delete item ?");
    if(r==true){
    const url = 'http://localhost:3000/items/delete/' + id
    const option = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        await fetchAPI(url, option)
        window.location.href = '/items'
    }
    catch (e) {
        console.log('Error', e)
    }
    }else{
        
    }
}
const fetchAPI = async (url, option) => {
    const res = await fetch(url, option)
    return res.json()
}
const onEdit = id => {
    window.location.href = '/items/detail/' + id
}
// function validate() {
//     var num = document.myform.price.value;
//     var name = document.myform.name.value;
//     var date = document.myform.date.value;
//     let _date = new Date(date)
//     let today = new Date()
//     today.setHours(0, 0, 0, 0)

//     if (name == "" || name.length > 100) {
//         document.getElementById("loiten").innerHTML = "Tên không hợp lệ";
//         return false;
//     }else{
//         document.getElementById("loiten").innerHTML = "";
//         return true;
//     }
    
    
    
//     // if (isNaN(num)||num=="") {
//     //     document.getElementById("loigia").innerHTML = "Chỉ nhập giá trị số.";
//     //     return false;
//     // } 
//     return true
// }
let isNameValid=false;
let isDateValid=false;
let isPriceValid=false;
function validateName(){
    var name = document.myform.name.value;
    console.log(name.length);
    if (!name||name.trim().length==0 || name.trim().length>100) {
        console.log("aaaa")
        document.getElementById("loiten").innerHTML = "Tên không hợp lệ";     
        document.myform.name.style.backgroundColor = "pink"; 
        isNameValid=false;
        
    }else{
        document.getElementById("loiten").innerHTML = "";
        document.myform.name.style.backgroundColor = "white"; 
        // document.getElementById('btn-submit').disabled=false
        isNameValid=true;
    }
    validateForm()
}
function validateDate(){
    var date = document.myform.date.value;
    let _date = new Date(date)
    let today = new Date()
    if (!date || _date > today) {
        document.getElementById("loingay").innerHTML = "Ngày không hơp lệ";
        document.myform.date.style.backgroundColor = "pink";
        isDateValid=false;
       
    }else{
        document.getElementById("loingay").innerHTML = "";
        document.myform.date.style.backgroundColor = "white";
        isDateValid=true;
    }
    validateForm()
}

function validatePrice(){
    var num = document.myform.price.value;
    if (isNaN(num) || num == "") {
        document.getElementById("loigia").innerHTML = "Giá không hợp lệ";
        document.myform.price.style.backgroundColor = "pink";
        isPriceValid=false;
        
    }else{
        document.getElementById("loigia").innerHTML = "";
        document.myform.price.style.backgroundColor = "white";
        isPriceValid=true;
    }
    validateForm()
}
function validateForm(){
    if(!isNameValid||!isDateValid||!isPriceValid){
        document.getElementById("xacnhan").disabled=true
        document.getElementById("xacnhan").style.backgroundColor="gray"
    }else{
        document.getElementById("xacnhan").disabled=false
        document.getElementById("xacnhan").style.backgroundColor="white"
    }
}

var firebaseConfig = {
    apiKey: "AIzaSyCPf5QcFi2K6hDyk-oLhjSB4TtOTu8T34E",
    authDomain: "reactnative-74cfd.firebaseapp.com",
    databaseURL: "https://reactnative-74cfd-default-rtdb.firebaseio.com",
    projectId: "reactnative-74cfd",
    storageBucket: "reactnative-74cfd.appspot.com",
    messagingSenderId: "669615957078",
    appId: "1:669615957078:web:783d109db9a44304b8c7f7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


const onchangeImg = () => {
    var file = document.getElementById("img").files[0];
    var storageRef = firebase.storage().ref(uuid());
    let uploadTask = storageRef.put(file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => { },
        (error) => { console.log(error) },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                console.log(url)
                document.getElementById("itemImg").src = url
                document.getElementById("imgurl").value = url
            })
        }
    )
}
  const uuid =  () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
    });
}
const onchangeImg2=()=>{
    var file =document.getElementById("img2").files[0];
    var reader = new FileReader();
    reader.onload=(e)=>{
        document.getElementById("itemImg2").src=e.target.result;
    }
    reader.readAsDataURL(file)
}