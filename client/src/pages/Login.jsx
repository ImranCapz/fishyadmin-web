import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      const token = await user.getIdTokenResult();

      document.cookie = `accessToken=${token}; path='/'; secure; HttpOnly; SameSite=Strict`;

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          if (token.claims.admin || token.claims.shopOwner) {
            setMessage("Login successfull You have access");
          } else {
            setMessage("Access Denied");
          }
        }
      });
    } catch (error) {
      console.log(error);
      setMessage("Login Failed, Please check your credentails");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <label>email</label>
      <input
        type="email"
        name="email"
        id="email"
        className=""
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>password</label>
      <input
        type="password"
        placeholder="password"
        className=""
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {message}
    </div>
  );
}

export default Login;
