import { useState } from "react";
import classes from "../form.module.css";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthProvider";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setMyAuth } = useAuth();

  const handleUser = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const credential = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      const uid = credential.user.uid;

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      const result = docSnap.data();

      setMyAuth({
        uid: uid,
        email: result.email,
        role: result.role,
      });

      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={handleUser}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={handleUser}
          />
        </div>
        <div className={classes.actions}>
          {loading ? <button>Loading...</button> : <button>Login</button>}

          {error && <h3 style={{ color: "red" }}>{error}</h3>}
        </div>
      </form>
    </section>
  );
};

export default Login;
