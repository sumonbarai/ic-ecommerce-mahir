/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../components/Loader";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [myAuth, setMyAuth] = useState({
    uid: "",
    email: "",
    roll: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const uid = user.uid;

          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);
          const result = docSnap.data();

          setMyAuth({
            uid: uid,
            email: result.email,
            role: result.role,
          });

          setLoading(false);
        } else {
          setMyAuth({
            uid: "",
            email: "",
            role: "",
          });
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ myAuth, setMyAuth }}>
      {!loading ? children : <Loader />}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
