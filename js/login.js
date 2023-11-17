const firebaseConfig = {
  apiKey: "AIzaSyBAfTPKbj6OYpBhjTCzZ7cQsJWAhs4kdTM",
  authDomain: "meetingapp-47470.firebaseapp.com",
  databaseURL: "https://meetingapp-47470-default-rtdb.firebaseio.com",
  projectId: "meetingapp-47470",
  storageBucket: "meetingapp-47470.appspot.com",
  messagingSenderId: "724513069915",
  appId: "1:724513069915:web:98f642e15037c1537a987e",
  measurementId: "G-6N2PZSPF2W",
};
// const firebaseConfig = {
//   apiKey: "AIzaSyBgl5ViT9sqo3CU_NpESTuZqWtNcu_jrvo",
//   authDomain: "meetingplacefirebase.firebaseapp.com",
//   databaseURL: "https://meetingplacefirebase-default-rtdb.firebaseio.com",
//   projectId: "meetingplacefirebase",
//   storageBucket: "meetingplacefirebase.appspot.com",
//   messagingSenderId: "648411222054",
//   appId: "1:648411222054:web:fcd630a5c9a260fd7bd6e7",
//   measurementId: "G-9QM138PLZJ",
// };

firebase.initializeApp(firebaseConfig);

document.querySelector("#loginButton").addEventListener("click", (event) => {
  event.preventDefault();
  const userEmail = document.querySelector("#userEmail").value;
  const userPassword = document.querySelector("#userPassword").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      location.href = "mypage.html";
    })
    .catch((error) => {
      alert("잘못된 정보 입니다.");
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});
