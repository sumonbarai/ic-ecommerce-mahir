import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import classes from "../form.module.css";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthProvider";

const Register = () => {
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
      await createUserWithEmailAndPassword(auth, user.email, user.password);

      await setDoc(doc(db, "users", auth.currentUser.uid), {
        email: user.email,
        role: "user",
      });

      setMyAuth({
        uid: auth.currentUser.uid,
        email: user.email,
        role: "user",
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
      <h1>Register</h1>
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
            name="password"
            id="password"
            required
            onChange={handleUser}
          />
        </div>
        <div className={classes.actions}>
          {loading ? <button>create user</button> : <button>Register</button>}

          {error && <h3 style={{ color: "red" }}>{error}</h3>}
        </div>
      </form>
    </section>
  );
};

export default Register;
