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
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const userId = user.email;

    document.querySelector("#navNotLogin").style.display = "none";
    document.querySelector("#navLogout").style.display = "block";

    const db = firebase.firestore();
    const storage = firebase.storage();

    db.collection("stores")
      .doc(userId)
      .collection("menu")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.data());
          var 템플릿 = `<div class="col" id=${doc.data().menuName}>
                <div class="card shadow-sm">
                    <img width="420px" height="300px" alt="음식 이미지" src="${
                      doc.data().menuImage
                    }"/>
                    

                    <div class="card-body">
                        <p class="card-text" style="font-size:2em; font-family: Georgia, Serif;">${
                          doc.data().menuName
                        }</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="delete btn btn-sm btn-outline-secondary">삭제</button>
                            </div>
                            <label class="text" style="font-size:2em; font-family: Georgia, Serif;">가격: ${
                              doc.data().menuPrice
                            }</label>
                        </div>
                    </div>
                </div>
            </div>`;
          $(`.row`).append(템플릿);
        });
        const buttons = document.querySelectorAll(".delete");
        buttons.forEach((button) => {
          button.addEventListener("click", function () {
            thisButton = this.parentElement.parentElement;
            const thisMenu = $(thisButton).siblings();
            const MenuName = thisMenu[0].innerText;

            // "users" 컬렉션(Collection) 참조를 가져옵니다.
            const usersRef = db
              .collection("stores")
              .doc(userId)
              .collection("menu");

            // "age" 필드가 30 이상인 사용자 문서(Document)들을 가져옵니다.
            const query = usersRef.where("menuName", "==", MenuName);
            query
              .get()
              .then((querySnapshot) => {
                // 각각의 문서(Document)에 대해 delete() 메서드를 호출하여 삭제합니다.
                querySnapshot.forEach((doc) => {
                  doc.ref
                    .delete()
                    .then(() => {
                      console.log("문서가 성공적으로 삭제되었습니다.");
                      location.reload();
                    })
                    .catch((error) => {
                      console.error("문서 삭제 중 오류가 발생했습니다:", error);
                    });
                });
              })
              .catch((error) => {
                console.error("문서 가져오기 중 오류가 발생했습니다:", error);
              });
          });
        });
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
