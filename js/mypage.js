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

firebase.auth().onAuthStateChanged((user) => {
  const user1 = firebase.auth().currentUser;
  if (!user1) {
    alert("로그인 하세요");
    window.location.href = "login.html"; // 로그인 페이지 URL로 변경
  }

  const userId = user.email;
  const db = firebase.firestore();

  db.collection("stores")
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        alert(
          "수정할 부분이 있으면 해당 부분을 수정하고 하단의 버튼을 클릭하세요"
        );
        storeName = document.querySelector("#storeName");
        storeCoupon = document.querySelector("#storeCoupon");
        storeAddress = document.querySelector("#storeAddress");
        storeName.value = doc.data().매장이름;
        storeCoupon.value = doc.data().매장쿠폰;
        storeAddress.value = doc.data().매장위치;

        document.querySelector("#send").innerHTML = "수정";
        $("#send").click(function () {
          var newData = {
            매장이름: $("#storeName").val(),
            매장쿠폰: $("#storeCoupon").val(),
            매장위치: $("#storeAddress").val(),
            매장좌표X: parseFloat($("#lat").val()),
            매장좌표Y: parseFloat($("#lng").val()),
          };
          db.collection("stores")
            .doc(userId)
            .set(newData)
            .then((result) => {
              console.log(result);
              location.href = "manageStore.html";
            })
            .catch((e) => {
              console.log(e);
            });
        });
      } else {
        console.log("No such document!");
        $("#send").click(function () {
          var newData = {
            매장이름: $("#storeName").val(),
            매장쿠폰: $("#storeCoupon").val(),
            매장위치: $("#storeAddress").val(),
            매장좌표X: parseFloat($("#lat").val()),
            매장좌표Y: parseFloat($("#lng").val()),
          };
          db.collection("stores")
            .doc(userId)
            .set(newData)
            .then((result) => {
              console.log(result);
              location.href = "manageStore.html";
            })
            .catch((e) => {
              console.log(e);
            });
        });
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

  if (user) {
    const userId = user.email;
    console.log(userId);
    document.querySelector("#navNotLogin").style.display = "none";
    document.querySelector("#navLogout").style.display = "block";

    const db = firebase.firestore();

    $("#send").click(function () {
      var newData = {
        매장이름: $("#storeName").val(),
        매장쿠폰: $("#storeCoupon").val(),
        매장위치: $("#storeAddress").val(),
      };
      db.collection("stores")
        .doc(userId)
        .set(newData)
        .then((result) => {
          console.log(newData);
          location.href = "manageStore.html";
        })
        .catch((e) => {
          console.log(e);
        });
    });
  } else {
    location.href = "login.html";
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
