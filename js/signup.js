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

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

document.querySelector("#signup").addEventListener("click", (event) => {
  event.preventDefault();
  const userId = document.querySelector("#userEmail").value;
  const userPassword = document.querySelector("#userPassword").value;
  const userName = document.querySelector("#userName").value;
  const userRegion = document.querySelector("#userRegion").value;
  const userJob = document.querySelector("#userJob").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(userId, userPassword)
    .then((user) => {
      const userRef = db.collection("users").doc(userId);
      userRef
        .set({
          email: userId,
          password: userPassword,
          name: userName,
          region: userRegion,
          Job: userJob,
          date_joined: firebase.firestore.Timestamp.fromDate(new Date()),
        })
        .then(function () {
          location.href = "login.html";
          console.log("User information successfully stored in Firestore!");
        })
        .catch(function (error) {
          console.error("Error storing user information in Firestore: ", error);
        });
    })
    .catch(function (error) {
      console.error("Error logging in with Firebase Authentication: ", error);
    })
    .catch((error) => {
      alert("잘못된 정보입니다.");
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
});
