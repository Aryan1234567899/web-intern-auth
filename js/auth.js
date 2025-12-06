// Firebase Auth + UI logic 
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCwj4pRpeFZCBUdttrQYrKBFAQi_Kjd-m4",
  authDomain: "intern-auth-project-45515.firebaseapp.com",
  projectId: "intern-auth-project-45515",
  storageBucket: "intern-auth-project-45515.firebasestorage.app",
  messagingSenderId: "232291224442",
  appId: "1:232291224442:web:8a6dca31c36b4731e364c3",
  measurementId: "G-K7TWPK2D0V"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Helpers
const $ = (id) => document.getElementById(id);

// Pages present: index.html, signup.html, dashboard.html
const path = window.location.pathname.split('/').pop();

// Signup flow
const signupForm = $("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    $("signup-error").textContent = "";
    const name = $("signup-name").value.trim();
    const email = $("signup-email").value.trim();
    const password = $("signup-password").value;
    // basic validation
    if (!name || !email || password.length < 6) {
      $("signup-error").textContent = "Please provide valid name, email and a password of at least 6 characters.";
      return;
    }
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      // update profile (displayName)
      await updateProfile(userCred.user, { displayName: name });
      // store user data in Firestore 
      await setDoc(doc(db, "users", userCred.user.uid), {
        name,
        email,
        createdAt: new Date().toISOString()
      });
      
// Trigger n8n workflow
await fetch("https://devansh012.app.n8n.cloud/webhook-test/signup-hook", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email })
});


      // redirect to dashboard
      window.location.href = "dashboard.html";
    } catch (err) {
      console.error(err);
      $("signup-error").textContent = "Failed to create account.";
    }
  });
}

// Login flow
const loginForm = $("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    $("login-error").textContent = "";
    const email = $("login-email").value.trim();
    const password = $("login-password").value;
    if (!email || password.length < 6) {
      $("login-error").textContent = "Please enter a valid email and password (min 6 chars).";
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "dashboard.html";
    } catch (err) {
      console.error(err);
      $("login-error").textContent = "Login failed.";
    }
  });
}

// Dashboard logic
const logoutBtn = $("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "index.html";
  });
}

// Protect dashboard and show user info
if (path === "dashboard.html") {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // not logged in → go to login
      window.location.href = "index.html";
      return;
    }
    $("welcome").textContent = `Welcome, ${user.displayName || user.email}`;
    $("user-info").textContent = `Signed in as ${user.email}`;
  });
}
