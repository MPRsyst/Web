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

firebase.auth().onAuthStateChanged((user) => {
  const user1 = firebase.auth().currentUser;
  if (!user1) {
    alert("로그인 하세요");
    window.location.href = "login.html"; // 로그인 페이지 URL로 변경
  }
  if (user) {
    var userId = user.email;

    document.querySelector("#navNotLogin").style.display = "none";
    document.querySelector("#navLogout").style.display = "block";

    const db = firebase.firestore();
    const storage = firebase.storage();

    $("#send").click(function () {
      var file = document.querySelector("#menuImage").files[0];
      var storageRef = storage.ref();
      var route = storageRef.child("image/" + file.name);
      var upload = route.put(file);

      upload.on(
        "state_changed",
        // 변화시 동작하는 함수
        null,
        //에러시 동작하는 함수
        (error) => {
          console.error("실패사유는", error);
        },
        // 성공시 동작하는 함수
        () => {
          upload.snapshot.ref.getDownloadURL().then((url) => {
            console.log("업로드된 경로는", url);

            var newData = {
              menuName: $("#menuName").val(),
              menuPrice: $("#menuPrice").val(),
              menuImage: url,
            };
            db.collection("stores")
              .doc(userId)
              .collection("menu")
              .add(newData)
              .then((result) => {
                console.log(result);
                location.href = "manageStore.html";
              })
              .catch((e) => {
                alert("e");
              });
          });
        }
      );
    });
  } else {
    // User is signed out
    // ...
  }
});

firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });

document.getElementById("navLogin").addEventListener("click", function () {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
      console.log("fin");
      location.reload();
    })
    .catch(function (error) {
      // An error happened.
    });
});
