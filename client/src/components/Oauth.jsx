import {
  getAuth,
  signInWithEmailAndPassword,
  linkWithPopup,
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";

function Oauth() {
  const [message, setMessage] = useState("");

  const handleGoogleAuth = async () => {
    try {
      const auth = getAuth();
      const googleProvider = new GoogleAuthProvider();

      // Prompt for email before signing in with Google
      const email = prompt("Please enter your email:");
      console.log(email);

      // Fetch sign-in methods for the given email
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      console.log(signInMethods);

      // If an account exists with email/password, require the password
      if (signInMethods.includes("password")) {
        const password = prompt("Please enter your password:");

        // Attempt to sign in with email and password
        await signInWithEmailAndPassword(auth, email, password);

        // After validating the password, allow Google sign-in
        const userCredential = await signInWithPopup(auth, googleProvider);
        const user = userCredential.user;

        // Check if Google provider is already linked
        const updatedSignInMethods = await fetchSignInMethodsForEmail(
          auth,
          email
        );
        if (!updatedSignInMethods.includes("google.com")) {
          // Link the Google account
          await linkWithPopup(auth.currentUser, googleProvider);
          console.log("Google provider linked to existing account:", user);
          setMessage("Google account linked successfully.");
        } else {
          console.log("Google provider already linked.");
          setMessage("Logged in with Google and already linked.");
        }
      } else {
        // If no existing account, sign in directly with Google
        const userCredential = await signInWithPopup(auth, googleProvider);
        const user = userCredential.user;
        console.log("Logged in with Google:", user);
        setMessage("Logged in successfully with Google.");

        // Optionally handle claims or set tokens as needed
        const token = await user.getIdTokenResult();
        document.cookie = `accessToken=${token.token}; path=/; secure; HttpOnly; SameSite=Strict`;
      }
    } catch (error) {
      console.error("Error during Google authentication:", error);
      setMessage("Error during Google authentication: " + error.message);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleAuth}>Google Auth</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Oauth;
